const numberHelperFunction = (elements : Array<any>) : Number => {
    var res : string = '';
    // console.log(elements);
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
        res = ele?.text()?.trim();
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
export const extractCategory = (elements : Array<any>) : string => {
    var res = '';
    elements.forEach(ele => {
        res = ele.attr()?.alt;
        if(res) return res;
    });
    return res;
}
export const extractReviewCount = (elements : Array<any>) : Number => {
    return numberHelperFunction(elements);
}
export const extractStars = (elements : Array<any>) : Number => {
    return numberHelperFunction(elements);
}
export const extractisOutOfStock = (elements : Array<any>) : boolean => {
    const result = stringHelperFunction(elements);
    return result === "In stock";
}
export const extractDescription = ($: any) : string => {
    // these are possible elements holding description of the product
    const selectors = [
      "#feature-bullets ul.a-unordered-list li.a-spacing-mini span.a-list-item",
    //   ".a-expander-content p",
      // Add more selectors here if needed
    ];
  
    for (const selector of selectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        const textContent = elements
          .map((_: any, element: any) => $(element).text().trim())
          .get()
          .join("/=/");
        return textContent.replace(/(\s\s\s)+/g,'/=/');
      }
    }
  
    // If no matching elements were found, return an empty string
    return "";
  }
export const extractSimilarProducts = ($ : any) => {
    const img_elements = $('.a-section.a-spacing-mini._cDEzb_noop_3Xbw5').find('img');
    const title_elements = $('._cDEzb_p13n-sc-css-line-clamp-5_2l-dX.p13n-sc-truncate-fallback.p13n-sc-line-clamp-5.p13n-sc-truncate-desktop-type2')
    const price_elements = $('div.a-section.aok-relative a.a-link-normal.a-text-normal div.a-row span.a-price span.a-offscreen')
    const similar_products = [];
    for(let i=0; i < img_elements.length; i++) {
        similar_products.push({
            img : img_elements[`${i}`]?.attribs.src,
            title : title_elements[`${i}`]?.children[0].data,
            price : price_elements[`${i}`]?.children[0].data,
            url : title_elements[`${i}`]?.parent?.parent?.attribs?.href
        })
    }
    return similar_products || [];
}
export const emailNotificationType = async (currentProductData : any, scrappedProductData : any) => {
    const THRESHOLD_PERCENTAGE = 20;
    if(scrappedProductData.discountRate >= THRESHOLD_PERCENTAGE){
      return 'THRESHOLD_MET';
    }
    if(scrappedProductData.currentPrice <= scrappedProductData.LowestPrice){
      return 'LOWEST_PRICE';
    }
    if(!scrappedProductData.isOutOfStock && currentProductData.isOutOfStock){
        return 'CHANGE_OF_STOCK';
    }
    return null;
}