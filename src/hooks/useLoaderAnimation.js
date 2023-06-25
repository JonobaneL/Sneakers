import { stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";

const staggerMenuItems = stagger(0.2, { startDelay: 0 });

export const useLoaderAnimation = ()=>{
    const [scope, animate] = useAnimate();

    useEffect(()=>{
        animate('li',
        {
            height:[0,50,0],
        },
        {
            repeat:Infinity,
            repeatType:'loop',
            duration:1.5,
            delay:staggerMenuItems
        }
        )
    },[])
    return scope;
}