import React from 'react'
import { Navbar } from './Navbar';

export const StoreRegulation = ({user}) => {

    return (
        <>
            <Navbar user={user} />
            <div className='loginContainer'>
                <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '25px', display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ alignSelf: 'center' }}>Store Regulation</h2>
                    <div>
                        <div>
                            <h3 style={{fontFamily:'Raleway', color:'#F16A28'}}>Payment</h3>
                            <span style={{fontFamily:'Raleway'}}>We accept payment by PayPal and credit card.</span>
                        </div>
                        <div>
                            <h3 style={{fontFamily:'Raleway', color:'#F16A28'}}>Returns</h3>
                            <span style={{fontFamily:'Raleway'}}>You can return the product and get a full refund or exchange for up to 30 days from the date of purchase.</span>
                            <br></br>
                            <span style={{fontFamily:'Raleway'}}>Any product you return must be in the same condition you received it, and in the original packaging.</span>
                        </div>
                        <div>
                            <h3 style={{fontFamily:'Raleway', color:'#F16A28'}}>Shipping</h3>
                            <span style={{fontFamily:'Raleway'}}>Your order will be dispatched within one business day of receiving payment (Monday-Friday). </span>
                        </div>
                        <div>
                            <h3 style={{fontFamily:'Raleway', color:'#F16A28'}}>Delivery</h3>
                            <span style={{fontFamily:'Raleway'}}>We can deliver parts on the same day within a 30 miles radius.</span>
                            <br></br>
                            <span style={{fontFamily:'Raleway'}}> If you spend over $500 on our website you'll receive free shipping on your order.</span>
                            <br></br>
                            <span style={{fontFamily:'Raleway'}}>Longer distance deliveries up to 50 miles radius are 25$</span>
                        </div>
                        <div>
                            <h3 style={{fontFamily:'Raleway', color:'#F16A28'}}>Local pick-up</h3>
                            <span style={{fontFamily:'Raleway'}}>You can pick up parts locally at our store in 4210 W 124th Pl, Alsip, IL 60803</span>
                        </div>
                        <div>
                            <h3 style={{fontFamily:'Raleway', color:'#F16A28'}}>Copyright</h3>
                            <span style={{fontFamily:'Raleway'}}>All pictures belong to the website http://eemparts.com/.</span>
                            <br></br>
                            <span style={{fontFamily:'Raleway'}}>Anyone who copies or uses these pictures may or will be sued.</span>
                            <br></br>
                            <span style={{fontFamily:'Raleway'}}>All customers are responsible for reading regulations before purchasing product.</span>
                            <br></br>
                            <span style={{fontFamily:'Raleway'}}>By accepting and verifying an order, the customer agrees to these regulations.</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
