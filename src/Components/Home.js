import React, { useState } from 'react'
import { Navbar } from './Navbar';
import { Products } from './Products'
import { ShopNow } from './ShopNow';
import { Link } from 'react-router-dom'
import { Footer } from './Footer';

export const Home = ({ user }) => {

    const [selectedCategory, setSelectedCategory] = useState(null)

    const categories = ['Kenworth', 'Volvo', 'DearGuards', 'Freightliner', 'Peterbilt']

    return (
        <div className='wrapper'>
            <Navbar user={user} />
            <ShopNow />
            <div style={{backgroundColor:'#000', height:'80px', display:'flex', alignItems: 'center', justifyContent: 'space-between'}} className="categoryContainer">
                <span style={{marginLeft: '150px', fontSize:'24px', fontFamily:'Raleway', color:'#fff', textTransform:'uppercase', lineHeight:'28px',fontWeight:'700'}} className="leftText">New arrivals</span>
                <Link to={{
                    pathname:'/category',
                    state: { Category: null }
                }}>
                    <span style={{marginRight:'150px', fontSize:'16px', fontFamily:'Raleway', color:'#F16A28', textTransform: 'none', lineHeight:'24px',fontWeight:'700',textDecorationLine: 'underline'}} className="rightText">
                        Shop All
                    </span>
                </Link>
            </div>
            <div className='categoriesContainer' style={{backgroundColor:'#000',justifyContent:'center',display:'flex', flexDirection: 'row'}}>
                {categories.map((category)=>{
                    const changeCategory = (category) => {
                        setSelectedCategory(category)
                    }
                    return (
                        <div key={category} style={{marginLeft:'15px', marginRight:'15px',height:'40px',fontSize:'24px', display:'flex', alignItems:'center', padding: '24px', borderRadius:'24px', border:'1px solid #f16a28', transitionDuration: '0.5s'}} className="categoryButtons">
                            <a style={{color:'#F16A28',width:'100%',textAlign:'center'}} onClick={()=>{changeCategory(category)}}>{category}</a>
                        </div>   
                    );
                })}
            </div>
            <Products category={selectedCategory} />
            <Footer />
        </div>
    )
}
