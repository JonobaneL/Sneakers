import React,{useEffect, useRef, useState} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import backIcon from '../../images/back-icon.svg'
import Rate from '../../components/UI/rate/Rate';
import styles from './ShoeDetails.module.scss'
import Gallery from '../../components/UI/gallery/Gallery';
import ColorSelect from '../../components/UI/colorSelect/ColorSelect';
import SizeSelect from '../../components/UI/sizeSelect/SizeSelect';
import InfoTabs from '../../components/UI/info-tabs/InfoTabs';
import { useShoppingCart } from '../../context/CartContext';
import { useShoes } from '../../hooks/useShoes';
import Toast from '../../components/Toast/Toast';

const ShoeDetails = () => {
    const {id,colorId} = useParams();
    const currentProduct = useShoes(id,colorId)
    const [poitedColor,setPointedColor] = useState(currentProduct.colorName)
    const {addToCart} = useShoppingCart()
    const warning_ref = useRef();
    const [isToastOpen,setToastOpen] = useState(false)
    const [shoes,setShoes]=useState({id:'',name:'',colorId:1,size:[],quantity:0})
    const goBack = useNavigate()
    const clickHandler = ()=>{
        if(shoes.size.length==0){
            warning_ref.current.hidden = false;
        }else{
            addToCart(shoes.id,...shoes.size,parseInt(shoes.colorId))
            seter();
            setToastOpen(true)
        }
    }
    const seter = ()=>{
        setShoes({ 
            id:currentProduct.id,
            name:currentProduct.name,
            colorId:colorId,
            price:currentProduct.cost,
            size:[],
            quantity:1})
    }
    useEffect(()=>{
        window.scrollTo(0,0)
        seter();
    },[id,colorId])
    return (
        <div className={styles['shoe-details']}>
            <div className={styles.back}>
                <div className={styles["back-content"]}>
                    <img className={styles.content__icon} src={backIcon} alt="back" />
                    <p className={styles.content__title} onClick={()=>goBack(-1)}>Back to Results</p>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles["product-images"]}>
                    <Gallery images={currentProduct.images} width={700}/>
                </div>
                <div className={styles["product-info"]}>
                    <h2 className={styles["product-name"]}>{currentProduct.name}</h2>
                    <div className={styles["product-price"]}>
                        {(currentProduct.discount>0)?
                        <p className={styles.price__discount}>${currentProduct.cost}</p>
                        : null
                        }
                        <p className={currentProduct.discount?styles.price__diabled:styles.price}>${currentProduct.price}</p>
                        {(currentProduct.discount>0)?
                        <p className={styles.discount}>{currentProduct.discount}% off</p>
                        : null
                        }
                    </div>
                    <div className={styles['product-rate']}>
                        <Rate rateIndex={currentProduct.rate} width='100px' />
                    </div>
                    <div className={styles["product-color"]}>
                        <p className={styles.blockTitle}>Color: {poitedColor}</p>
                        <ColorSelect colors={currentProduct.colors} poitedColor={color=>setPointedColor(color)}/>
                    </div>
                    <div className={styles["product-size"]}>
                        <p className={styles.blockTitle}>Size:   <span hidden className={styles.warringMessage} ref={warning_ref}>Please select a size</span></p>
                        <SizeSelect notAvailable={currentProduct.nAvailable} choosed={shoes.size} handler={(data)=>setShoes({...shoes,size:data})} type='single'/>
                    </div>
                    <button 
                        onClick={clickHandler} 
                        className={styles['add-button']}
                    >Add to cart</button>
                </div>
                <div className={styles["product-description"]}>
                    <h2 className={styles.title}>Details</h2>
                    <p>{currentProduct.descripion[0]}</p>
                    <ul className={styles.advantages}>
                        {currentProduct.descripion.map((item,index)=>
                            index!=0
                            ?<li key={index}>{item}</li>
                            :null
                        )}
                    </ul>
                </div>
                <div className={styles["common-info"]}>
                    <InfoTabs titles={
                        [{id:'1',name:"Delivery"},
                        {id:'2',name:"Payment"},
                        {id:'3',name:"Guarantee"}]
                    }>
                        <div className={styles.tab}>
                            <span className={styles['sub-title']}>Fast delivery 1-3 days</span>
                            <p>Delivery of orders placed before 15:00 takes 1-3 days (delivery time depends on your location).Shipping orders every day!</p>
                            <span className={styles['sub-title']}>Free delivery by Novaya Poshta</span>
                            <p>When ordering from 150$ and full payment by card, product delivery is free.</p>
                            <span className={styles['sub-title']}>Courier delivery</span>
                            <p>Courier delivery in your city is possible for a partial prepayment.</p>
                        </div>
                        <div className={styles.tab}>
                            <ul className={styles.payments}>
                                <li>
                                    Cash on delivery / cash on delivery (possible with a minimum prepayment of $10).<br/>
                                    In the case of 2 or more products in the order - payment of $10 for each product unit.
                                </li>
                                <li>
                                    Bank card Visa / Mastercard, Privat24, LiqPay, Monobank, etc.
                                </li>
                            </ul>
                        </div>
                        <div className={styles.tab}>
                            <p className={styles.guarantee}>According to - Law of Ukraine "<a target='_blank' href='https://zakon.rada.gov.ua/laws/show/1023-12#Text'>On the Protection of Consumer Rights</a>", exchange and return is possible within 14 calendar days from the moment of receipt of the goods.
                            In the case of exchange and return - Customer pays for postal services, except in cases of product shortage and/or our error during shipment. In such cases, the costs are covered by the online store.
                            </p>
                        </div>
                    </InfoTabs>
                </div>
            </div>
            <Toast type="success" open={isToastOpen} closeHandler={() => setToastOpen(false)}>Added to Cart</Toast>
        </div>
    );
};


export default ShoeDetails;