// here we are supposed to create database functions.
'use server';
import { sql } from '@vercel/postgres';
import { currentUser } from '@clerk/nextjs';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { Md5 } from 'ts-md5';
export const storeProduct = async (productData : any) => {
    noStore();
    productData = { 'id' : Md5.hashStr(productData.url) , ...productData};
    const {
        id,
        url,
        currency,
        image,
        title,
        currentPrice,
        originalPrice,
        discountRate,
        category,
        reviewsCount,
        stars,
        isOutOfStock,
        description,
        lowestPrice,
        highestPrice,
        averagePrice
    } = productData;
    // console.log(productData)
    try{
        const prodExist = await sql`SELECT id FROM product WHERE id = ${id}`
        console.log(prodExist,id)
        if(prodExist.rowCount === 0){
            try{
                await sql`BEGIN;`
                await sql`
                    INSERT INTO product values ( ${id}, ${url} , ${currency}, ${image} , ${title} , ${currentPrice} , ${originalPrice},${discountRate},${category},${reviewsCount},${stars},${isOutOfStock},${description},${lowestPrice},${highestPrice},${averagePrice} );
                `
                await sql`
                    INSERT INTO trending (product_id,votes) values ( ${productData.id} , 1 );
                `
                await sql`COMMIT;`
            }
            catch(err){
                throw Error(`Error in inserting Data: ${err}`)
            }
        }
        else{
            try{
                console.log(await sql`UPDATE trending SET votes = votes+1 WHERE product_id = ${id}`)
            }
            catch(err){
                console.log(`Cant update the vote count`)
            }
        }
    }
    catch(err){
        throw Error(`error found : ${err}`)
    }
    
    return id;
}
export const fetchProductById = async (id : string) => {
    noStore();
    const data = await sql`
        SELECT * FROM product where id = ${id};
    `
    return data;
}
export const fetchTrendingProducts = async () => {
    noStore();
    const data = await sql`
        SELECT product.id, url, currency, image, title, currentPrice, category FROM 
        product JOIN trending ON 
        product.id = trending.product_id ORDER BY votes DESC;
    `
    return data;
}
export const storeUserTracked = async (email : string, id : string) => {
    noStore();
    try{
        const ifTracked = await sql`
            SELECT trackingstatus FROM usertracked WHERE product_id = ${id} AND email = ${email};
        `
        // console.log(ifTracked)
        if(ifTracked.rowCount === 0){
            await sql` INSERT INTO usertracked VALUES (${email}, ${id}  , true); `;
            return 'successfully done';
        }
        else{
            if(ifTracked.rows[0].trackingstatus === true)
            return 'already tracked'
            else{
                await sql`UPDATE usertracked SET trackingstatus = true WHERE product_id = ${id} AND email = ${email}`;
                return 'successfully done';
            }
        }
    }
    catch (err) {
        throw Error(`error occurred ${err}`)
    }
}

export const fetchAllProducts = async () => {
    noStore();
    const data = await sql`SELECT * FROM product`
    return data.rows
}

export const fetchHighestLowestAveragePrice = async (id : string, currentPrice : number) => {
    noStore();
    const productPrices = await sql`SELECT * FROM pricehistory WHERE product_id = ${id}`
    var highestPrice = currentPrice; var lowestPrice = currentPrice; var priceSum = currentPrice;
    productPrices.rows.forEach((item) => {
        highestPrice = Math.max(highestPrice, item.price); lowestPrice = Math.min(lowestPrice, item.price);
        priceSum += item.price;
    });
    var averagePrice = productPrices.rowCount > 0 ? priceSum / productPrices.rowCount : priceSum;
    averagePrice = Number(averagePrice.toFixed(0));
    // console.log(id,"=>",priceSum,"=>",productPrices);
    return {
        lowestPrice,
        highestPrice,
        averagePrice,
        currentPrice
    }
}

export const updateProduct = async (prodData : any) => {
    noStore();
    const { id, currentPrice, lowestPrice, highestPrice, averagePrice } = prodData;
    // console.log(id,currentPrice,lowestPrice,highestPrice,averagePrice,prodData);
    try{
        return await sql`
            UPDATE product SET currentprice = ${currentPrice}, lowestprice = ${lowestPrice}, highestprice = ${highestPrice}, averageprice = ${averagePrice} 
            WHERE id = ${id};
        `
    }
    catch(err){
        throw Error(`error occured ${err}`);
    }
}

export const fetchUsersUsingProductId = async (id : string)  => {
    noStore();
    const data = await sql`
        SELECT * FROM usertracked WHERE product_id = ${id};
    `
    var userEmail : string[] = [];
    data.rows.forEach(item => {
        if(item.trackingstatus) userEmail.push(item.email)
    });
    return userEmail;
}

export const addPriceHistory = async (currentPrice : number, id : string) => {
    return await sql`
        INSERT INTO pricehistory values ( ${id} , NOW() , ${currentPrice} );
    `
}

export const fetchTrackedProductsforEmail = async (email : string) => {
    return await sql`
        SELECT product.*, usertracked.trackingstatus
        FROM product
        JOIN usertracked ON product.id = usertracked.product_id
        WHERE usertracked.email = ${email};
        `
}

export const updateTrackingStatus = async (email : string, product_id : string, tracking_status : boolean) => {
    console.log(product_id,email,tracking_status)
    await sql`
        UPDATE usertracked SET trackingstatus = ${tracking_status} WHERE email = ${email} AND product_id = ${product_id}
    `
    revalidatePath('/cart');
}

export const deletProductFromUserTracked = async (email : string, product_id : string) => {
    await sql`
        DELETE FROM usertracked WHERE email = ${email} AND product_id = ${product_id}
    `
    revalidatePath('/cart');
}