export const getAvailableSizes = (defaultSizes,notAvailable)=>{
    if(notAvailable.lenght==0) return defaultSizes;
    
    if(typeof notAvailable=='string'){
        return defaultSizes.map(item=>{
            if(notAvailable.split(' ').includes(item.value)){
                item.available = false
            }
            return item
        })
    }
    else return defaultSizes;
}