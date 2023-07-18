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
import Toast from '../../components/ToastV2/Toast';
import Button from '../../components/UI/button/Button'
import Loader from '../../components/UI/loader/Loader';
import { useDispatch } from 'react-redux';
import { asyncAddToCart } from '../../redux/cartSlice';


const ProductDetails = () => {
    const {id,modelId} = useParams();
    const currentProduct = useProduct(id,modelId)
    const [poitedColor,setPointedColor] = useState(currentProduct.currentModelName)
    const warning_ref = useRef();
    const [productSize,setProductSize] = useState([])
    const [isToastOpen,setToastOpen] = useState(false)
    const {state} = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const addHandler =()=>{
        if(productSize.length==0 && currentProduct.type!=='accessories'){
            warning_ref.current.hidden = false;
        }else{
            dispatch(asyncAddToCart({productID:id,modelID:modelId,size:productSize.toString(),price:currentProduct.price,cost:currentProduct.cost}))
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
            {currentProduct.isLoading &&currentProduct.currentModelName==undefined?<Loader/>
                :<div className={styles.details}>
                    <div className={styles.content}>
                        <div className={styles.image}>
                            <Gallery images={currentProduct.images}/>
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
                                <p className={styles.blockTitle}>Color: {!poitedColor?currentProduct.currentModelName:poitedColor}</p>
                                <ColorSelect models={currentProduct.models} poitedColor={color=>setPointedColor(color)} locationState={state} />
                            </div>
                            {
                                currentProduct.type !=='accessories'
                                ?<div className={styles["product-size"]}>
                                    <p className={styles.blockTitle}>Size:   <span hidden className={styles.warringMessage} ref={warning_ref}>Please select a size</span></p>
                                    <SizeSelect sizes={currentProduct.sizes} choosed={productSize} handler={(size_data)=>setProductSize(size_data)} type='single'/>
                                </div>
                                :<div></div>
                            }
                            
                            <div className={styles['add-button']}>
                            <Button 
                                width='100%'
                                heigh="45px"
                                mode="primary"
                                onClick={addHandler}
                                >
                                Add to cart
                            </Button>
                            </div>
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
                        <InfoTabs titles={['Delivery',"Payment","Guarantee"]}>
                            <div className={styles.tab}>
                                <div className={styles['title']}>Fast delivery 1-3 days</div>
                                <p className={styles['sub-title']}>Delivery of orders placed before 15:00 takes 1-3 days (delivery time depends on your location).Shipping orders every day!</p>
                                <div className={styles['title']}>Free delivery by Novaya Poshta</div>
                                <p className={styles['sub-title']}>When ordering from 150$ and full payment by card, product delivery is free.</p>
                                <div className={styles['title']}>Courier delivery</div>
                                <p className={styles['sub-title']}>Courier delivery in your city is possible for a partial prepayment.</p>
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
                }
            
            <Toast type="success" title='Added to Cart' triger={isToastOpen} closeHandler={setToastOpen}/>
        </div>
    );
};

export default ProductDetails;