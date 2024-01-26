const { sql } = require('@vercel/postgres');
async function createProductTable(){
    await sql`CREATE TABLE IF NOT EXISTS Product (
    id varchar(1000) PRIMARY KEY NOT NULL,
    url varchar(10000) NOT NULL,
    currency  varchar(5) NOT NULL,
    image varchar(10000),
    title varchar(10000) NOT NULL,
    currentPrice FLOAT NOT NULL,
    originalPrice FLOAT NOT NULL,
    discountRate FLOAT DEFAULT 0.0,
    category varchar(10000),
    reviewsCount FLOAT DEFAULT 0.0,
    stars FLOAT DEFAULT 0.0,
    isOutofStock BOOLEAN,
    description varchar(20000),
    lowestPrice FLOAT,
    highestPrice FLOAT,
    averagePrice FLOAT
    );
    `
}

async function createTrendingTable(){
    await sql`CREATE TABLE IF NOT EXISTS Trending (
        id SERIAL PRIMARY KEY NOT NULL,
        product_id varchar(1000) UNIQUE REFERENCES Product(id),
        votes INT DEFAULT 0
        ) 
    `
}

async function createPriceHistoryTable(){
    await sql`CREATE TABLE IF NOT EXISTS PriceHistory (
        product_id varchar(1000) REFERENCES Product(id) NOT NULL,
        datetime TIMESTAMP NOT NULL,
        price FLOAT
        ) 
    `
}

async function createUserTrackedTable(){
    await sql`CREATE TABLE IF NOT EXISTS UserTracked (
        email varchar(100) NOT NULL,
        product_id varchar(1000) REFERENCES Product(id) NOT NULL,
        trackingStatus BOOLEAN
        ) 
    `
}
// type scrapedData = {
//     url : string,
//     currency : string,
//     image : string,
//     title : string,
//     currentPrice: Number,
//     originalPrice: Number,
//     priceHistory: Array<Number>,
//     discountRate: Number,
//     category: string,
//     reviewsCount: Number,
//     stars: Number,
//     isOutOfStock: boolean,
//     description : string,
//     lowestPrice: Number,
//     highestPrice: Number,
//     averagePrice: Number
// }
const main = async () => {
    await createProductTable(),
    await createTrendingTable(),
    await createPriceHistoryTable(),
    await createUserTrackedTable()
    
}
main();

// npm config set strict-ssl true
