import { fetchAllProducts, fetchHighestLowestAveragePrice, fetchUsersUsingProductId, updateProduct } from "@/lib/db";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeAmazonProduct } from "@/lib/scrapper";
import { emailNotificationType } from "@/lib/scrapper/utils";
import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET() {
  const encoder = new TextEncoder();

  async function executeCronJob() {
    try {
      const allProducts = await fetchAllProducts();
      if (allProducts) {
        await Promise.all(
          allProducts.map(async (product) => {
            const scrapedData = await scrapeAmazonProduct(product.url);
            const priceHistory = await fetchHighestLowestAveragePrice(product.id, Number(scrapedData.currentPrice));
            const prodData = {
              id: product.id,
              ...scrapedData,
              ...priceHistory,
            };

            const updateStatus = await updateProduct(prodData);
            const emailNotifType = await emailNotificationType(product, prodData);

            if (emailNotifType && updateStatus?.rowCount > 0) {
              const prodInfo = {
                title: scrapedData.title,
                url: scrapedData.url,
              };
              const emailBody = await generateEmailBody(prodInfo, emailNotifType);
              const usersTrackingProduct = await fetchUsersUsingProductId(product.id);

              if (usersTrackingProduct && usersTrackingProduct.length > 0) {
                await sendEmail(emailBody, usersTrackingProduct);
              }
            }

            return prodData;
          })
        );
      }
    } catch (error) {
      throw new Error(`Error occurred: ${error}`);
    }
  }

  const customReadable = new ReadableStream({
    async start(controller) {
      await executeCronJob();
      controller.close();
    },
  });

  return new Response(customReadable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
