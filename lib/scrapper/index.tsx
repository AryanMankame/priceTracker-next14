import axios from 'axios'
import * as cheerio from 'cheerio';
import { extractCurrency, extractDiscountRate, extractImage, extractPrice, extractTitle } from './utils';
type scrapedData = {
    url : string,
    currency : string,
    image : string,
    title : string,
    currentPrice: Number,
    originalPrice: Number,
    priceHistory: Array<Number>,
    discountRate: Number,
    category: string,
    reviewsCount: Number,
    stars: Number,
    isOutOfStock: boolean,
    description : string,
    lowestPrice: Number,
    highestPrice: Number,
    averagePrice: Number
}
export const scrapeAmazonProduct = async (url : string) : Promise<scrapedData> => {
    const username = String(process.env.BRIGHT_DATA_USER_NAME);
    const password = String(process.env.BRIGHT_DATA_USER_PASSWORD);
    const port = process.env.BRIGHT_DATA_PORT;
    const session_id = (1000000 * Math.random())|0;
    const super_proxy = 'http://'+username+'-session-'+session_id+':'+password+'@brd.superproxy.io:'+port;
    const options = {
        host: '@brd.superproxy.io:',
        port,
        auth : {
            username,
            password
        },
        rejectUnauthorized: false
    };
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
    console.log(originalPrice);
    return {
        url: '',
        currency: '',
        image : '',
        title : '',
        currentPrice: 0,
        originalPrice: 0,
        priceHistory: [1],
        discountRate: 0,
        category: '',
        reviewsCount: 0,
        stars: 0,
        isOutOfStock: false,
        description: '',
        lowestPrice: 0,
        highestPrice: 0,
        averagePrice: 0
    }
}