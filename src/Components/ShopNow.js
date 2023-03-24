import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'
import truck from '../images/trackPhoto.png'
import {ic_search} from 'react-icons-kit/md/ic_search'
import { Icon } from 'react-icons-kit'
export const ShopNow = () => {

    const isMobile = window.innerWidth >= 1200
    const [search, setSearch] = useState('')
    return (
        <div className='shopnow'>
            <div className='textContainer'>
                <div className='title'>
                    {"EXCEPTIONAL SERVICE "}<span style={{color: "#F16A28"}}>IN</span>{"\n TWO LOCATIONS "}<span style={{color: isMobile ? "#0D1467":"#F16A28"}}>WITH</span> {"\n FREE DELIVERY"}
                </div>
                <div className='bodytext'>
                    {"Find everything for your truck right here. You can buy directly in our\n website or just call us! Find everything for your truck right here."}
                </div>
                <div style={{marginLeft:145}}>
                <span 
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom:'10px'
                            }}>
                            <input
                                style={{
                                    display: "block",
                                    padding: "0.375rem 1.25rem",
                                    fontSize: "1rem",
                                    fontWeight: "400",
                                    lineHeight: "1.5",
                                    color: "#212529",
                                    backgroundColor: "#fff",
                                    backgroundClip: "padding-box",
                                    border: "1px solid #ced4da",
                                    appearance: "none",
                                    borderRadius: "0.375rem",
                                }}
                                placeholder="Enter your keyword"
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
                                
                        </span>
                    <Link
                        to={{
                            pathname:'/category',
                            state: { Category: null, SubCategory: null, Model: null, KeyWord:null }
                        }}>
                        <Button 
                            onClick={()=>{console.log('123')}} 
                            title={'Shop now'} 
                            padding={'10px 60px 10px 60px'} 
                            color={'#FFF'} 
                            backgroundColor={'#F16A28'}/>
                    </Link>
                </div>
            </div>
            { isMobile ?
                <div className='imageContainer'>
                    <img
                        src={truck}
                        style={{width:'70%'}}
                    />
                </div> : null
            }
        </div>
    )
}
