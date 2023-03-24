import React,{useContext, useState} from 'react';
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
    const [side, setSide] = useState('')
    const sideProduct = Object.assign({side:side},myProp,{ProductPrice: side === 'Driver side' || side === 'Passenger side' ? myProp.ProductPrice/2 : myProp.ProductPrice})
  
    const addToCart = (product) => {
      console.log(sideProduct)
      if (props.user) {
          dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product }) 
      } else {
          toShowError('Sign in for adding product to cart')
      }

  }

    return (
        <div style={{maxWidth:'100vw', maxHeight:'100vh'}}>
          <Navbar user={props.user} />
          <div className='productDetailedConatainer'>
        <div className='imageScreen'>
          <ImageCarousel images={myProp.ProductImg} />
        </div>
        <div className='halfScreen'>
          <div className='bodyText'>
            <h2 style={{ fontSize: '24px', textTransform: 'uppercase', marginBottom:'10px' }}>{myProp.ProductCategory} <span style={{ color: '#CEC9C7' }}>{myProp.ProductName}</span></h2>
            <span style={{ color: '#F16A28' }}>{myProp.ProductModel}<span style={{ color: '#000' }}>{' / '}</span>{myProp.ProductSubCategory}</span>
            {myProp.ProductDescription.length > 0 && <p>Description: <span style={{ color: '#CEC9C7' }}>{myProp.ProductDescription}</span></p>}
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', alignItems: 'center', textAlign: 'center' }}>
              { myProp.ProductSide ?
                <div style={{display:'flex', alignItems:'center', marginRight:'20px'}}>
                  <label style={{color:'#000',fontFamily:'Raleway', marginRight:'10px'}}>Side</label>
                  <select value={side} onChange={(event)=>{setSide(event.target.value)}} className='form-control' style={{color:'#000', backgroundColor:'#fff', border:'1px solid #F16A28'}}>
                    <option value={'Set Both Sides'}>Set Both Sides</option>
                    <option value={'Driver side'}>Driver side</option>
                    <option value={'Passenger side'}>Passenger side</option>
                  </select>
                </div> : null
              }
              <span className='priceText' style={{ fontFamily: 'Inter', margin: '0', fontSize: '24px', marginRight: '24px', display:'flex', justifyContent:'row' }}>${sideProduct.ProductPrice}</span>
              <Button title={'Add to Cart'} onClick={() => { addToCart(sideProduct) } } color={'#fff'} backgroundColor={'#F16A28'} padding={'5px 20px 5px 20px'} border={'1px solid #F16A28'} />
            </div>
          </div>
        </div>
      </div></div>
    );
}

export default ProductDetails;