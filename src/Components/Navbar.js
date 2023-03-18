import React, { useContext, useEffect, useState } from 'react'
import '../index.css'
import logo from '../images/ecommerce.svg'
import menu from '../images/menu.svg'
import { Link } from 'react-router-dom'
import { auth } from '../Config/Config'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import down from '../images/down.png'
import { useHistory } from 'react-router-dom'
import { CartContext } from '../Global/CartContext'
import { Button } from './Button'
import useScreenType from "react-screentype-hook";
import { db } from '../Config/Config'
import { collection, getDocs, } from "firebase/firestore";

export const Navbar = ({ user }) => {
    const [data, setData] = useState([])
    const [isMobile,setIsMobile] = useState(false)
    const [isMenuOpen,setIsMenuOpen] = useState(false)
    const [isMenuOpenStyle,setIsMenuOpenStyle] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [isSelectedCategoryOpen, setIsSelectedCategoryOpen] = useState(false)
    const [subSelectedCategory, setSubSelectedCategory] = useState(null)
    const [isSubSelectedCategoryOpen, setIsSubSelectedCategoryOpen] = useState(false)

    const [categoryList, setCategoryList] = useState([])

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
        const querySnapshot = getDocs(collection(db, 'Categories')).then((querySnapsot) => {
            querySnapsot.forEach((doc) => {
                setData((prev)=> [...prev, Object.values(doc.data())])
              });
        })
        const querySnapsotCategories = getDocs(collection(db, 'CategoriesForNavBar')).then((querySnapsot) => {
            querySnapsot.forEach((doc) => {
                if(doc.id === 'categories'){ 
                    setCategoryList((prev) => [...prev, doc.data().data])
                }
                
              });
        })
    },[]) 

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
                    <div className='links' style={{display:'flex', flexDirection:'column'}}>
                        {categoryList[0]?.map((category) => {
                            return (
                                <span
                                    key={category}>
                                    <div>
                                        <Link
                                            onClick={handleOpenMenu}  
                                            to={{
                                                pathname:'/category',
                                                state: { Category: category === 'All Products' ? null : category, SubCategory: null, Model: null }
                                            }}
                                            className='navlink' 
                                            style={{color: '#fff'}}>
                                            {category}
                                        </Link>
                                        <img 
                                            src={down}
                                            alt='v'
                                            style={{
                                                transition: "transform .5s",
                                                width:'18px',
                                                marginLeft:'5px',
                                                transform: isSelectedCategoryOpen & selectedCategory === category ? "rotate(0deg)" : "rotate(90deg)"
                                            }}
                                            onClick={()=>{
                                                setIsSelectedCategoryOpen(!isSelectedCategoryOpen)
                                                setSelectedCategory(category)
                                            }}
                                        />
                                    </div>
                                    { selectedCategory === category & isSelectedCategoryOpen ? (
                                        <div
                                            style={{backgroundColor:'#000', display:'flex', flexDirection:'column'}}>
                                            {data.map((menu) => {
                                                return(
                                                    menu.map((element) => {
                                                        if ( element.id === selectedCategory) {
                                                            return (
                                                                <>
                                                                    <span key={element.uid} style={{ color: "#fff",}}>
                                                                        <Link
                                                                            style={{ color: "#fff",}}
                                                                            to={{
                                                                                pathname:'/category',
                                                                                state: { Category: category === 'All Products' ? null : category, SubCategory: null, Model: element.uid }
                                                                            }}
                                                                        >
                                                                            {element.uid}
                                                                        </Link>
                                                                        {element.data.length > 1 &&
                                                                            <img
                                                                                src={down}
                                                                                alt='v'
                                                                                style={{
                                                                                    transition: "transform .5s",
                                                                                    width: '18px',
                                                                                    marginLeft: '5px',
                                                                                    transform: isSubSelectedCategoryOpen & subSelectedCategory === element.uid ? "rotate(0deg)" : "rotate(90deg)"
                                                                                }}
                                                                                onClick={() => {
                                                                                    setIsSubSelectedCategoryOpen(!isSubSelectedCategoryOpen)
                                                                                    setSubSelectedCategory(element.uid)
                                                                                } } />}
                                                                    </span>
                                                                    {element.data.length > 1 & isSubSelectedCategoryOpen & subSelectedCategory === element.uid ? (
                                                                        <div style={{display:'flex', flexDirection:'column'}}>
                                                                            {element.data.map((subCategory) => {
                                                                                return(
                                                                                    <span style={{ color: "#fff" }} key={subCategory}>
                                                                                        <Link
                                                                                            style={{ color: "#F16A28" }} 
                                                                                            to={{
                                                                                                pathname:'/category',
                                                                                                state: { Category: category === 'All Products' ? null : category, SubCategory: subCategory, Model: element.uid }
                                                                                            }}
                                                                                        >
                                                                                            {subCategory}
                                                                                        </Link>
                                                                                    </span>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                        ) : null
                                                                    }
                                                                </>
                                                            )
                                                        } 
                                                    })
                                                )
                                            })}
                                        </div>
                                        ) : null
                                    }
                                </span>
                            )
                        })}
                    </div>   
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
                <span onClick={()=>{
                    console.log(categoryList)
                }}>X</span>
            </div>
            <div className='links' style={{display:'flex', flexDirection:'row'}}>
                {categoryList[0]?.map((category) => {
                    return (
                        <span
                            key={category}>
                            <div>
                                <Link
                                    onClick={handleOpenMenu}  
                                    to={{
                                        pathname:'/category',
                                        state: { Category: category === 'All Products' ? null : category, SubCategory: null, Model: null }
                                    }}
                                    className='navlink' 
                                    style={{color: '#fff'}}>
                                    {category}
                                </Link>
                                <img 
                                    src={down}
                                    alt='v'
                                    style={{
                                        transition: "transform .5s",
                                        width:'18px',
                                        marginLeft:'5px',
                                        transform: isSelectedCategoryOpen & selectedCategory === category ? "rotate(0deg)" : "rotate(90deg)"
                                    }}
                                    onClick={()=>{
                                        setIsSelectedCategoryOpen(!isSelectedCategoryOpen)
                                        setSelectedCategory(category)
                                    }}
                                />
                            </div>
                            { selectedCategory === category & isSelectedCategoryOpen ? (
                                <div
                                    style={{backgroundColor:'#000', position:'absolute', display:'flex', flexDirection:'column'}}>
                                    {data.map((menu) => {
                                        return(
                                            menu.map((element) => {
                                                if ( element.id === selectedCategory) {
                                                    return (
                                                        <>
                                                            <span key={element.uid} style={{ color: "#fff" }}>
                                                                <Link
                                                                    to={{
                                                                        pathname:'/category',
                                                                        state: { Category: category === 'All Products' ? null : category, SubCategory: null, Model: element.uid }
                                                                    }}
                                                                >
                                                                    {element.uid}
                                                                </Link>
                                                                {element.data.length > 1 &&
                                                                    <img
                                                                        src={down}
                                                                        alt='v'
                                                                        style={{
                                                                            transition: "transform .5s",
                                                                            width: '18px',
                                                                            marginLeft: '5px',
                                                                            transform: isSubSelectedCategoryOpen & subSelectedCategory === element.uid ? "rotate(0deg)" : "rotate(90deg)"
                                                                        }}
                                                                        onClick={() => {
                                                                            setIsSubSelectedCategoryOpen(!isSubSelectedCategoryOpen)
                                                                            setSubSelectedCategory(element.uid)
                                                                        } } />}
                                                            </span>
                                                            {element.data.length > 1 & isSubSelectedCategoryOpen & subSelectedCategory === element.uid &&
                                                                <div style={{display:'flex', flexDirection:'column'}}>
                                                                    {element.data.map((subCategory) => {
                                                                        return(
                                                                            <span style={{ color: "#F16A28", }} key={subCategory}>
                                                                                <Link 
                                                                                    style={{ color: "#F16A28"}}
                                                                                    to={{
                                                                                        pathname:'/category',
                                                                                        state: { Category: category === 'All Products' ? null : category, SubCategory: subCategory, Model: element.uid }
                                                                                    }}
                                                                                >
                                                                                    {subCategory}
                                                                                </Link>
                                                                            </span>
                                                                        )
                                                                    })}
                                                                </div>
                                                            }
                                                        </>
                                                    )
                                                } 
                                            })
                                        )
                                    })}
                                </div>
                            ) : null
                            }
                        </span>
                    )
                })}
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
