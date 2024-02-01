import { fetchAllProducts, fetchHighestLowestAveragePrice, fetchUsersUsingProductId, updateProduct } from "@/lib/db";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeAmazonProduct } from "@/lib/scrapper";
import { emailNotificationType } from "@/lib/scrapper/utils";
import { NextResponse } from "next/server";

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
const executeOnYourOwn = async () => {
    const THRESHOLD_RATE : Number = 40;
    console.log('execute on your own function has started running...');
    try{
        const allProducts = await fetchAllProducts();
        console.log('all the products have been fetched ', allProducts);
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
                    // console.log(prodData);
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
            console.log("allproductsafter update => ",updatedProducts)
        }
    }
    catch(err){
        throw Error(`error occurred ${err}`)
    }
}

export async function GET() {
    // const encoder = new TextEncoder();
    // const customReadable = new ReadableStream({
    //   async start(controller) {
    //     // Start encoding 'Basic Streaming Test',
    //     // and add the resulting stream to the queue
    //     await executeOnYourOwn();
    //     controller.close();
    //   },
    // });
   
    // return new Response(customReadable, {
    //   headers: { 'Content-Type': 'text/html; charset=utf-8' },
    // });
}
