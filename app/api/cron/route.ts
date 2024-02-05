import { fetchAllProducts, fetchHighestLowestAveragePrice, fetchUsersUsingProductId, updateProduct } from "@/lib/db"
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeAmazonProduct } from "@/lib/scrapper";
import { emailNotificationType } from "@/lib/scrapper/utils";
import { NextResponse } from "next/server";
export const maxDuration = 300; // This function can run for a maximum of 300 seconds
export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function GET(){
    const THRESHOLD_RATE : Number = 40;
    try{
        const allProducts = await fetchAllProducts();
        if(allProducts){
            const updatedProducts = await Promise.all(
                allProducts.map(async (product) => {
                    // console.log(product.id)
                    const scrapedData = await scrapeAmazonProduct(product.url);
                    var priceHistory = await fetchHighestLowestAveragePrice(product.id,Number(scrapedData.currentPrice));
                    const prodData = {
                        id : product.id,
                        ...scrapedData,
                        ...priceHistory,
                    }
                    console.log(prodData);
                    const updateStatus = await updateProduct(prodData);
                    const emailNotifType = await emailNotificationType(product,prodData);
                    if(emailNotifType && updateStatus?.rowCount > 0){
                        const prodInfo = {
                            title : scrapedData.title,
                            url : scrapedData.url
                        }
                        const emailBody = await generateEmailBody(prodInfo, emailNotifType);
                        const usersTrackingProduct = await fetchUsersUsingProductId(product.id);
                        console.log("users => ",product.id," => ",usersTrackingProduct," => ",emailBody);
                        if(usersTrackingProduct && usersTrackingProduct.length > 0)
                        await sendEmail(emailBody, usersTrackingProduct)
                    }
                    // console.log(updateStatus,emailNotifType)
                    return prodData
                })
            ) 
            // console.log("allproductsafter update => ",updatedProducts)
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
