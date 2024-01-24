import { fetchAllProducts, fetchHighestLowestAveragePrice, fetchUsersUsingProductId, updateProduct } from "@/lib/db"
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeAmazonProduct } from "@/lib/scrapper";
import { emailNotificationType } from "@/lib/scrapper/utils";
import { NextResponse } from "next/server";
export async function GET(){
    const THRESHOLD_RATE : Number = 40;
    try{
        const allProducts = await fetchAllProducts();
        if(allProducts){
            const updatedProducts = await Promise.all(
                allProducts.map(async (product) => {
                    const scrapedData = await scrapeAmazonProduct(product.url);
                    var priceHistory = await fetchHighestLowestAveragePrice(product.id,product.currentPrice);
                    const prodData = {
                        ...scrapedData,
                        ...priceHistory,
                    }
                    const updateStatus = await updateProduct(prodData);
                    const emailNotifType = await emailNotificationType(product,prodData);
                    if(emailNotifType && updateStatus?.rowCount > 0){
                        const prodInfo = {
                            title : scrapedData.title,
                            url : scrapedData.url
                        }
                        const emailBody = await generateEmailBody(prodInfo, emailNotifType);
                        const usersTrackingProduct = await fetchUsersUsingProductId(product.id);
                        await sendEmail(emailBody, usersTrackingProduct)
                    }
                })
            ) 
            return NextResponse.json({
                message: "Ok",
                data: updatedProducts,
              });
        }
    }
    catch(err){
        throw Error(`error occurred ${err}`)
    }
}