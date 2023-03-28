import {shoes} from './shoes'
export const bestSellers = shoes.filter((_,index)=>index<10)
export const novelty = shoes.filter((_,index)=>index>=10 && index<20)
