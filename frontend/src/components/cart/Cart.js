import React from 'react';
import "./cart.css"
import { Divider } from '@material-ui/core';
const Cart = () => {
  return (
    <div className='cart_section'>
        <div className='cart_container'>
           
            <div className='left_cart'> 
            <img src='https://m.media-amazon.com/images/I/712AnstzIML._UY879_.jpg'></img>
              <div className='cart_btn'>
                 <button className='cart_btn1'>
                    Add to Cart
                 </button>
                 <button className='cart_btn2'>
                    Buy Now
                 </button>

              </div>
            </div>
            <div className='right_cart'>
               <h3>Ladies Swimwear</h3>
              <h3>Full Body Ladies Swimsuit Padded</h3>
              <Divider/>

            </div>
        </div>
     
    </div>
  );
}

export default Cart;
