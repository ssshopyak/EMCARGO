import React, {useEffect, useState} from 'react';
import Carousel from 'react-elastic-carousel';

const ImageCarousel = ({images}) => {
    const [isMobile, setIsMobile] = useState(false)
    const items = images.map((image) => {
        return(
            <img src={image} key={image} style={{width:'90%', height: '25%', alignSelf: 'center', justifyContent: 'center', borderRadius:'12px'}}/>
        )
    })

    useEffect(()=>{
        if(window.innerWidth < 1200){
            setIsMobile(true)
        }
    },[])

    return (
        <Carousel itemsToShow={1} className='carouselContainer' enableSwipe={isMobile} showArrows={!isMobile}>
            {items}
        </Carousel>
    );
}

export default ImageCarousel;
