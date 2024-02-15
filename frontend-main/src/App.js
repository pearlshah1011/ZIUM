
import './App.css';
import Header from"./component/layout/Header/Header.js"
import { BrowserRouter as Router} from 'react-router-dom';
import WebFont from "webfontloader";
import React from "react";
import Footer from"./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"
import {
   Route
} from 'react-router-dom';
function App() {
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Montserrat","Roboto"]
      }
    })
  },[]);
  return (
    <Router>
        <Header/>
        <Route exact path="/" component={Home} />
        <Footer/>
        
    </Router>

  );
}

export default App;
