import React from 'react';
import "./footer.css";
const Footer = () => {
    const year = new Date().getFullYear();
    console.log(year);
  return (
    <footer>
        <div className='footer_container'>
            <div className='footr_details_one'>
                <h3>GET TO KNOW US</h3>
                <p>About Us</p>
            
            </div>
            <div className='footr_details_one'>
                <h3>CUSTOMER SERVICES</h3>
                <p>Delivery And Return</p>
                <p>Contact Us </p>
                <p>Size Guidelines</p>
            </div>
            <div className='footr_details_one'>
                <h3>CONNECT WITH US</h3>
                <p>Facebook</p>
                <p>Instagram </p>
                <p>Amazon</p>
            </div>
        </div>
        <div className='lastdetails'>
        <img src="./logo192.png" alt=''/>
        </div>
    </footer>
      
    
  );
}

export default Footer;
