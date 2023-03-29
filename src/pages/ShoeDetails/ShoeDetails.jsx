import React,{useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { getColorById, getProductById } from '../../utils/getProduct';
import backIcon from '../../images/back-icon.svg'
import Rate from '../../components/UI/rate/Rate';
import styles from './ShoeDetails.module.scss'
import Gallery from '../../components/UI/gallery/Gallery';
import { getFinalPrice } from '../../utils/getFinalPrice';
import ColorSelect from '../../components/UI/colorSelect/ColorSelect';
import { useMemo } from 'react';

const ShoeDetails = () => {
    const {id,colorId} = useParams();
    const currentProduct = getProductById(id);
    const productColor = getColorById(currentProduct,colorId);
    const [poitedColor,setPointedColor] = useState(productColor.title)
    console.log(productColor)
   
    return (
        <div className={styles['shoe-details']}>
            <div className={styles.back}>
                <div className={styles["back-content"]}>
                    <img className={styles.content__icon} src={backIcon} alt="back" />
                    <Link to={'/'} className={styles.content__title}>Back to Results</Link>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles["product-images"]}>
                    <Gallery images={productColor.images} width='600px'/>
                </div>
                <div className={styles["product-info"]}>
                    <h2 className={styles["product-name"]}>{currentProduct.name}</h2>
                    <div className={styles["product-price"]}>
                        {(productColor.discount>0)?
                        <p className={styles.price__discount}>${getFinalPrice(currentProduct.price,productColor.discount)}</p>
                        : null
                        }
                        <p className={productColor.discount?styles.price__diabled:styles.price}>${currentProduct.price}</p>
                        {(productColor.discount>0)?
                        <p className={styles.discount}>{productColor.discount}% off</p>
                        : null
                        }
                        </div>
                    <Rate rateIndex={productColor.rate} width='100px' />
                    <div className={styles["product-color"]}>
                        <p>Color: {poitedColor}</p>
                        <ColorSelect colors={currentProduct.colors} poitedColor={color=>setPointedColor(color)}/>
                    </div>
                </div>
                <div className={styles["product-description"]}>
                    <h2>Details</h2>
                    <p>{currentProduct.descripion[0]}</p>
                    <ul>
                        {currentProduct.descripion.map((item,index)=>
                            index!=0
                            ?<li key={index}>{item}</li>
                            :null
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};


export default ShoeDetails;