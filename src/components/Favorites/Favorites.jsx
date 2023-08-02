import React, { useState } from 'react';
import styles from './Favorites.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../UI/editButton/EditButton';
import { useProduct } from '../../hooks/useProduct';
import Button from '../UI/button/Button'
import ProductItem from '../productsListItem/ProductsItem';
import { removeFromFavorites } from '../../redux/favoritesSlice';
import SkeletonCard from '../UI/skeletonCard/SkeletonCard';

const Product = ({item,triger})=>{
    const dispatch = useDispatch();
    const product = useProduct(item.productID,item.modelID)
    return (
        <div className={styles.product}>
            <div className={`${styles.remove} ${triger?styles.active:''}`}>
                <Button 
                    mode='primary' 
                    width='100px' 
                    height='30px'
                    onClick={()=>dispatch(removeFromFavorites(item))}
                >Remove</Button>
            </div>
            <ProductItem item={{...product,productID:item.productID,modelID:item.modelID}}/>
        </div>
    )
}

const Favorites = () => {
    const {favorites,isLoading} = useSelector(state=>state.favoritesReducer)
    const [editTriger,setEditTriger] = useState(false)
    console.log(favorites)
    return (
        <div className={styles.favorites}>
            <div className={styles["edit-section"]}>
                <EditButton onClick={()=>setEditTriger(p=>!p)}>Edit</EditButton>
            </div>
            {
                isLoading
                ?Array(5).fill(1).map((_,index)=><SkeletonCard key={index}/>)
                :favorites.length>0
                    ?<div className={styles.list}>
                        {
                            favorites.map(item=>{
                                return <Product key={`${item.productID}${item.modelID}`} item={item} triger={editTriger} />
                            })
                        }
                    </div>
                    :<div className={styles['empty-list']}>
                        <h3>Items added to your Favorites will be saved here.</h3>
                    </div>
            }
            
        </div>
    );
};

export default Favorites;