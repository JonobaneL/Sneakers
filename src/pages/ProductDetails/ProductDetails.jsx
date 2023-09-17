import React, { useMemo, useRef, useState } from 'react';
import styles from './ProductDetails.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import backIcon from '../../images/back-icon.svg'
import { useProduct } from '../../hooks/useProduct';
import Gallery from '../../components/UI/gallery/Gallery';
import Rate from '../../components/UI/rate/Rate';
import ColorSelect from '../../components/UI/colorSelect/ColorSelect';
import SizeSelect from '../../components/UI/sizeSelect/SizeSelect';
import Toast from '../../components/ToastV2/Toast';
import Button from '../../components/UI/button/Button'
import Loader from '../../components/UI/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCartQuantity } from '../../redux/cartSlice';
import heartIcon from '../../images/header-icons/favorites.svg'
import fullHeartIcon from '../../images/full-heart.svg'
import { addToFavorites, removeFromFavorites } from '../../redux/favoritesSlice';
import CommonInfo from '../../components/CommonInfo/CommonInfo';


const ProductDetails = () => {
    const {id,modelId} = useParams();
    const dispatch = useDispatch()
    const currentProduct = useProduct(id,modelId)
    const [poitedColor,setPointedColor] = useState(currentProduct.currentModelName)
    const warning_ref = useRef();
    const [productSize,setProductSize] = useState([])
    const [isToastOpen,setToastOpen] = useState(false)
    const {favorites} = useSelector(state=>state.favoritesReducer);
    const inFavorites = useMemo(() => {
           return favorites.findIndex(item=>item.productID===id && item.modelID === modelId)
    },[id,modelId,favorites]);
    const navigate = useNavigate()
    const addHandler =()=>{
        if(productSize.length==0 && currentProduct.type!=='accessories'){
            warning_ref.current.hidden = false;
        }else{
            dispatch(increaseCartQuantity({
                productID:id,
                modelID:modelId,
                size:currentProduct.type !=='accessories'?productSize.toString():'standard',
                price:currentProduct.price,
                cost:currentProduct.cost,
                discountPrice:currentProduct.cost,
            }))
            setToastOpen(true)
        }
    }
    const backEvent =()=>{
        if(currentProduct.male){
            navigate(`/${currentProduct.type}/${currentProduct.male}`)
        }
        else{
            navigate(`/${currentProduct.type}`)
        }
    }
    const favoritesHandler = ()=>{
        if(inFavorites < 0){
            dispatch(addToFavorites({productID:id,modelID:modelId}))
        }else{
            dispatch(removeFromFavorites({productID:id,modelID:modelId}))
        }
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
                                <ColorSelect models={currentProduct.models} poitedColor={color=>setPointedColor(color)} />
                            </div>
                            {
                                currentProduct.type !=='accessories'
                                ?<div className={styles["product-size"]}>
                                    <p className={styles.blockTitle}>Size:   <span hidden className={styles.warringMessage} ref={warning_ref}>Please select a size</span></p>
                                    <SizeSelect sizes={currentProduct.sizes} choosed={productSize} handler={(size_data)=>setProductSize(size_data)} type='single'/>
                                </div>
                                :<div></div>
                            }
                            
                            <div className={styles['button-bar']}>
                                <Button 
                                    width='100%'
                                    height="45px"
                                    mode="primary"
                                    onClick={addHandler}
                                    >
                                    Add to cart
                                </Button>
                                <Button 
                                    width='100%'
                                    height="45px"
                                    mode="secondary"
                                    onClick={favoritesHandler}
                                    >
                                    <div className={styles.favorite__content} >
                                        Favorite 
                                        <img className={styles['heart-icon']} src={inFavorites<0?heartIcon:fullHeartIcon} alt="heart" />
                                    </div>
                                </Button>
                            </div>
                        </div>
                        <div className={styles["product-description"]}>
                            <h2 className={styles.title}>Details</h2>
                            <p>{currentProduct.descripion[0]}</p>
                            <ul className={styles.advantages}>
                                {currentProduct.descripion[1].split('. ').map((item,index)=>
                                    index!=0
                                    ?<li key={index}>{item}</li>
                                    :null
                                )}
                            </ul>
                        </div>
                        <div className={styles["common-info"]}>
                            <CommonInfo/>
                        </div>
                    </div>
                </div>
                }
            
            <Toast type="success" title='Added to Cart' triger={isToastOpen} closeHandler={setToastOpen}/>
        </div>
    );
};

export default ProductDetails;