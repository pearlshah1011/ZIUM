import React from 'react';
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/image.png";
import "./Header.css"

const options = {
    burgerColorHover: "rgb(170,147,116)",
    logo,
    logoWidth: "20vmax",
    navColor1: "#0cebfb",
    logoHoverSize: "10px",
    logoHoverColor: "black",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgb(170,147,116)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "black",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "black",
    searchIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColorHover: "rgb(170,147,116)",
    searchIconColorHover: "rgb(170,147,116)",
    cartIconColorHover: "rgb(170,147,116)",
    cartIconMargin: "1vmax",
  };
  const Header = () => {
    return <ReactNavbar {...options} />;
  };
  

export default Header;
