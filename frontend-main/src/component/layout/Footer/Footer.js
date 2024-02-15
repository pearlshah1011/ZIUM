import React from "react";
//import playStore from "../../../images/playstore.png";
//import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      {/* <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div> */}

      <div className="midFooter">
        <h1>ZIUM</h1>
        <p>International Styles Indian Fits</p>

       
      </div>

      <div className="rightFooter">
        <h4>Also Visit Us On</h4>
        <a href="https://www.amazon.in/s?k=zium+swimwear&crid=3N4ATYMQ7V5Q9&sprefix=zium+swimwear+%2Caps%2C225&ref=nb_sb_noss_2">Amazon</a>
        {/* {/* <a href="http://youtube.com/6packprogramemr">Youtube</a> */}
        <a href="https://www.flipkart.com/search?q=zium%20swimwear&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off">Flipkart</a> 
      </div>
    </footer>
  );
};

export default Footer;