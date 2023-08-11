export const normilzeCardNumber = (value)=>{
    const card = value.replace(/\s/g,'').match(/.{0,4}/g)?.join(' ').substring(0,19)|| ''
    cartNumber.setValue(card.replace(/\s/g,''));
    return card;
}
export const normilizeDate = (value)=>{
    const nValue = value.replace(/\s/g,'').match(/(\d{1,2})/g)?.join('/').substring(0,5) || '';
    date.setValue(nValue);
    return nValue;
}