export function getFinalPrice(price,discount){
    let moneyDiscount = Math.floor(price)*(discount/100);
    return (price - Math.ceil(moneyDiscount)).toFixed(2);
}