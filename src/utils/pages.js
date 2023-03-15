export const getTotalPagesCount = (total,limit)=>{
    console.log('func worked')
    return Math.ceil(total/limit);
}