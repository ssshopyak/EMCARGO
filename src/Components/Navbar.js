import React, { useContext, useEffect, useState } from 'react'
import '../index.css'
import logo from '../images/ecommerce.svg'
import menu from '../images/menu.svg'
import { Link } from 'react-router-dom'
import { auth } from '../Config/Config'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import {ic_search} from 'react-icons-kit/md/ic_search'
import down from '../images/down.png'
import { useHistory } from 'react-router-dom'
import { CartContext } from '../Global/CartContext'
import { Button } from './Button'
import useScreenType from "react-screentype-hook";
import { db } from '../Config/Config'
import { collection, getDocs, } from "firebase/firestore";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

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
    const [search, setSearch] = useState('')
    const [isOpenedSearch, setIsOpenedSearch] = useState(false)

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
        
    const toggleDrawer = () => {
        setIsMenuOpenStyle((prevState) => !prevState)
    }

    useEffect(()=>{
        console.log(search)
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

    if ( isMobile ) {
        return (
            <><div className='navboxMobile'>
                <div className='leftside'>
                    <Link to="/"><img src={logo} alt="" /></Link>
                </div>
                <div className='rightside' style={{ marginRight: '20px' }}>
                    <img src={menu} alt="" onClick={handleOpenMenu} />
                </div>
            </div><Drawer
                open={isMenuOpenStyle}
                onClose={toggleDrawer}
                direction='right'
                style={{ backgroundColor: '#F4F4F4',display:'flex',flexDirection:'column',alignItems:'center' }}
            >
                    <div className='links' style={{ display: 'flex', flexDirection: 'column', marginTop:'10px' }}>
                        {categoryList[0]?.map((category) => {
                            return (
                                <span
                                    key={category}>
                                    <div>
                                        <Link
                                            onClick={handleOpenMenu}
                                            to={{
                                                pathname: '/category',
                                                state: { Category: category === 'All Products' ? null : category, SubCategory: null, Model: null, KeyWord: null }
                                            }}
                                            className='navlink'
                                            style={{ color: '#000' }}>
                                            {category}
                                        </Link>
                                        <img
                                            src={down}
                                            alt='v'
                                            style={{
                                                transition: "transform .5s",
                                                width: '18px',
                                                marginLeft: '5px',
                                                transform: isSelectedCategoryOpen & selectedCategory === category ? "rotate(0deg)" : "rotate(90deg)"
                                            }}
                                            onClick={() => {
                                                setIsSelectedCategoryOpen(!isSelectedCategoryOpen)
                                                setSelectedCategory(category)
                                            } } />
                                    </div>
                                    {selectedCategory === category & isSelectedCategoryOpen ? (
                                        <div
                                            style={{ backgroundColor: '#f4f4f4', display: 'flex', flexDirection: 'column' }}>
                                            {data.map((menu) => {
                                                return (
                                                    menu.map((element) => {
                                                        if (element.id === selectedCategory) {
                                                            return (
                                                                <>
                                                                    <span key={element.uid} style={{ color: "#000", }}>
                                                                        <Link
                                                                            style={{ color: "#000" }}
                                                                            to={{
                                                                                pathname: '/category',
                                                                                state: { Category: category === 'All Products' ? null : category, SubCategory: null, Model: element.uid, KeyWord: null }
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
                                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                            {element.data.map((subCategory) => {
                                                                                return (
                                                                                    <span style={{ color: "#000" }} key={subCategory}>
                                                                                        <Link
                                                                                            style={{ color: "#F16A28" }}
                                                                                            to={{
                                                                                                pathname: '/category',
                                                                                                state: { Category: category === 'All Products' ? null : category, SubCategory: subCategory, Model: element.uid, KeyWord: null }
                                                                                            }}
                                                                                        >
                                                                                            {subCategory}
                                                                                        </Link>
                                                                                    </span>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    ) : null}
                                                                </>
                                                            )
                                                        }
                                                    })
                                                )
                                            })}
                                        </div>
                                    ) : null}
                                </span>
                            )
                        })}
                    </div>
                    {isOpenedSearch ?
                            <div 
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center"
                                }}>
                                <input
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        padding: "0.375rem 0.75rem",
                                        fontSize: "1rem",
                                        fontWeight: "400",
                                        lineHeight: "1.5",
                                        color: "#212529",
                                        backgroundColor: "#fff",
                                        backgroundClip: "padding-box",
                                        border: "1px solid #ced4da",
                                        appearance: "none",
                                        borderRadius: "0.375rem",
                                        animation: isOpenedSearch ? "fade-out 5s forwards" : "fade-in 5s forwards"
                                    }}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)} >
                                    </input>
                                    <Link
                                        to={{
                                            pathname:'/category',
                                            state: { Category: null, SubCategory: null, Model: null, KeyWord:search }
                                        }}
                                        style={{ position: 'absolute', marginRight: '10px', color:'#F16A28' }}
                                    >
                                        <Icon icon={ic_search} size={22} onClick={() => {console.log(search)}} />
                                    </Link>
                                    
                            </div> : null
                        }
                    {!user ?
                        (
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around", width: '100%', marginTop: '15px' }}>
                                <Button
                                    onClick={() => { history.push('/login') } }
                                    title={'Sign in'}
                                    color={'#fff'}
                                    backgroundColor={'#F16A28'}
                                    padding={'5px 20px 5px 20px'}
                                    border={'1px solid #F16A28'} />
                                <Button
                                    onClick={() => { history.push('/signup') } }
                                    title={'Sign up'}
                                    color={'#F16A28'}
                                    backgroundColor={'rgba(0, 0, 0, 0.0)'}
                                    padding={'5px 20px 5px 20px'}
                                    border={'1px solid #F16A28'} />
                            </div>
                        )
                        :
                        (
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', alignItems: 'center', marginTop:'10px' }}>
                                <span><Link to="/" className='navlink' style={{ color: '#000' }}>{user}</Link></span>
                                <div>
                                    <Icon icon={ic_search} size={22} style={{color:'#fff',marginRight:'10px'}} onClick={()=>{setIsOpenedSearch(!isOpenedSearch)}}/>
                                    <span style={{ margin: '0px' }}><Link to="cartproducts" className='navlink' style={{ color: '#fff' }}><Icon icon={cart} /></Link></span>
                                    <span style={{ position: 'absolute', borderRadius: '2px', marginTop: '-10px' }}>{totalQty}</span>
                                </div>
                                <Button
                                    onClick={handleLogout}
                                    title={'Logout'}
                                    color={'#fff'}
                                    backgroundColor={'#F16A28'}
                                    padding={'5px 20px 5px 20px'}
                                    border={'1px solid #F16A28'} />
                            </div>
                        )}
                </Drawer></>
        )
    }
    return (
        <div className='navbox'>
            <div className='leftside'>
                <Link to="/"><img src={logo} alt="" /></Link>
            </div>
            <div className='links' style={{display:'flex', flexDirection:'row'}}>
                {categoryList[0]?.map((category) => {
                    return (
                        <span
                            className='linkHover'
                            onMouseEnter={() => setSelectedCategory(category)}
                            key={category}>
                            <div style={{display:'flex',alignItems:'center'}}>
                                <Link
                                    onClick={handleOpenMenu}  
                                    to={{
                                        pathname:'/category',
                                        state: { Category: category === 'All Products' ? null : category, SubCategory: null, Model: null, KeyWord:null }
                                    }}
                                    className='navlink' 
                                    style={{color: '#000',fontSize:'24px',textDecoration:'none'}}>
                                    {category}
                                </Link>
                                <img 
                                    src={down}
                                    alt='v'
                                    style={{
                                        transition: "transform .5s",
                                        width:'24px',
                                        marginLeft:'5px',
                                        transform: isSelectedCategoryOpen & selectedCategory === category ? "rotate(0deg)" : "rotate(0deg)"
                                    }}
                                    onClick={()=>{
                                        setIsSelectedCategoryOpen(!isSelectedCategoryOpen)
                                        setSelectedCategory(category)
                                    }}
                                />
                            </div>
                            { selectedCategory === category ? (
                                <div
                                    className='hoverMenu'
                                    style={{backgroundColor:'#fff',  display:'none', position:'relative', flexDirection:'column', border:'1px solid #f16a28', borderTopWidth:'0px', borderBottomLeftRadius:'12px', borderBottomRightRadius:'12px',padding:'10px'}}>
                                    
                                    {data.map((menu) => {
                                        return(
                                            menu.map((element, index) => {
                                                console.log(menu.length - 1 + '/' + index)
                                                if ( element.id === selectedCategory) {
                                                    return (
                                                        <>
                                                            <span key={element.uid} style={{ color: "#000", marginTop:'10px', marginBottom:'10px' }} onMouseEnter={() => setSubSelectedCategory(element.uid)}>
                                                                <Link
                                                                    to={{
                                                                        pathname:'/category',
                                                                        state: { Category: category === 'All Products' ? null : category, SubCategory: null, Model: element.uid, KeyWord:null }
                                                                    }}
                                                                    style={{color:'#000'}}
                                                                >
                                                                    {element.uid}
                                                                </Link>
                                                                {element.data.length > 1 ?
                                                                    <img
                                                                        src={down}
                                                                        alt='v'
                                                                        style={{
                                                                            transition: "transform .5s",
                                                                            width: '18px',
                                                                            marginLeft: '5px',
                                                                            transform: isSubSelectedCategoryOpen & subSelectedCategory === element.uid ? "rotate(0deg)" : "rotate(0deg)"
                                                                        }}
                                                                        onClick={() => {
                                                                            setIsSubSelectedCategoryOpen(!isSubSelectedCategoryOpen)
                                                                            setSubSelectedCategory(element.uid)
                                                                        }}/> : null}
                                                            </span>
                                                            {menu.length - 1 === index ? null : <span style={{width:'100%', height:'1px', backgroundColor:'#F16A28'}}></span>}
                                                            {element.data.length > 1 & subSelectedCategory === element.uid ?
                                                                <div style={{display:'flex', flexDirection:'column'}}>
                                                                    {element.data.map((subCategory) => {
                                                                        return(
                                                                            <span style={{ color: "#F16A28", }} key={subCategory}>
                                                                                <Link 
                                                                                    style={{ color: "#F16A28"}}
                                                                                    to={{
                                                                                        pathname:'/category',
                                                                                        state: { Category: category === 'All Products' ? null : category, SubCategory: subCategory, Model: element.uid, KeyWord:null }
                                                                                    }}
                                                                                >
                                                                                    {subCategory}
                                                                                </Link>
                                                                            </span>
                                                                        )
                                                                    })}
                                                                </div> : null
                                                            }
                                                        </>
                                                    )
                                                } else {
                                                    return null
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
                    <span><Link to="/" className='navlink' style={{fontSize:18, color:'#000'}}>{user}</Link></span>
                    <span style={{marginLeft:'10px'}}>
                        <Icon icon={ic_search} size={22} style={{color:'#fff',marginRight:'10px'}} onClick={()=>{setIsOpenedSearch(!isOpenedSearch)}}/>
                        <Link to="cartproducts" className='navlink'><Icon icon={cart} /></Link>
                        <span style={{position:'absolute', color:'#000'}}>{totalQty}</span>
                    </span>   
                    <Button 
                        onClick={handleLogout}
                        title={'Logout'}
                        backgroundColor={'#F16A28'}
                        padding={'5px 10px 5px 10px'}
                        color={'#fff'} 
                        border={'1px solid #F16A28'}
                    />
                    <div style={{ position:'absolute', marginTop:'10px', display:'flex',flexDirection:'row',justifyContent:'flex-end', alignItems:'center', width:'100%',paddingRight:'10px'}}>
                        {isOpenedSearch ?
                            <>
                                <input
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        padding: "0.375rem 0.75rem",
                                        fontSize: "1rem",
                                        fontWeight: "400",
                                        lineHeight: "1.5",
                                        color: "#212529",
                                        backgroundColor: "#fff",
                                        backgroundClip: "padding-box",
                                        border: "1px solid #ced4da",
                                        appearance: "none",
                                        borderRadius: "0.375rem",
                                        animation: isOpenedSearch ? "fade-out 5s forwards" : "fade-in 5s forwards"
                                    }}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)} />
                                    <Link
                                        to={{
                                            pathname:'/category',
                                            state: { Category: null, SubCategory: null, Model: null, KeyWord:search }
                                        }}
                                        style={{ position: 'absolute', marginRight: '10px', color:'#F16A28' }}
                                    >
                                        <Icon icon={ic_search} size={22} onClick={() => {console.log(search)}} />
                                    </Link>
                                    
                            </> : null
                        }
                    </div>
                </div>
            }
        </div>
    )
}
