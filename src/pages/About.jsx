import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import { AnimatePresence, motion } from 'framer-motion';
import { bestSellers } from '../data/homeSneakersData';

// const ToastItem = ({data,deleteHandler})=>{
//     setTimeout(()=>{
//         deleteHandler(data.id)
//     },2000)
//     return (
//         <motion.li
//         layout
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.8, opacity: 0 }}
//         transition={{ type: "spring",duration:0.5 }}
//         className={`${styles.toast__item} ${styles[data.type]}`}
//         onClick={()=>deleteHandler(data.id)}
//         >
//         {data.title}
//         <div className={`${styles.progress} ${styles[data.type]}`}/>
//         </motion.li>
//     )
// }

const About = () => {
    // console.log(matches)
//   const [toast,setToast] = useState([
//     { id: "22", title: "Added to cart", type: "success" }
//   ])
//   const [title,setTitle] = useState('')
//   const addToast = (prop2,prop1) =>{
//     setToast(p=>[...p,{id:`${Date.now()}`,title:prop1,type:prop2}])
//   }
//   const removerToast =(id) =>{
//     setToast(p=>p.filter(item=>item.id!==id))
//   }
    // const [start,setStart] = useState(0)
    // const [end,setEnd] = useState(5)
    const toScroll = 1;
    const [[start,end],setBorders]=useState([0,5])
    const [direction,setDirection] = useState(0)
    console.log(start,end)
    
    const paginate =(newDirection)=>{
        setBorders([start+(newDirection*toScroll),end+(newDirection*toScroll)]);
        setDirection(newDirection)
    }
   
    const carouselVariants = {
        enter: direction=>{
            return {
                x: direction > 0 ? 200 : -200,
                opacity: 0
            }
        },
        ready:{
            x:0,
            opacity:1,
        },
        exit:direction=>{
            return {
                x: direction < 0 ? 200 : -200,
                opacity: 0
            }
        },
    }

    return <div className={styles.about}>
        <div className={styles.content} >
            {/* <div className="form">
                <input type="text" value={title} onChange={e=>setTitle(e.target.value)} />
                <div style={{display:'flex',gap:'10px'}}>
                    <button onClick={()=>addToast('success',title)}>Success</button>
                    <button onClick={()=>addToast('warning', title)}>Warning</button>
                    <button onClick={()=>addToast( 'error', title)}>Error</button>
                </div>
                
            </div>  */}
            {/* <ul className={styles.toast}>
                <AnimatePresence mode='sync'>
                {
                    toast.map((item)=>
                       <ToastItem key={item.id} data={item} deleteHandler={removerToast} />
                    )
                }
                </AnimatePresence>

            </ul> */}

            <div className={styles.productCarousel}>
                    <motion.div layout className={styles.products}>
                        <AnimatePresence initial={false} custom={direction} mode='popLayout'>
                            {bestSellers.map((item,index)=>{
                                if(index>=start && index<end)
                                return <motion.div 
                                    layout 
                                    key={item.id} 
                                    className={styles.products__item}
                                    initial="enter"
                                    animate="ready"
                                    exit="exit"
                                    custom={direction}
                                    variants={carouselVariants}
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 }
                                    }}
                                    >
                                    <img src={item.colors[0].images[0]} alt="" />
                                    <p>{item.name}{item.id}</p>
                                </motion.div> 
                            })}
                        </AnimatePresence>

                        </motion.div>
            </div>
            <button onClick={()=>paginate(-1)}>prev</button>
            <button onClick={()=>paginate(1)}>next</button>

        </div>
    </div>;
}
 
export default About;