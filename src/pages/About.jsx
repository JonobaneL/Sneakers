import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import { useNavigate } from 'react-router-dom'
import { shoes } from '../data/shoes'
import Gallery from '../components/UI/gallery/Gallery'
import { AnimatePresence,motion } from 'framer-motion'

const About = () => {
    const [choosed,setChosed] = useState('Profile')
    const items = ['Profile','Orders','Favorites']
    const content = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus nec feugiat in fermentum posuere urna nec tincidunt. Velit egestas dui id ornare arcu odio ut sem. Ac tortor dignissim convallis aenean et tortor at risus viverra. Mi eget mauris pharetra et. Orci eu lobortis elementum nibh. Sit amet mattis vulputate enim nulla aliquet porttitor. In hac habitasse platea dictumst quisque. Ut placerat orci nulla pellentesque dignissim. Etiam tempor orci eu lobortis elementum nibh tellus. Enim tortor at auctor urna. Eget felis eget nunc lobortis mattis aliquam faucibus. Porttitor eget dolor morbi non arcu risus quis. Blandit turpis cursus in hac habitasse platea dictumst quisque. Nunc sed id semper risus in.',
        'Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque. Amet nulla facilisi morbi tempus. Malesuada fames ac turpis egestas maecenas. Pretium fusce id velit ut tortor pretium. Ut tortor pretium viverra suspendisse potenti nullam ac tortor. Auctor eu augue ut lectus arcu bibendum at varius. Pharetra vel turpis nunc eget lorem dolor sed viverra. Augue mauris augue neque gravida in fermentum. Feugiat vivamus at augue eget arcu dictum varius. Ultrices in iaculis nunc sed augue lacus viverra. Convallis aenean et tortor at risus viverra adipiscing at. Malesuada fames ac turpis egestas sed tempus urna et. Mollis aliquam ut porttitor leo a diam sollicitudin tempor. Viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae.',
        'Semper feugiat nibh sed pulvinar proin. Ut diam quam nulla porttitor massa. Donec massa sapien faucibus et molestie ac feugiat sed lectus. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Augue lacus viverra vitae congue eu. Imperdiet massa tincidunt nunc pulvinar. Eget mi proin sed libero enim sed faucibus turpis. Quam elementum pulvinar etiam non quam. Consequat interdum varius sit amet. Lacinia quis vel eros donec ac odio tempor orci dapibus. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Vel eros donec ac odio tempor orci dapibus ultrices in.'
    ]
    const navigate = useNavigate()
    const chooseHandler = (value)=>{
        setChosed(value)
    }
    const galleryVariant = {
        hidden:{
            opacity:0,
        },
        visible:{
            opacity:1,
        }
    }
    const [isOpen,setIsOpen] = useState(false)
    const [selected,setSelected] = useState(2)
    return <div className={styles.about}>
        <div className={styles.content} >
          {/* <div  className={styles.tabs}>
            <div className={`${styles.nav}`}>
                <ul className={styles.list}>
                    {
                        items.map((item,index)=>{
                            return <li
                            key={index}
                            className={`${styles.list__item} ${item==choosed?styles.active:''}`}
                            onClick={()=>{chooseHandler(item)}}
                            >
                                {item}
                            </li>
                        })
                    }
                    <li 
                        className={styles.list__item}
                        onClick={()=>navigate('/log-in')}
                        >Log Out</li>
                </ul>
                
            </div>
               
                <div className={styles.items}>
                    {
                        items.map((item,index)=>{
                            return <div
                            className={`${styles.item} ${item==choosed?styles.active:''}`}
                            key={index}
                            >
                                {item}
                                <p className={styles.paragraph}>
                                    {content[index]}
                                </p>
                            </div>
                        })
                    }
                </div>
          </div> */}
            <div className={styles.test}>
                <div className={styles['gallery-wrapper']}>
                    <ul className={styles.nav}>
                        {
                            shoes[0].colors[0].images.map((item,index)=>{
                                return <li 
                                    key={index} 
                                    className={`${styles.nav__item} ${selected==index?styles.active:''}`}
                                    onClick={()=>setSelected(index)}
                                >
                                    <img src={item} alt={`nav-item-${index}`} />
                                </li>
                            })
                        }
                    </ul>
                    <div className={styles.gallery}>
                        <motion.div className={styles.block1} animate={{
                            x: `-${selected * 100}%`,
                        }}
                        transition={{
                            x:{duration:0}
                        }}
                        >
                            {
                                shoes[0].colors[0].images.map((item,index)=>{
                                    return <img 
                                        className={styles.b_img} 
                                        src={item} 
                                        alt={`nav-item-${index}`}
                                        key={index}
                                        />
                                })
                            }
                        </motion.div>
                        {/* <AnimatePresence initial={false} mode='wait'> */}
                            {/* <motion.img 
                                key={selected}
                                initial='hidden'
                                animate='visible'
                                exit='hidden'
                                variants={galleryVariant}
                                transition={{
                                    opacity: { duration: 0.15 }
                                }}
                                className={styles.gallery__item}
                                src={shoes[0].colors[0].images[selected]} 
                                alt={`img-${selected}`} 
                                /> */}
                        {/* </AnimatePresence> */}
                    </div>
                </div>
                <div className={styles.text}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt cumque tempora eveniet et consectetur qui voluptatibus nobis nam suscipit. Aspernatur inventore minus ullam saepe sit repudiandae, architecto quas doloribus vero?
                    Saepe quasi quidem laborum recusandae placeat ratione esse iusto atque? Quae amet in dignissimos expedita recusandae, asperiores quis voluptatum saepe reiciendis provident quam corrupti, illo laboriosam corporis voluptates obcaecati accusamus.
                    Illum consequatur soluta quibusdam ea possimus quae magni perspiciatis ipsum rem est eum ipsam consequuntur dicta, deleniti suscipit impedit esse autem atque velit beatae distinctio fugit quidem numquam? Natus, dolor!
                    Ullam at culpa error omnis, officiis, eos iure consectetur repudiandae accusamus esse fuga beatae quibusdam sed officia quis? Fugit labore ullam dolorum debitis quibusdam consectetur delectus nulla fuga cupiditate assumenda.
                    Voluptatem voluptates vel unde quibusdam! Quia laborum corporis repudiandae vitae assumenda maxime odit voluptates impedit reiciendis autem. Consequatur adipisci quo beatae, a mollitia incidunt in deserunt tempora vel explicabo esse.
                    Tempore dolorem facilis quia, veniam error nobis delectus enim hic nulla veritatis, ut tempora tenetur neque beatae quae maiores fuga, nemo iure excepturi! Nihil unde vel eveniet dolor, suscipit possimus?
                    Inventore, eius aperiam cupiditate suscipit facilis eaque earum odio illum tenetur rem magni enim minima. Soluta nam nostrum magni deserunt, eveniet, doloribus sequi velit asperiores consequatur fugiat omnis totam ipsa.
                    Illo vitae eum animi, sequi quaerat ipsa nam aspernatur adipisci enim alias quo quisquam cupiditate, magni distinctio esse nisi! Ad repellendus hic, quod nisi quas earum placeat! Saepe, commodi quis?
                </div>
            </div>
            
        </div>
    </div>;
}
 
export default About;