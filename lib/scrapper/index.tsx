"use server";
import axios from 'axios'
import * as cheerio from 'cheerio';
import { extractCategory, extractCurrency, extractDiscountRate, extractImage, extractPrice, extractReviewCount, extractStars, extractTitle , extractisOutOfStock, extractDescription, extractSimilarProducts } from './utils';
type scrapedData = {
    url : string,
    currency : string,
    image : string,
    title : string,
    currentPrice: Number,
    originalPrice: Number,
    discountRate: Number,
    category: string,
    reviewsCount: Number,
    stars: Number,
    isOutOfStock: boolean,
    description : string,
    lowestPrice: Number,
    highestPrice: Number,
    averagePrice: Number,
}
const initialiseAPI = () => {
    const username = String(process.env.BRIGHT_DATA_USER_NAME);
    const password = String(process.env.BRIGHT_DATA_USER_PASSWORD);
    const port = process.env.BRIGHT_DATA_PORT;
    const session_id = (1000000 * Math.random())|0;
    const super_proxy = 'http://'+username+'-session-'+session_id+':'+password+'@brd.superproxy.io:'+port;
    return {
        host: '@brd.superproxy.io:',
        port,
        auth : {
            username,
            password
        },
        rejectUnauthorized: false
    };
}
export const scrapeAmazonProduct = async (url : string) : Promise<scrapedData> => {
    const options = initialiseAPI();
    const response = await axios.get(url,options).then(data => data); 
    const $ = cheerio.load(response.data);
    const currency = extractCurrency([
        $('.a-price-symbol')
    ])
    const image = extractImage([
        $('#landingImage')
    ])
    const title = extractTitle([
        $('#productTitle')
    ]);
    const currentPrice = Math.max(Number(extractPrice([
      $('.priceToPay span.a-price-whole'),
      $('.a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
      $('td.a-span12 span.a-price.a-text-price.a-size-medium.apexPriceToPay a.off-screen')
    ])),0.0);
    const originalPrice = Math.max(Number(extractPrice([
        $('.basisPrice span.a-price.a-text-price span.a-offscreen'),
    ])),0.0);
    const discountRate = Math.max(Number(extractDiscountRate([
        $('.savingsPercentage')
    ])),0.0);
    const category = extractCategory([
        $('.nav-categ-image')
    ])
    const reviewsCount = Math.max(Number(extractReviewCount([
        $('#cm_cr_dp_d_rating_histogram').find('.averageStarRatingNumerical').find('span')
    ])),0.0);
    const stars = Math.max(Number(extractStars([
        $('#acrPopover').find('span.a-declarative').find('a.a-popover-trigger').find('span.a-size-base')
    ])),0.0);
    
    const isOutOfStock = extractisOutOfStock([
        $('#availability').find('span.a-size-medium.a-color-success')
    ])
    const description = extractDescription($)
    // console.log(currentPrice)
    return {
        url,
        currency,
        image,
        title,
        currentPrice,
        originalPrice,
        discountRate,
        category: category,
        reviewsCount,
        stars,
        isOutOfStock,
        description,
        lowestPrice: currentPrice < originalPrice ? currentPrice : originalPrice,
        highestPrice: currentPrice > originalPrice ? currentPrice : originalPrice,
        averagePrice: currentPrice,
    }
}
export const scrapesimilarProducts = async (url : string) => {
    const options = initialiseAPI();
    const response = await axios.get(url,options).then(data => data); 
    const $ = cheerio.load(response.data);
    const similarProducts = extractSimilarProducts($);
    return similarProducts;
}

export const getCronData = async (url : string) => {
    const options = initialiseAPI();
    const response = await axios.get(url,options).then(data => data); 
    const $ = cheerio.load(response.data);
    const currentPrice = Math.max(Number(extractPrice([
        $('.priceToPay span.a-price-whole'),
        $('.a.size.base.a-color-price'),
        $('.a-button-selected .a-color-base'),
        $('td.a-span12 span.a-price.a-text-price.a-size-medium.apexPriceToPay a.off-screen')
      ])),0.0);
      const originalPrice = Math.max(Number(extractPrice([
          $('.basisPrice span.a-price.a-text-price span.a-offscreen'),
      ])),0.0);
      const discountRate = Math.max(Number(extractDiscountRate([
          $('.savingsPercentage')
      ])),0.0);
      const isOutOfStock = extractisOutOfStock([
        $('#availability').find('span.a-size-medium.a-color-success')
    ])
    return {
        currentPrice,
        originalPrice,
        discountRate,
        isOutOfStock
    }
}