import { useState } from "react"

export const useToast = ()=>{
    const [toasts,setToasts] = useState([])
    const [delay,setDelay] = useState(2000)
    const addToast = (type,title,delay)=>{
        return setToasts(p=>[...p,{id:`${Date.now()}`,title,type}])
        // if(delay) setDelay(delay)
    }
    const removeToast = (id)=>{
        setToasts(p=>p.filter(item=>item.id!==id))
    }
    console.log(toasts)

    return {
        toasts,
        delay,
        addToast,
        removeToast
    }
}   