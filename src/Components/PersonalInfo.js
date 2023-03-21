import React, { useState, useEffect, useContext } from 'react'
import { auth, db } from '../Config/Config'
import { onAuthStateChanged } from "firebase/auth"; 
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { CartContext } from '../Global/CartContext'
import { RegionDropdown } from 'react-country-region-selector'
import delivery from '../images/delivery.png'
import shop from '../images/shop.png'
import { useHistory } from 'react-router-dom'
import { Button } from './Button';
import { toShowSuccess } from './FlashMessages';
import { PayPalButtons } from "@paypal/react-paypal-js";

export const PersonalInfo = ({title}) => {

    const history = useHistory();
    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);
    const states = ['Select Region', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
    // defining state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [country, setCountry] = useState('United States(US)')
    const [streetAddress,setStreetAddress] = useState('')
    const [apartamentNumber, setApartamentNumber] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [postcode, setPostcode] = useState('')
    const [phone, setPhone] = useState('')
    const [docId, setDocId] = useState('')
    const [typeOfDelivery, setIsTypeOfDelivery] = useState('Pick Up')

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const querySnapshot = getDocs(collection(db, "SignedUpUsersData")).then((querySnapsot) => {
                    querySnapsot.forEach((doc) => {
                        if(doc.data().Email === user.email) {
                            setDocId(doc.id)
                            setName(doc.data().Name)
                            setEmail(doc.data().Email)
                            setFirstName(doc.data().FirstName)
                            setLastName(doc.data().LastName)
                            setCompanyName(doc.data().CompanyName)
                            setCountry(doc.data().Country)
                            setStreetAddress(doc.data().StreetAddress)
                            setApartamentNumber(doc.data().ApartamentNumber)
                            setCity(doc.data().City)
                            setState(doc.data().State)
                            setPostcode(doc.data().PostCode)
                            setPhone(doc.data().Phone)
                        }
                      });
                }) 
            }
            else {
                history.push('/login')
            }
        })
    },[])

    const cashoutSubmit = (e) => {
        e.preventDefault();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const Product = shoppingCart.map((shopping)=>{
                    let product = {
                        name : shopping.ProductName,
                        img : shopping.ProductImg[0],
                        price : shopping.ProductPrice,
                        qty : shopping.qty,
                        side : shopping.side
                    }
                    return product
                })
                const date = new Date().toLocaleDateString()
                try {
                    const docRef = addDoc(collection(db, 'Buyer-info-' + user.uid), {
                        BuyerFirstName : firstName,
                        BuyerLastName : lastName,
                        BuyerEmail: email,
                        BuyerCell: phone,
                        BuyerPostcode: postcode,
                        BuyerCity: city,
                        BuyerState: state,
                        BuyerAddress: streetAddress,
                        BuyerApartamentNumber: apartamentNumber,
                        BuyerCompany: companyName,
                        BuyerPayment: totalPrice,
                        BuyerQuantity: totalQty,
                        BuyerGoods: Product,
                        DateOfShop: new Date().toLocaleDateString()
                    }).then((docRef) => {
                        setPhone('');
                        setStreetAddress('');
                        dispatch({ type: 'EMPTY' })
                        toShowSuccess('Your order has been placed successfully. Thanks for visiting us. You will be redirected to home page after 5 seconds');
                        setTimeout(() => {
                            history.push('/')
                        }, 5000)
                    })
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  }
            }
        })
    }

     const updatePersonalInfo = (e) => {
        e.preventDefault();
         const UserDataRef = doc(db, "SignedUpUsersData", docId);
         const updatedDoc = updateDoc(UserDataRef, {
             ApartamentNumber : apartamentNumber,
             City : city,
             CompanyName : companyName,
             Country : country,
             FirstName : firstName,
             LastName : lastName,
             Phone : phone,
             PostCode : postcode,
             State : state,
             StreetAddress : streetAddress,
           }).then(()=>{
                toShowSuccess('Data changed successfully')
           }).catch((e) => {
                console.log(e)
           })
     }

    const onSubmit = (e) => {
        if (title === 'Cashout Details') {
            cashoutSubmit(e)
        } else {
            updatePersonalInfo(e)
        }
    }
    
    if( title === 'Cashout Details' ) {
        return (
            <>
            <form autoComplete="off" className='form-group' style={{textAlign: 'center'}} onSubmit={(e) => {onSubmit(e)}}>
            <div className='loginContainer'>
                <div style={{backgroundColor:'#fff', padding:'25px',borderRadius:'25px', display:'flex', flexDirection:'row', marginTop:"100px", marginBottom:'10px', width:'90%', minHeight:'85vh', justifyContent:'space-between'}} className='cashoutContainer'>
                <div style={{minWidth:'50%'}}>
                    <h2 style={{marginTop:'10px',textAlign:"center",marginBottom:'10px', color:'#000',fontFamily:'Raleway'}}>{title}</h2>
                    <div>
                        
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                            <div style={{display:'flex',flexDirection:'column', margin:'10px', width:'48%'}}>
                                <label style={{color:'#000',fontFamily:'Raleway'}}>First Name</label>
                                <input
                                    type="text" 
                                    className='form-control' 
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <label style={{color:'#000',fontFamily:'Raleway'}}>Phone Number</label>
                                    <input
                                        type="number"
                                        className='form-control' 
                                        required
                                        onChange={(e) => setPhone(e.target.value)}
                                        value={phone}
                                        placeholder='+1-708-334-0110'
                                    />
                            </div>
                            <div style={{display:'flex',flexDirection:'column',margin:'10px', width:'48%'}}>
                                <div style={{display:'flex',flexDirection:'column'}}>
                                <label style={{color:'#000',fontFamily:'Raleway'}}>Last Name</label>
                                <input
                                    type="text" 
                                    className='form-control' 
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                    
                                </div>
                                <div style={{display:'flex',flexDirection:'column'}}>
                                    <label style={{color:'#000',fontFamily:'Raleway'}}>Email</label>
                                    <input
                                        type="email" 
                                        className='form-control' 
                                        required
                                        value={email}
                                        disabled
                                    />

                                </div>
                            </div>
                            </div>
                    </div>
                    <div style={{display:'flex', flexDirection:'column',}}>
                        <span style={{margin:'10px'}}>Delivery Option</span>
                        <label style={{height: '60px', borderRadius:'12px', margin:'10px', border:'1px solid #ced4da', display:'flex',alignItems:'center', textAlign:'center'}}>
                            <input
                              type="radio"
                              value="Ship"
                              style={{marginLeft:'10px'}}
                              checked={typeOfDelivery === "Ship"}
                              onChange={()=>{setIsTypeOfDelivery('Ship')}}
                            />
                            <img src={delivery} alt='ship' style={{height:'24px', marginLeft:'10px', marginRight:'10px'}}/>
                            Ship
                        </label>
                        <label style={{height: '60px', borderRadius:'12px', margin:'10px', border:'1px solid #ced4da', display:'flex',alignItems:'center', textAlign:'center'}}>
                            <input
                              type="radio"
                              value="Pick Up"
                              style={{marginLeft:'10px'}}
                              checked={typeOfDelivery === "Pick Up"}
                              onChange={()=>{setIsTypeOfDelivery('Pick Up')}}
                            />
                            <img src={shop} alt='ship' style={{height:'24px', marginLeft:'10px', marginRight:'10px'}}/>
                            Pick Up
                        </label>
                    </div>
                    <div>
                        { typeOfDelivery === "Pick Up" ? 
                            (
                                <>
                                    <span>Pickup locations</span>
                                    <div style={{ height: '60px', borderRadius: '12px', margin: '10px', border: '1px solid #ced4da', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '5px', marginRight: '5px' }}>
                                            <span>4210 W 124th Pl</span>
                                            <span style={{ fontWeight: 'bold' }}>Free</span>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '5px', marginRight: '5px' }}>
                                            <span style={{ fontSize: '12px' }}>4210 W 124th Pl, Alsip, IL</span>
                                            <span style={{ fontSize: '12px' }}>Usually ready in 24 hours</span>
                                        </div>
                                    </div>
                                </>
                            ) 
                            : 
                            (
                                <div style={{display:'flex', flexDirection:'column', margin:'10px'}}>
                                    <div>                    
                                        <label style={{color:'#000',fontFamily:'Raleway'}}>Country/Region</label>
                                        <input
                                            type="text" 
                                            className='form-control' 
                                            required
                                            disabled
                                            value={'United States(US)'}
                                            onChange={(e) => setCountry(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label style={{color:'#000',fontFamily:'Raleway'}}>State / County</label>
                                        <select value={state} onChange={(event)=>{setState(event.target.value)}} className='form-control'>
                                            {states.map((state) => {
                                                return (
                                                    <option value={state}>{state}</option>
                                                ) 
                                            })}
                                        </select> 
                                    </div>
                                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:'10px'}}>
                                        <div style={{width:'48%'}}>
                                            <label style={{color:'#000',fontFamily:'Raleway'}}>Street Address</label>
                                            <input
                                                type="text" 
                                                className='form-control'
                                                placeholder='House number and street name' 
                                                required
                                                value={streetAddress}
                                                onChange={(e) => setStreetAddress(e.target.value)}
                                            />
                                        </div>
                                        <div style={{width:'48%'}}>
                                           <label style={{color:'#000',fontFamily:'Raleway'}}>Zipcode</label>
                                            <input
                                                type="text" 
                                                className='form-control'
                                                required
                                                value={postcode}
                                                onChange={(e) => setPostcode(e.target.value)}
                                            />  
                                        </div>                    
                                    </div>
                                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:'10px'}}>
                                    <div style={{width:'48%'}}>
                                            <label style={{color:'#000',fontFamily:'Raleway'}}>City</label>
                                            <input
                                                type="text" 
                                                className='form-control'
                                                required
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                    </div>
                                    <div style={{width:'48%'}}>
                                        <label style={{color:'#000',fontFamily:'Raleway'}}>Apartament, suite, unit</label>                    
                                        <input
                                            type="text" 
                                            className='form-control'
                                            placeholder='Apartament, suite, unit'  
                                            required
                                            value={apartamentNumber}
                                            onChange={(e) => setApartamentNumber(e.target.value)}
                                        />
                                    </div>                 
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div style={{minWidth:'50%'}}>
                    <div >
                        {
                            shoppingCart.map((shopping)=>{
                                let product = {
                                    name : shopping.ProductName,
                                    img : shopping.ProductImg[0],
                                    price : shopping.ProductPrice,
                                    qty : shopping.qty
                                }
                                return (
                                    <div style={{borderRadius:'12px', margin:'10px', border:'1px solid #ced4da', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                        <img src={product.img} style={{height:'100px', padding:'5px'}} alt='product'/>
                                        <span style={{marginTop:'10px'}}>{product.name}</span>
                                        <span style={{marginTop:'10px',}}>$ {product.price} </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div style={{margin:'10px'}}>
                        <div style={{display:'flex', flexDirection:"row", justifyContent:'space-between', marginTop:'5px', marginBottom:'5px'}}>
                            <span style={{fontSize:'18px'}}>Subtotal</span>
                            <span style={{fontSize:'18px'}}>$ {totalPrice}</span>
                        </div>
                        <div style={{display:'flex', flexDirection:"row", justifyContent:'space-between', marginTop:'5px', marginBottom:'5px'}}>
                            <span style={{fontSize:'18px'}}>{typeOfDelivery}</span>
                            <span style={{fontSize:'18px',whiteSpace:'pre-line', textAlign:'right'}}>{typeOfDelivery === 'Pick Up' ? 'Free': 'Free if you live\nin the Chicago area\nand spend over $500\non our website'}</span>
                        </div>
                        <div style={{display:'flex', flexDirection:"row", justifyContent:'space-between', marginTop:'5px', marginBottom:'5px'}}>
                            <span style={{fontSize:'18px'}}>Taxes</span>
                            <span style={{fontSize:'18px'}}>$ {(totalPrice * 0.115).toFixed(2)}</span>
                        </div>
                    </div>
                    <div style={{display:'flex', flexDirection:"row", justifyContent:'space-between', margin:'10px'}}>
                        <span style={{fontWeight:'bold', fontSize:"24px"}}>Total</span>
                        <span style={{fontWeight:'bold', fontSize:"24px"}}>usd $ {(totalPrice * 1.115).toFixed(2)}</span>
                    </div>
                    <div style={{margin:'10px'}}>
                        <PayPalButtons style={{ layout: "vertical", color:'black' }} 
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: totalPrice,
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={(data, actions) => {
                                return actions.order.capture().then((details) => {
                                    const name = details.payer.name.given_name;
                                    cashoutSubmit(new Event("submit", { cancelable: true }))
                                    toShowSuccess(`Transaction completed by ${name}`);
                                });
                            }}/>
                    </div> 
                </div>
                </div>
            </div>
            </form>
        </>
        )
    }

    return (
        <>
            <div className='loginContainer'>
                <div style={{backgroundColor:'#fff', padding:'25px',borderRadius:'25px', display:'flex', flexDirection:'column', marginTop:"100px", marginBottom:'10px'}}>
                <h2 style={{marginTop:'10px',textAlign:"center",marginBottom:'10px', color:'#000',fontFamily:'Raleway'}}>{title}</h2>
                <form autoComplete="off" className='form-group' onSubmit={(e) => {onSubmit(e)}}>
                    <label style={{color:'#000',fontFamily:'Raleway'}}>Nickname</label>
                    <input 
                        type="text"
                        className='form-control'
                        required
                        disabled
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label style={{color:'#000',fontFamily:'Raleway'}}>First Name</label>
                    <input
                        type="text" 
                        className='form-control' 
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label style={{color:'#000',fontFamily:'Raleway'}}>Last Name</label>
                    <input
                        type="text" 
                        className='form-control' 
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <label style={{color:'#000',fontFamily:'Raleway'}}>Company Name</label>
                    <input
                        type="text" 
                        className='form-control' 
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <label style={{color:'#000',fontFamily:'Raleway'}}>Country/Region</label>
                    <input
                        type="text" 
                        className='form-control' 
                        required
                        disabled
                        value={'United States(US)'}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <label style={{color:'#000',fontFamily:'Raleway'}}>Street Address</label>
                    <input
                        type="text" 
                        className='form-control'
                        placeholder='House number and street name' 
                        required
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                    />
                    <input
                        type="text" 
                        className='form-control'
                        placeholder='Apartament, suite, unit'  
                        required
                        value={apartamentNumber}
                        onChange={(e) => setApartamentNumber(e.target.value)}
                    />
                    <label style={{color:'#000',fontFamily:'Raleway'}}>City</label>
                    <input
                        type="text" 
                        className='form-control'
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <label style={{color:'#000',fontFamily:'Raleway'}}>State / County</label>
                    <select value={state} onChange={(event)=>{setState(event.target.value)}} className='form-control'>
                        {states.map((state) => {
                                return (
                                    <option value={state}>{state}</option>
                                ) 
                            })
                        }
                    </select>                               
                    <label style={{color:'#000',fontFamily:'Raleway'}}>Zipcode</label>
                    <input
                        type="text" 
                        className='form-control'
                        required
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                    />            
                    <label style={{color:'#000',fontFamily:'Raleway'}}>Email</label>
                    <input
                        type="email" 
                        className='form-control' 
                        required
                        value={email}
                        disabled
                    />
                    <label style={{color:'#000',fontFamily:'Raleway'}}>Phone Number</label>
                    <input
                        type="number"
                        className='form-control' 
                        required
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        placeholder='+1-708-334-0110'
                    />
                    <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center' }}>
                        <Button type='submit' title='Submit' color={'#fff'} backgroundColor={'#f16a28'} padding={'5px 20px 5px 20px'} />
                    </div>
                </form>
                </div>
            </div>
        </>
    )
}
