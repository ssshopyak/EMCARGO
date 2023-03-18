import React,{useContext, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { ProductsContext } from '../Global/ProductsContext';
import { Link } from 'react-router-dom';

const ProductsCategory = (props) => {
    const { products } = useContext(ProductsContext);
    const location = useLocation();
    const [category, setCategory] = useState(null)
    const [subCategory, setSubCategory] = useState(null)
    const [model, setModel] = useState(null)

    useEffect(()=>{
        setCategory(location.state.Category)
        setSubCategory(location.state.SubCategory)
        setModel(location.state.Model)
    })

    return (
      <div>
        <Navbar user={props.user}/>
        <div className='productCategoryConatainer'>
        <h2 style={{textAlign:'center'}}>{category === null ? 'All Products' : category}</h2>
        <div className='products-container'>
            {products.length === 0 && <div>slow internet...no products to display</div>}
            {products.map(product => {
                if (product.ProductCategory === category || category === null) {
                    if(product.ProductSubCategory === subCategory || subCategory === null) {
                        if(product.ProductModel === model || model === null) {
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
                    }
                }
            })}
          </div>
        </div>
      </div>
    );
}

export default ProductsCategory;