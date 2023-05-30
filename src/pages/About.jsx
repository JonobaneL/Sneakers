import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import { bestSellers } from '../data/homeSneakersData';
import { itemsToShow } from '../utils/itemsToShow';
import DropDownMenu from '../components/UI/dropDownMenu/DropDownMenu';
import Toast from '../components/ToastV2/Toast';

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
    const [isOpen,setIsOpen] = useState(false)
    const [type,setType] = useState('')
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
            <button onClick={()=>{
                setType('success')
                setIsOpen(true)
                }}
            >Success</button>
            <button onClick={()=>{
                setType('warning')
                setIsOpen(true)
                }}
            >Warning</button>
            <button onClick={()=>{
                setType('error')
                setIsOpen(true)
                }}
            >Error</button>
            <Toast title="Fuck" type={type} triger={isOpen} handler={setIsOpen} />           
            
        </div>
    </div>;
}
 
export default About;