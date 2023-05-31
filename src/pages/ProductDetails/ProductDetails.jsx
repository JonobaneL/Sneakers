import React, { useRef, useState } from 'react';
import styles from './ProductDetails.module.scss'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import backIcon from '../../images/back-icon.svg'
import InfoTabs from '../../components/UI/info-tabs/InfoTabs';
import { useProduct } from '../../hooks/useProduct';
import Gallery from '../../components/UI/gallery/Gallery';
import Rate from '../../components/UI/rate/Rate';
import ColorSelect from '../../components/UI/colorSelect/ColorSelect';
import SizeSelect from '../../components/UI/sizeSelect/SizeSelect';
import { useShoppingCart } from '../../context/CartContext';
import Toast from '../../components/ToastV2/Toast';


const ProductDetails = () => {
    const {id,colorId} = useParams();
    const currentProduct = useProduct(id,colorId)
    const [poitedColor,setPointedColor] = useState(currentProduct.colorName)
    const warning_ref = useRef();
    const [productColor,setProductColor] = useState([])
    const {addToCart} = useShoppingCart()
    const [isToastOpen,setToastOpen] = useState(false)
    const {state} = useLocation();
    const navigate = useNavigate()
    const addHandler =()=>{
        if(productColor.length==0){
            warning_ref.current.hidden = false;
        }else{
            addToCart(id,...productColor,parseInt(colorId))
            setToastOpen(true)
        }
    }
    const backEvent =()=>{
        navigate(`/${state.type}/${state.male}`)
    }
    return (
        <div className={styles["product-details"]}>
            <div className={styles.back}>
                <div className={styles.content}>
                    <img className={styles.back__icon} onClick={backEvent} src={backIcon} alt="back" />
                    <p className={styles.back__title} onClick={backEvent}>Back to Results</p>
                </div>
            </div>
            <div className={styles.details}>
                <div className={styles.content}>
                    <div className={styles.image}>
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
                            <ColorSelect colors={currentProduct.colors} poitedColor={color=>setPointedColor(color)} locationState={state} />
                        </div>
                        <div className={styles["product-size"]}>
                            <p className={styles.blockTitle}>Size:   <span hidden className={styles.warringMessage} ref={warning_ref}>Please select a size</span></p>
                            <SizeSelect notAvailable={currentProduct.nAvailable} choosed={productColor} handler={(data)=>setProductColor(data)} type='single'/>
                        </div>
                        <button 
                            onClick={addHandler} 
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
            </div>
            <Toast type="success" title='Added to Cart' triger={isToastOpen} closeHandler={setToastOpen}/>
        </div>
    );
};

export default ProductDetails;