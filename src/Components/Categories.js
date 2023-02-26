import React, { useContext } from 'react'
import { ProductsContext } from '../Global/ProductsContext'
import { CartContext } from '../Global/CartContext'
import { toShowError } from './FlashMessages';


export const Products = ({user}) => {

    const { products } = useContext(ProductsContext);

    const { dispatch } = useContext(CartContext);

    const addToCart = ({product}) => {
        if (user) {
            dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })
        } else {
            toShowError('Sign in for adding product to cart')
        }
    }

    return (
        <>
            <div className='products-container'>
                {products.length === 0 && <div>slow internet...no products to display</div>}
                {products.map(product => (
                    <div className='product-card' key={product.ProductID} onClick={addToCart}>
                        <div className='product-img'>
                            <img src={product.ProductImg} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.ProductName}
                        </div>
                        <div className='product-price'>
                            {product.ProductPrice} $
                    </div>
                        {/* <button className='addcart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>ADD TO CART</button> */}
                    </div>
                ))}
            </div>
        </>
    )
}
