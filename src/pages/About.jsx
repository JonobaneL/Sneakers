import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import { useNavigate } from 'react-router-dom'


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
    const [isOpen,setIsOpen] = useState(false)
    return <div className={styles.about}>
        <div className={styles.content} >
          <div  className={styles.tabs}>
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
          </div>
        </div>
    </div>;
}
 
export default About;