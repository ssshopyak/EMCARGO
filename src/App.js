import React, { useEffect, useState } from 'react'
import { ProductsContextProvider } from './Global/ProductsContext'
import { Home } from './Components/Home'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Signup } from './Components/Signup'
import { Login } from './Components/Login'
import { NotFound } from './Components/NotFound'
import { auth, db } from './Config/Config'
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"; 
import { CartContextProvider } from './Global/CartContext'
import { Cart } from './Components/Cart'
import { AddProducts } from './Components/AddProducts'
import { Cashout } from './Components/Cashout'
import Orders from './Components/Orders'
import ProductDetails from './Components/ProductDetailed'
import ProductsCategory from './Components/ProductsCategory'
import Personal from './Components/Personal'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { StoreRegulation } from './Components/StoreRegulation'


const App = () => {
    const [user, setUser] = useState(null)
    const [userUID, setUserUid] = useState('')
    let userCheck = null

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            userCheck = user
            if (user) {
                console.log(user.emailVerified)
                if(user.emailVerified){
                    setUserUid(user.uid)
                    const querySnapshot = getDocs(collection(db, "SignedUpUsersData")).then((querySnapsot) => {
                        querySnapsot.forEach((doc) => {
                            if(doc.data().Email === user.email) {
                                setUser(doc.data().Name)
                            }
                        });
                    })   
                } else {
                    console.log('Pleace verify your account')
                }
            }
            else {
                setUser(null)
            }
        })
    },[userCheck])

    return (
        <PayPalScriptProvider options={{ "client-id": "AVN76x7JXFPKeEVryg729X9JIi04E8nA2WdrD607i8yyTnR-XYkZxRBRj6CgCfMP3gJ50lluHQQw4WQp", currency: 'USD' }}>
        <ProductsContextProvider>
            <CartContextProvider>
                <BrowserRouter basename='/test'>
                    <Switch>
                        <Route exact path='/test' component={() => <Home user={user} />} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/login" component={Login} />
                        <Route path="/cartproducts" component={() => <Cart user={user} />} />
                        <Route path="/addproducts" component={AddProducts} />
                        <Route path='/category' component={() => <ProductsCategory user={user} />} />
                        <Route path='/cashout' component={() => <Cashout user={user} />} />
                        <Route path='/detailed' component={()=> <ProductDetails user={user}/>}/>
                        <Route path='/orders' component={() => <Orders user={user} userUid={userUID}/>} />
                        <Route path='/personal' component={() => <Personal user={user}/> } />
                        <Route path='/regulation' component={() => <StoreRegulation user={user}/>} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </CartContextProvider>
        </ProductsContextProvider>
        </PayPalScriptProvider>
    )
}


export default App
