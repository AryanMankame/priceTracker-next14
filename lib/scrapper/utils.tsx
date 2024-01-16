const numberHelperFunction = (elements : Array<any>) : Number => {
    var res : string = '';
    elements.forEach(ele => {
        var trimmedData = ele.text().trim();
        if(trimmedData){
            const currPrice = trimmedData.replace(/[^\d.]/g,'');
            if(currPrice){
                res = currPrice.match(/\d+\.\d{2}/)?.[0] || currPrice;
                if(res) return Number(res);
            }
        }
    })
    return res === '' ? -1 : Number(res);
}
const stringHelperFunction = (elements : Array<any>) : string => {
    var res = '';
    elements.forEach(ele => {
        res = ele.text().trim();
        if(res) return res;
    });
    return res;
}
export const extractCurrency = (elements : Array<any>) : string => {
    var currencyString = stringHelperFunction(elements);
    if(currencyString) currencyString = currencyString.substring(0,1);
    return currencyString;
}
export const extractImage = (elements : Array<any>) : string => {
    var res : string = '';
    elements.forEach(ele => {
        const imageUrls = ele.attr('data-a-dynamic-image');
        if(imageUrls){
            const parsedImageUrls = Object.keys(JSON.parse(imageUrls))
            res = parsedImageUrls ? parsedImageUrls[0] : '';
        }
    }) 
    return res;
}
export const extractTitle = (elements : Array<any>) : string => {
    return stringHelperFunction(elements);
}
export const extractPrice = (elements : Array<any>) : Number => {
    return numberHelperFunction(elements);
}
export const extractDiscountRate = (elements : Array<any>) : Number => {
    return numberHelperFunction(elements);
}
export const extractReviewCount = (elements : Array<any>) : Number => {
    return numberHelperFunction(elements);
}
