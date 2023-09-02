import React from 'react';
import Banner from './Banner';
import "./home.css";
import Slide from './Slide';
const Main = () => {
  return (
    <div className='home_section'>
      <div className='banner_part'>
         <Banner/>
         
      </div>
      <Slide title="BEST SELLER"/>
      <div className='center_img'>
        <img src='https://uploadpie.com/gyg4rM' alt='center_img'/>
      </div>
      <Slide title="NEW ARRIVALS"/>
      <Slide title="AWESOME DEALS"/>
    </div>
  );
}

export default Main;
