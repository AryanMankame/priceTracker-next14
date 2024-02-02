import { unstable_noStore } from "next/cache";
import { fetchAllProducts, fetchHighestLowestAveragePrice, fetchUsersUsingProductId, updateProduct } from "../db";
import { generateEmailBody, sendEmail } from "../nodemailer";
import { getCronData, scrapeAmazonProduct } from "../scrapper";
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



export const executeOnYourOwn = async () => {
  const THRESHOLD_RATE : Number = 40;
  console.log('execute on your own function has started running...');
  const start = Date.now();
  try{
      const allProducts = await fetchAllProducts();
      // console.log('all the products have been fetched ', allProducts);
      if(allProducts){
          const updatedProducts = await Promise.all(
              allProducts.map(async (product) => {
                  // console.log(product.id)
                  const scrapedData = await scrapeAmazonProduct(product.url);
                  var priceHistory = await fetchHighestLowestAveragePrice(product.id,Number(scrapedData.currentPrice));
                  const prodData = {
                      ...product,
                      ...scrapedData,
                      ...priceHistory,
                  }
                  console.log(prodData);
                  const updateStatus = await updateProduct(prodData);
                  const emailNotifType = await emailNotificationType(product,prodData);
                  if(emailNotifType && updateStatus?.rowCount > 0){
                      const prodInfo = {
                          title : prodData.title,
                          url : prodData.url
                      }
                      const emailBody = await generateEmailBody(prodInfo, emailNotifType);
                      const usersTrackingProduct = await fetchUsersUsingProductId(product.id);
                      const end1 = Date.now();
                      console.log("users => ",product.id," => ",usersTrackingProduct," => ",emailBody);
                      if(usersTrackingProduct && usersTrackingProduct.length > 0)
                      await sendEmail(emailBody, usersTrackingProduct)
                  }
                  // console.log(updateStatus,emailNotifType)
                  return prodData
              })
          ) 
          // console.log("allproductsafter update => ",updatedProducts)
      }
  }
  catch(err){
      throw Error(`error occurred ${err}`)
  }
  const end = Date.now();
  console.log("Time Taken to complete the function: ",end - start);
}