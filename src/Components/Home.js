import React, { useEffect } from 'react'
import { Navbar } from './Navbar';
import { Products } from './Products'
import { ShopNow } from './ShopNow';

export const Home = ({ user }) => {

  
    useEffect(() => {
        // forcing user to signup
        // auth.onAuthStateChanged(user => {
        //     if (!user) {
        //         history.push('/login');
        //     }
        // })
    },[])

    return (
        <div className='wrapper'>
            <Navbar user={user} />
            <ShopNow />
            <Products />
        </div>
    )
}
