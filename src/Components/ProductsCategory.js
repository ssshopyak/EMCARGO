import React,{useContext, useEffect, useState} from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Navbar } from './Navbar';
import { ProductsContext } from '../Global/ProductsContext';
import findProduct from './FindProduct';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import down from '../images/down.png'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const ProductsCategory = (props) => {
    const [category, setCategory] = useState(null)
    const [subCategory, setSubCategory] = useState(null)
    const [model, setModel] = useState(null)
    const [keyWord, setKeyWord] = useState(null)
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [maxPrice, setMaxPrice] = useState(0)
    const [currentPrice, setCurrentPrice] = useState([0,5000])

    const { products } = useContext(ProductsContext);
    const location = useLocation();
    const history = useHistory();

    const toggleDrawer = () => {
        setIsOpenDrawer((prevState) => !prevState)
    }

    useEffect(()=>{
        setMaxPrice(Math.max(...findProduct(products, keyWord).map(item => item.ProductPrice)))
        setCategory(location.state.Category)
        setSubCategory(location.state.SubCategory)
        setModel(location.state.Model)
        setKeyWord(location.state.KeyWord)
    })

    return (
        <div>
            <Navbar user={props.user}/>
            <div className='productCategoryConatainer'>
                <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
                        <h2 style={{textAlign:'center'}}>{category === null ? 'All Products' : category}</h2>
                        <div style={{minWidth:'10%', display:'flex', justifyContent:'center', margin:'10px 0px'}}>
                            <Button 
                                onClick={toggleDrawer}
                                title={'Filters'}
                                backgroundColor={'#F16A28'}
                                padding={'5px 20px 5px 20px'}
                                color={'#fff'} 
                                border={'1px solid #F16A28'}
                            />
                        </div>
                        <span style={{color:'#fff', alignSelf:'center',display: 'flex', alignItems: 'center'}}>
                            <Link 
                                to={{
                                    pathname:'/category',
                                    state: { Category: category, SubCategory:null, Model:null, KeyWord:null }
                                }}
                                style={{color:'#fff'}}
                            >
                                {category}
                            </Link>
                            {model ?<img src={down} alt='v' style={{width:'18px',transform:'rotate(270deg)'}}/> : null}
                            <Link 
                                to={{
                                    pathname:'/category',
                                    state: { Category: category, SubCategory:null, Model:model, KeyWord:null }
                                }}
                                style={{color:'#fff'}}
                            >
                                {model}
                            </Link>
                            {subCategory ? <img src={down} alt='v' style={{width:'18px',transform:'rotate(270deg)'}}/> : null}
                            <span>{subCategory}</span>
                        </span>
                        <div className='products-container'>
                            {findProduct(products, keyWord).length === 0 && <div>slow internet...no products to display</div>}
                            {findProduct(products, keyWord).map(product => {
                                if (product.ProductCategory === category || category === null) {
                                    if(product.ProductModel === model || model === null) {
                                        if(product.ProductSubCategory === subCategory || subCategory === null) {
                                            if (product.ProductPrice >= currentPrice[0] & product.ProductPrice <= currentPrice[1]) {
                                                return (
                                                    <Link key={product.ProductImg} to={{
                                                        pathname:'/detailed',
                                                        state: { myProp: product }
                                                    }}>
                                                        <div className='product-card'>
                                                            <div className='product-img'>
                                                                <img style={{borderRadius:'4px'}}src={product.ProductImg[0]} alt="not found" />
                                                            </div>
                                                            <div className='product-name'>
                                                                {product.ProductName}
                                                            </div>
                                                            <div className='product-price'>
                                                                ${product.ProductPrice}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )
                                            }
                                        }
                                    }
                                }
                            })}
                        </div>
                    </div>
            </div>
            <Drawer
                open={isOpenDrawer}
                onClose={toggleDrawer}
                direction='left'
                style={{backgroundColor:'#F4F4F4'}}
            >
                <div style={{marginTop:'25px', marginLeft:'10px',marginRight:'10px'}}> 
                    <div style={{display:'flex', justifyContent:'space-between', marginBottom:'5px'}}>
                        <span style={{color:'#000'}}>$ {currentPrice[0]}</span>
                        <span style={{color:'#000'}}>$ {currentPrice[1]}</span>
                    </div>
                    <RangeSlider
                        id="range-slider-yellow"
                        max={maxPrice}
                        rangeSlideDisabled={true}
                        value={currentPrice}
                        onInput={setCurrentPrice}
                    />
                </div>
            </Drawer>
        </div>
    );
}

export default ProductsCategory;