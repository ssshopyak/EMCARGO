import React, {useEffect, useState} from 'react';
import Carousel from 'react-elastic-carousel';

const ImageCarousel = ({images}) => {
    const [isMobile, setIsMobile] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const items = images.map((image) => {
        return(
            <img         
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                src={image} 
                key={image} 
                style={{
                    width:'90%', 
                    height: '25%', 
                    alignSelf: 'center', 
                    justifyContent: 'center', 
                    borderRadius:'12px',
                    transform: isHovering ? "scale(1.3)" : "scale(1.0)",
                    transition: "transform .5s",
                }}
                />
        )
    })

    useEffect(()=>{
        if(window.innerWidth < 1200){
            setIsMobile(true)
        }
    },[])

    return (
        <Carousel 
            itemsToShow={1}
            className='carouselContainer'
            enableSwipe={isMobile}
            showArrows={false}
            renderPagination={(props)=>{
                return (
                    <div style={{marginTop:'10px'}}>
                        {
                            images.map((image,index) => {
                                return(
                                    <img
                                        onClick={() => {props.onClick(index)}}
                                        src={image} 
                                        key={image} 
                                        style={{
                                            width:'80px', 
                                            height: '80px', 
                                            alignSelf: 'center', 
                                            justifyContent: 'center', 
                                            borderRadius:'4px',
                                            marginLeft:'5px',
                                            marginRight:'5px'
                                        }}
                                        />
                                )
                            })
                        }
                    </div>
                )
            }}>
            {items}
        </Carousel>
    );
}

export default ImageCarousel;
