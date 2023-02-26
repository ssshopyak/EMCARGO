import React, { useContext, useEffect, useState } from 'react'
import '../index.css'
import logo from '../images/ecommerce.svg'
import menu from '../images/menu.svg'
import { Link } from 'react-router-dom'
import { auth } from '../Config/Config'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import { useHistory } from 'react-router-dom'
import { CartContext } from '../Global/CartContext'
import { Button } from './Button'
import useScreenType from "react-screentype-hook";

export const Navbar = ({ user }) => {
    const [isMobile,setIsMobile] = useState(false)
    const [isMenuOpen,setIsMenuOpen] = useState(false)
    const [isMenuOpenStyle,setIsMenuOpenStyle] = useState(false)
    const history = useHistory();
    const { totalQty } = useContext(CartContext);
    const mountedStyle = {
        animation: "openMenu 1s",
      };
      const unmountedStyle = {
        animation: "closeMenu 1s",
      };
    const screenType = useScreenType({
        mobile: 1000,
        tablet: 1100,
        desktop: 1200,
        largeDesktop: 1600,
    });
    useEffect(()=>{
        if (screenType.isMobile || screenType.isTablet) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    },[screenType]) 
    // handle logout
    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/login');
        })
    }
    const handleOpenMenu = () => {
        if (isMenuOpen) {
            setTimeout(()=>{setIsMenuOpen(false)},1000)
            setIsMenuOpenStyle(false)
        } else {
            setIsMenuOpenStyle(true)
            setIsMenuOpen(true)
        }
    }

    if ( isMobile ) {
        return (
            <div className='navboxMobile'>
                <div className='leftside'>
                    <img src={logo} alt="" />
                </div>
                <div className='rightside'>
                    <img src={menu} alt="" onClick={handleOpenMenu}/>
                </div>
                { isMenuOpen &&
                <div className='navDropDownMenu' style={isMenuOpenStyle ? mountedStyle : unmountedStyle}>
                    <span><Link to="login" className='navlink'>Kenworth</Link></span>
                    <span><Link to="login" className='navlink'>Volvo</Link></span>
                    <span><Link to="login" className='navlink'>Dear Guards</Link></span>
                    <span><Link to="login" className='navlink'>Freightliner</Link></span>
                    <span><Link to="login" className='navlink'>Peterbilt</Link></span>
                    <span><Link to="login" className='navlink'>All Products</Link></span>
                    <span><Link to="/" className='navlink' >{user}</Link></span>
                    {!user ? 
                    (
                        <>
                            <Button 
                                onClick={() => { history.push('/login') }}
                                title={'Sign in'}
                                color={'#fff'}
                                backgroundColor={'#F16A28'}
                                padding={'5px 20px 5px 20px'}
                                border={'1px solid #F16A28'}/>
                            <Button 
                                onClick={() => { history.push('/signup') }} 
                                title={'Sign up'} 
                                color={'#F16A28'} 
                                backgroundColor={'rgba(0, 0, 0, 0.0)'} 
                                padding={'5px 20px 5px 20px'} 
                                border={'1px solid #F16A28'}/>
                        </>
                    )
                    :
                    (
                        <>
                            <span><Link to="/" className='navlink'>{user}</Link></span>
                            <span><Link to="cartproducts" className='navlink'><Icon icon={cart} /></Link></span>
                            <span className='no-of-products'>{totalQty}</span>
                            <span><button className='logout-btn' onClick={handleLogout}>Logout</button></span>
                        </>
                    )   
                    }
                </div>
                }
        </div>
        )
    }
    return (
        <div className='navbox'>
            <div className='leftside'>
                <img src={logo} alt="" />
            </div>
            <div className='links'>
                <span><Link to="login" className='navlink'>Kenworth</Link></span>
                <span><Link to="login" className='navlink'>Volvo</Link></span>
                <span><Link to="login" className='navlink'>Dear Guards</Link></span>
                <span><Link to="login" className='navlink'>Freightliner</Link></span>
                <span><Link to="login" className='navlink'>Peterbilt</Link></span>
                <span><Link to="login" className='navlink'>All Products</Link></span>
            </div>
            {!user && 
                <div className='rightside'>
                    <Button onClick={()=>{history.push('/login')}} title={'Sign in'} color={'#fff'} backgroundColor={'#F16A28'} padding={'5px 20px 5px 20px'} border={'1px solid #F16A28'}/>
                    <Button onClick={()=>{history.push('/signup')}} title={'Sign up'} color={'#F16A28'} backgroundColor={'rgba(0, 0, 0, 0.0)'} padding={'5px 20px 5px 20px'} border={'1px solid #F16A28'}/>
                </div>}
            {user && 
                <div className='rightside'>
                    <span><Link to="/" className='navlink' >{user}</Link></span>
                    <span><Link to="cartproducts" className='navlink'><Icon icon={cart} /></Link></span>
                    <span className='no-of-products'>{totalQty}</span>
                    <span><button className='logout-btn' onClick={handleLogout}>Logout</button></span>
                </div>
            }
        </div>
    )
}
