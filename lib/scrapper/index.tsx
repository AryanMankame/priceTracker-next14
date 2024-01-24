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
    const currentPrice = extractPrice([
      $('.priceToPay span.a-price-whole'),
      $('.a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
    ])
    const originalPrice = extractPrice([
        $('.basisPrice span.a-price.a-text-price span.a-offscreen'),
    ]);
    const discountRate = extractDiscountRate([
        $('.savingsPercentage')
    ]);
    const category = extractCategory([
        $('.nav-categ-image')
    ])
    const reviewsCount = extractReviewCount([
        $('#cm_cr_dp_d_rating_histogram').find('.averageStarRatingNumerical').find('span')
    ])
    const stars = extractStars([
        $('#acrPopover').find('span.a-declarative').find('a.a-popover-trigger').find('span.a-size-base')
    ])
    
    const isOutOfStock = extractisOutOfStock([
        $('#availability').find('span.a-size-medium.a-color-success')
    ])
    const description = extractDescription($)
    
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