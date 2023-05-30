export const itemsToShow = ()=>{
    const windowSize = window.screen.availWidth;
    const padding = windowSize > 768 ? 80 : windowSize <= 375 ? 20 : 40;
    const nav = 50;
    const itemSize = windowSize>768?200:180
    const items = Math.floor(((windowSize-(padding*2))-(nav*2))/itemSize)
   console.log(padding,itemSize)
    return items==0?1:items>5?5:items
}