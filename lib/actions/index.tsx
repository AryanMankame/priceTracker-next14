'use server'

import { addPriceHistory, storeProduct, storeUserTracked } from "../db";
import { generateEmailBody, sendEmail } from "../nodemailer";
import { scrapeAmazonProduct } from "../scrapper";

export const scrapeProductAndStore = async (url : string) => {
    if(!url) return ;
    try{
        // configuring the bright data host and port to be the ones making the axios request to amazon so that amazon doesnt block our scrapper.
        // Normally when we dont pass options to the axios the host and port are the localhost of the machine.
        const scrapedProductData = await scrapeAmazonProduct(url);
        console.log(scrapedProductData)
        if(scrapedProductData){
            const prodId =  await storeProduct(scrapedProductData);
            await addPriceHistory(Number(scrapedProductData.currentPrice),prodId);
            return prodId;
        }
    } catch(err){
        throw new Error(`Error detected here : ${err}`);
    }
}
export const setUserTrackedAndSendWelcomeEmail = async (email : string, title : string, url : string, id : string) => {
    try{
        const msgAfterstoring = await storeUserTracked(email,id);
        if(msgAfterstoring === 'already tracked'){
            return 'Product is already being tracked';
        }
        const emailContent = await generateEmailBody({ title, url} , 'WELCOME');
        // console.log(emailContent)
        if(emailContent){
            try{
                await sendEmail(emailContent,[email]);
                return 'Product Successfully Tracked!'
            }
            catch(err){
                throw Error(`error occured ${err}`);
            }
        }
        return `Product Successfully Tracked`;
    }
    catch(err){
        throw Error(`Error occurred ${err}`)
    }
}