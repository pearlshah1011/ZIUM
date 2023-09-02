import React from 'react';
import Carousel from 'react-material-ui-carousel'
import "./banner.css"
const imageLocations=
[
   "https://i.pinimg.com/564x/67/87/f1/6787f1cc0d0048fb97c022749136aa43.jpg",
  "https://i.pinimg.com/564x/93/86/14/938614f0df3912479ab0c08e19f95f3d.jpg",
  "https://i.pinimg.com/564x/87/d3/d8/87d3d8403e18b3973971a35c8f0401d3.jpg",
  "https://i.pinimg.com/564x/05/e5/4c/05e54c33dce937c594db4b3b7d627fab.jpg",
 "https://i.pinimg.com/564x/c6/3b/a5/c63ba5126c1cb954c393e656df46ecf3.jpg",
 "https://i.pinimg.com/564x/59/8c/58/598c58144b647c11ec4c15d7536a985a.jpg"
]

const Banner = () => {
  return (
    <div>
      <Carousel className='carousel'
      autoPlay={true}
      animation='slide'
      indicators={false}
      navButtonsAlwaysVisible={true}
      cycleNavigation={true}>
        {
            imageLocations.map((img,i)=>
            {
                return (
                    <>
                    
                      <img src={img} alt='' className='banner_img'/>
                    </>
                )
            })
        }

      </Carousel>
    </div>
  );
}

export default Banner;
