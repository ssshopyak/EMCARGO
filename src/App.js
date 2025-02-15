import React, { useEffect, useState } from 'react'
import { ProductsContextProvider } from './Global/ProductsContext'
import { Home } from './Components/Home'
import { HashRouter , Switch, Route, BrowserRouter } from 'react-router-dom'
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
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";

const App = () => {
    const [user, setUser] = useState(null)
    const [userUID, setUserUid] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    
    let userCheck = null

    useEffect(()=>{
        setIsLoading(true)
        onAuthStateChanged(auth, (user) => {
            userCheck = user
            if (user) {
                if(user.emailVerified){
                    if(user.email === 'ostap.shopyak@gmail.com' ) {
                        setIsAdmin(true)
                    }
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
        setTimeout(()=>{
            setIsLoading(false)
        },1100)  
    },[userCheck])

    if (isLoading) {
        return(
            <div style={{backgroundColor:'#fff',height:'100vh', width:'100vw', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Spinner color="#F16A28" size={32} speed={1} animating={true} />
            </div>
        )
    }

    return (
        <PayPalScriptProvider options={{ "client-id": "test", currency: 'USD' }}>
        <ProductsContextProvider>
            <CartContextProvider>
                <HashRouter  basename='/'> {/*Не забути вернути на BrowserRouter*/}
                    <Switch>
                        <Route exact path='/' component={() => <Home user={user} />} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/login" component={Login} />
                        <Route path="/cartproducts" component={() => <Cart user={user} />} />
                        {isAdmin && <Route path="/addproducts" component={AddProducts} />}
                        <Route path='/category' component={() => <ProductsCategory user={user} />} />
                        <Route path='/cashout' component={() => <Cashout user={user} />} />
                        <Route path='/detailed' component={()=> <ProductDetails user={user}/>}/>
                        <Route path='/orders' component={() => <Orders user={user} userUid={userUID}/>} />
                        <Route path='/personal' component={() => <Personal user={user}/> } />
                        <Route path='/regulation' component={() => <StoreRegulation user={user}/>} />
                        <Route component={NotFound} />
                    </Switch>
                </HashRouter >
            </CartContextProvider>
        </ProductsContextProvider>
        </PayPalScriptProvider>
    )
}


export default App
