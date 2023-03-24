import React, { useContext } from 'react'
import { ProductsContext } from '../Global/ProductsContext'
import { Link } from 'react-router-dom'

export const Products = ({category}) => {

    const { products } = useContext(ProductsContext);
    const sortedArray = products.sort((a, b) => parseFloat(b.ProductID) - parseFloat(a.ProductID)).slice(0,4)
    return (
        <>
            <div className='products-container' style={{backgroundColor:'#F4F4F4'}}>
                {products.length === 0 && <div>slow internet...no products to display</div>}
                {sortedArray.map(product => {
                    if (product.ProductCategory === category || category === null) {
                        return (
                            <Link key={product.ProductImg} to={{
                                pathname:'/detailed',
                                state: { myProp: product }
                            }}>
                                <div className='product-card'>
                                    <div className='product-img'>
                                        <img style={{borderRadius:'4px'}}src={product.ProductImg[0]} alt="not found" />
                                    </div>
                                    <div className='product-name'>
                                        {product.ProductName}
                                    </div>
                                    <div className='product-price'>
                                        ${product.ProductPrice}
                                    </div>
                                </div>
                            </Link>
                        )
                    }      
                })}
            </div>
        </>
    )
}
