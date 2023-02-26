import React, { setState, useEffect, useState } from 'react'
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


const App = () => {
    const [user, setUser] = useState(null)
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const querySnapshot = getDocs(collection(db, "SignedUpUsersData")).then((querySnapsot) => {
                    querySnapsot.forEach((doc) => {
                        if(doc.data().Email === user.email) {
                            setUser(doc.data().Name)
                        }
                    });
                })   
            }
            else {
                setUser(null)
            }
        })
    },[]) 
        return (
            <ProductsContextProvider>
                <CartContextProvider>
                    <BrowserRouter>
                        <Switch>
                            {/* home */}
                            <Route exact path='/' component={() => <Home user={user} />} />
                            {/* signup */}
                            <Route path="/signup" component={Signup} />
                            {/* login */}
                            <Route path="/login" component={Login} />
                            {/* cart products */}
                            <Route path="/cartproducts" component={() => <Cart user={user} />} />
                            {/* add products */}
                            <Route path="/addproducts" component={AddProducts} />
                            {/* cashout */}
                            <Route path='/cashout' component={() => <Cashout user={user} />} />
                            <Route component={NotFound} />
                        </Switch>
                    </BrowserRouter>
                </CartContextProvider>
            </ProductsContextProvider>
        )
}


export default App
