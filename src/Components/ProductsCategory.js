import React,{useContext} from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { ProductsContext } from '../Global/ProductsContext';
import { Link } from 'react-router-dom';

const ProductsCategory = (props) => {
    const { products } = useContext(ProductsContext);
    const location = useLocation();
    const myProp = location.state.Category;
  
    return (
      <div>
        <Navbar user={props.user}/>
        <div className='productCategoryConatainer'>
        <h2 style={{textAlign:'center'}}>{myProp === null ? 'All Products' : myProp}</h2>
        <div className='products-container'>
            {products.length === 0 && <div>slow internet...no products to display</div>}
            {products.map(product => {
                if (product.ProductCategory === myProp || myProp === null) {
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
        </div>
      </div>
    );
}

export default ProductsCategory;