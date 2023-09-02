import { Divider } from '@mui/material';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { product } from './productdata';
import "./slide.css";
const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      
    }
  };
const Slide = ({title}) => {
  return (
    <div className='products_section'>
        <div className='products_deal'>
            <h3> {title}</h3>
            <button className='view_btn'>View all</button>
        </div>

        <Divider color="#232f3e" sx={{ height: 1, width: '1250px' }} />

        <Carousel
         responsive={responsive}
         infinite={true}
         draggable={false}
         swipeable={true}
         showDots={false}
         centerMode={true}
         autoPlay={true}
         autoPlaySpeed={4000}
         keyBoardControl={true}
         removeArrowOnDeviceType={['tablet','mobile']}
         dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
        >
            {
                product.map((e)=>
                {
                    return (
                        <div className='products_items'>
                            <div className='product_img'>
                                <img src={e.url} alt=''/>
                                
                            </div>
                            <p className='products_name'>{e.title.shortTitle}</p>
                            <p>{e.title.longTitle}</p>
                            <p>{e.price.mrp}</p>
                            {/* <p className='products_explore'>{e.tagline}</p> */}
                        </div>
                    )
                })
            }

        </Carousel>
      
    </div>
  );
}

export default Slide;
