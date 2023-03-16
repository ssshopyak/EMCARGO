import React,{useContext} from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from './Button';
import ImageCarousel from './ImageCarousel';
import { Navbar } from './Navbar';
import { CartContext } from '../Global/CartContext';
import { toShowError, toShowSuccess } from './FlashMessages';

const ProductDetails = (props) => {
    const { dispatch } = useContext(CartContext);
    const location = useLocation();
    const myProp = location.state.myProp;

    const addToCart = (product) => {
      if (props.user) {
          dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })
      } else {
          toShowError('Sign in for adding product to cart')
      }

  }

    return (
      <div>
        <Navbar user={props.user}/>
        <div className='productDetailedConatainer'>
            <div className='halfScreen'>
              <ImageCarousel images={myProp.ProductImg}/>
            </div>
            <div className='halfScreen'>
              <div className='bodyText'>
                <h2 style={{fontSize: '48px',textTransform: 'uppercase'}}>{myProp.ProductCategory} <span style={{color:'#CEC9C7'}}>{myProp.ProductName}</span></h2>
                {myProp.ProductDescription.length > 0 && <p>Description : <span style={{color:'#CEC9C7'}}>{myProp.ProductDescription}</span></p>}
                <div style={{display:'flex',flexDirection:'row', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
                  <p className='priceText' style={{fontFamily: 'Inter',margin: '0',fontSize:'24px',marginRight:'24px'}}>{myProp.ProductPrice} $</p>
                  <Button title={'Add to Cart'} onClick={()=>{addToCart(myProp)}} color={'#fff'} backgroundColor={'#F16A28'} padding={'5px 20px 5px 20px'} border={'1px solid #F16A28'}/>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
}

export default ProductDetails;