import React from 'react'
import { Button } from './Button'

export const ShopNow = () => {
    return (
        <div className='shopnow'>
            <div className='textContainer'>
                <div className='title'>
                    {"EXCEPTIONAL SERVICE "}<span style={{color: "#F16A28"}}>IN</span>{"\n TWO LOCATIONS "}<span style={{color: "#F16A28"}}>WITH</span> {"\n FREE DELIVERY"}
                </div>
                <div className='bodytext'>
                    {"Find everything for your truck right here. You can buy directly in our\n website or just call us! Find everything for your truck right here."}
                </div>
                <div style={{marginLeft:145}}>
                    <Button onClick={()=>{console.log('123')}} title={'Shop now'} padding={'10px 60px 10px 60px'} color={'#FFF'} backgroundColor={'#F16A28'}/>
                </div>
                
            </div>
        </div>
    )
}
