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
        color: '#fff',
        fontFamily: 'Raleway',
        fontSize: '18px',
      };
      const unmountedStyle = {
        animation: "closeMenu 1s",
        color: '#fff',
        fontFamily: 'Raleway',
        fontSize: '18px',
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
                    <Link to="/"><img src={logo} alt="" /></Link>
                </div>
                <div className='rightside'>
                    <img src={menu} alt="" onClick={handleOpenMenu}/>
                </div>
                { isMenuOpen &&
                <div className='navDropDownMenu' style={isMenuOpenStyle ? mountedStyle : unmountedStyle}>           
                    <span>
                        <Link
                            onClick={handleOpenMenu} 
                            to={{
                                pathname:'/category',
                                state: { Category: 'Kenworth' }
                            }}
                            className='navlink' 
                            style={{color: '#fff'}}>
                            Kenworth
                        </Link>
                    </span>
                    <span>
                        <Link
                            onClick={handleOpenMenu}  
                            to={{
                                pathname:'/category',
                                state: { Category: 'Volvo' }
                            }}
                            className='navlink' 
                            style={{color: '#fff'}}>
                            Volvo
                        </Link>
                    </span>
                    <span>
                        <Link 
                            onClick={handleOpenMenu} 
                            to={{
                                pathname:'/category',
                                state: { Category: 'DearGuards' }
                            }}
                            className='navlink' 
                            style={{color: '#fff'}}>
                            Dear Guards
                        </Link>
                    </span>
                    <span>
                        <Link 
                            onClick={handleOpenMenu} 
                            to={{
                                pathname:'/category',
                                state: { Category: 'Freightliner' }
                            }}
                            className='navlink' 
                            style={{color: '#fff'}}>
                            Freightliner
                        </Link>
                    </span>
                    <span>
                        <Link 
                            onClick={handleOpenMenu} 
                            to={{
                                pathname:'/category',
                                state: { Category: 'Peterbilt' }
                            }}
                            className='navlink' 
                            style={{color: '#fff'}}>
                            Peterbilt
                        </Link>
                    </span>
                    <span>
                        <Link 
                            onClick={handleOpenMenu}
                            to={{
                                pathname:'/category',
                                state: { Category: null }
                            }}
                            className='navlink' 
                            style={{color: '#fff'}}>
                            All Products
                        </Link>
                    </span>
                    {!user ? 
                    (
                        <div style={{display:'flex', flexDirection:'row', justifyContent:"space-around", width:'60%', marginTop:'15px'}}>
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
                        </div>
                    )
                    :
                    (
                        <div style={{display:'flex', justifyContent:'space-between', width:'60%',alignItems:'center'}}>
                            <span><Link to="/" className='navlink' style={{color: '#fff'}}>{user}</Link></span>
                            <div>
                                <span style={{margin:'0px'}}><Link to="cartproducts" className='navlink' style={{color: '#fff'}}><Icon icon={cart} /></Link></span>
                                <span style={{position:'absolute', borderRadius:'2px',marginTop:'-10px'}}>{totalQty}</span>
                            </div>
                            <Button 
                                onClick={handleLogout}
                                title={'Logout'}
                                color={'#fff'} 
                                backgroundColor={'#F16A28'} 
                                padding={'5px 20px 5px 20px'} 
                                border={'1px solid #F16A28'}
                            />
                        </div>
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
                <Link to="/"><img src={logo} alt="" /></Link>
            </div>
            <div className='links'>
                <span>
                    <Link
                        onClick={handleOpenMenu}  
                        to={{
                            pathname:'/category',
                            state: { Category: 'Kenworth' }
                        }}
                        className='navlink' 
                        style={{color: '#fff'}}>
                        Kenworth
                    </Link>
                </span>
                <span>
                    <Link
                        onClick={handleOpenMenu}  
                        to={{
                            pathname:'/category',
                            state: { Category: 'Volvo' }
                        }}
                        className='navlink' 
                        style={{color: '#fff'}}>
                        Volvo
                    </Link>
                </span>
                <span>
                    <Link 
                        onClick={handleOpenMenu} 
                        to={{
                            pathname:'/category',
                            state: { Category: 'DearGuards' }
                        }}
                        className='navlink' 
                        style={{color: '#fff'}}>
                        Dear Guards
                    </Link>
                </span>
                <span>
                    <Link 
                        onClick={handleOpenMenu} 
                        to={{
                            pathname:'/category',
                            state: { Category: 'Freightliner' }
                        }}
                        className='navlink' 
                        style={{color: '#fff'}}>
                        Freightliner
                    </Link>
                </span>
                <span>
                    <Link 
                        onClick={handleOpenMenu} 
                        to={{
                            pathname:'/category',
                            state: { Category: 'Peterbilt' }
                        }}
                        className='navlink' 
                        style={{color: '#fff'}}>
                        Peterbilt
                    </Link>
                </span>
                <span>
                    <Link 
                        onClick={handleOpenMenu} 
                        to={{
                            pathname:'/category',
                            state: { Category: null }
                        }}
                        className='navlink' 
                        style={{color: '#fff'}}>
                        All Products
                    </Link>
                </span>
            </div>
            {!user && 
                <div className='rightside'>
                    <Button onClick={()=>{history.push('/login')}} title={'Sign in'} color={'#fff'} backgroundColor={'#F16A28'} padding={'5px 20px 5px 20px'} border={'1px solid #F16A28'}/>
                    <Button onClick={()=>{history.push('/signup')}} title={'Sign up'} color={'#F16A28'} backgroundColor={'rgba(0, 0, 0, 0.0)'} padding={'5px 20px 5px 20px'} border={'1px solid #F16A28'}/>
                </div>}
            {user && 
                <div className='rightside'>
                    <span><Link to="/" className='navlink' style={{fontSize:18}}>{user}</Link></span>
                    <span style={{marginLeft:'10px'}}>
                        <Link to="cartproducts" className='navlink'><Icon icon={cart} /></Link>
                        <span style={{position:'absolute', color:'#fff'}}>{totalQty}</span>
                    </span>   
                    <Button 
                        onClick={handleLogout}
                        title={'Logout'}
                        backgroundColor={'#F16A28'}
                        padding={'5px 10px 5px 10px'}
                        color={'#fff'} 
                        border={'1px solid #F16A28'}
                    />
                </div>
            }
        </div>
    )
}
