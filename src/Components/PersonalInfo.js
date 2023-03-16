import React, { useState, useEffect, useContext } from 'react'
import { auth, db } from '../Config/Config'
import { onAuthStateChanged } from "firebase/auth"; 
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { CartContext } from '../Global/CartContext'
import { Navbar } from './Navbar';
import { useHistory } from 'react-router-dom'
import { Button } from './Button';
import { toShowSuccess } from './FlashMessages';
import { PayPalButtons } from "@paypal/react-paypal-js";

export const PersonalInfo = ({title}) => {

    const history = useHistory();
    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);

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
                        qty : shopping.qty
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
                        value={country}
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
                    <label style={{color:'#000',fontFamily:'Raleway'}}>Town / City</label>
                    <input
                        type="text" 
                        className='form-control'
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <label style={{color:'#000',fontFamily:'Raleway'}}>State / County</label>
                    <input
                        type="text" 
                        className='form-control'
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />         
                    <label style={{color:'#000',fontFamily:'Raleway'}}>Postcode / Zip</label>
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
                    { title === 'Cashout Details' &&
                        <>
                            <label style={{ color: '#000', fontFamily: 'Raleway' }}>Price To Pay</label>
                            <input 
                                type="number" 
                                className='form-control' 
                                required
                                value={totalPrice}
                                disabled 
                            />
                            <label style={{ color: '#000', fontFamily: 'Raleway' }}>Total of Products</label>
                            <input 
                                type="number" 
                                className='form-control' 
                                required
                                value={totalQty}
                                disabled 
                            />
                            <div style={{marginTop:'15px'}}>
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
                                            alert(`Transaction completed by ${name}`);
                                        });
                                    }}/>
                            </div> 
                        </>
                    }
                    { title === 'Personal Info' &&
                        <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center' }}>
                            <Button type='submit' title='Submit' color={'#fff'} backgroundColor={'#f16a28'} padding={'5px 20px 5px 20px'} />
                        </div>
                    }
                </form>
                </div>
            </div>
        </>
    )
}
