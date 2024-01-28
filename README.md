This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


import { fetchAllProducts, fetchHighestLowestAveragePrice, fetchUsersUsingProductId, updateProduct } from "@/lib/db"
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeAmazonProduct } from "@/lib/scrapper";
import { emailNotificationType } from "@/lib/scrapper/utils";
import { NextResponse } from "next/server";
export const maxDuration = 10; // This function can run for a maximum of 300 seconds
export const dynamic = "force-dynamic";
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
export async function GET(){
    executeOnYourOwn();
    console.log('started running....')
    return NextResponse.json({
        message: "Ok"
    });
}