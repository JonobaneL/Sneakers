export const getMonth = (num)=>{
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    return monthNames[num-1]
}
export const dateSortMethod = (array)=>{
   array.sort((a,b)=>{
        const date1 = a.split('/')
        const date2 = b.split('/')
        
        return date2[0]-date1[0]
    })
    array.sort((a,b)=>{
        const date1 = a.split('/')
        const date2 = b.split('/')
        
        return date2[1]-date1[1]
    })
    return array;
}