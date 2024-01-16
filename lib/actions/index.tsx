'use server'

import { scrapeAmazonProduct } from "../scrapper";

export const scrapeProductAndStore = async (url : string) => {
    if(!url) return ;
    try{
        // configuring the bright data host and port to be the ones making the axios request to amazon so that amazon doesnt block our scrapper.
        // Normally when we dont pass options to the axios the host and port are the localhost of the machine.
        const scrapedProductData = scrapeAmazonProduct(url);

    } catch(err){
        throw new Error(`Error detected here : ${err}`);
    }
}