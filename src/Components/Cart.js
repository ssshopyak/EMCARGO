import React, { useContext } from 'react'
import { CartContext } from '../Global/CartContext'
import { Navbar } from './Navbar';
import { Icon } from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md/ic_add'
import { ic_remove } from 'react-icons-kit/md/ic_remove'
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Button } from './Button';

export const Cart = ({ user }) => {

    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);

    const history = useHistory();

    return (
        <>
            <Navbar user={user} />
            <>
                <div className='cart-container'>
                    
                    {
                        shoppingCart.length === 0 &&
                            <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',height:'100vh'}}>
                                <div style={{color:"#fff", fontFamily:'Raleway', alignSelf:'center',textAlign: 'center', marginBottom:'15px'}}>No items in your cart or slow internet causing trouble (Refresh the page) or you are not logged in</div>
                                <Button 
                                    onClick={()=>{history.push('/');}}
                                    title={'Return to Home page'}
                                    backgroundColor={'#F16A28'}
                                    padding={'5px 10px 5px 10px'}
                                    color={'#fff'} 
                                    border={'1px solid #F16A28'}
                                />
                            </div>
                    }
                    <div style={{marginTop:'89px', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    {shoppingCart && shoppingCart.map(cart => (
                        <div className='cart-card' key={cart.ProductID}>
                            <div className='cart-img'>
                                <img src={cart.ProductImg} alt="not found" />
                            </div>
                                <div className='cart-name'>{cart.ProductName}</div>
                                <div className='changeCount'>
                                    <div className='inc' style={{color:'#F16A28'}} onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                                        <Icon icon={ic_add} size={24} />
                                    </div>
                                    <div className='quantity' style={{color:'#000', textAlign:'center'}}>{cart.qty}</div>
                                    <div className='dec' style={{color:'#F16A28'}} onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                                        <Icon icon={ic_remove} size={24} />
                                    </div>
                                </div>
                                <div className='cart-price'>
                                    ${cart.TotalProductPrice}
                                </div>
                                <button className='delete-btn' style={{color:'#F16A28'}} onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                                    <Icon icon={iosTrashOutline} size={24} />
                                </button>
                        </div>
                    ))
                    }
                    {shoppingCart.length > 0 && 
                        <div className='cart-summary'>
                            <div className='cart-summary-heading' style={{color:'#000',marginBottom:'5px'}}>
                                Cart-Summary
                            </div>
                            <div className='cart-summary-price'>
                                <span style={{color:'#000'}}>Total Price</span>
                                <span style={{color:'#000'}}>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className='cart-summary-price'>
                                <span style={{color:'#000'}}>Total Qty</span>
                                <span style={{color:'#000'}}>{totalQty}</span>
                            </div>
                            <div style={{marginTop:'15px',display:'flex', justifyContent:'center'}}>
                            <Button 
                                    onClick={()=>{history.push('/cashout')}}
                                    title={'Check Out'}
                                    backgroundColor={'#F16A28'}
                                    padding={'5px 20px 5px 20px'}
                                    border={'1px solid #F16A28'}
                                    color={'#fff'}/>
                            </div>       
                        </div>
                    }
                    </div>
                </div>
            </>
        </>
    )
}