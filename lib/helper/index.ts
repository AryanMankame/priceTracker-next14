import { unstable_noStore } from "next/cache";
import { fetchAllProducts, fetchHighestLowestAveragePrice, fetchUsersUsingProductId, updateProduct } from "../db";
import { generateEmailBody, sendEmail } from "../nodemailer";
import { scrapeAmazonProduct } from "../scrapper";
import { emailNotificationType } from "../scrapper/utils";

export const getDomainFromUrl = (url : string) => {
    let domain = '';
  
    try {
      const urlObject = new URL(url);
      const hostParts = urlObject.host.split('.');
      
      // Extract the last two parts of the host to get the domain
      if (hostParts.length >= 2) {
        domain = `${hostParts[hostParts.length - 2]}.${hostParts[hostParts.length - 1]}`;
      }
    } catch (error) {
      throw new Error('Invalid URL');
    }
  
    return domain;
  }

export const searchProductsAlgo = (query : string,  productList : any[]) => {
  const filteredProductList = productList.filter(item => {
    console.log(item.title,query,item.title.toLowerCase().search(query.toLowerCase()) )
    return item.title.toLowerCase().search(query.toLowerCase()) >= 0
  })
  return filteredProductList
}