import './App.css';
import Navbar from './components/Navbar';
import Newnavbar from './components/Newnavbar/Newnavbar';
import Main from './components/home/Main';
import Footer from './components/home/footer/Footer';
import Signin from './components/signup/Signin';
import Signup from './components/signup/Signup';
import {Routes,Route} from 'react-router-dom'
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';

function App() {
  return (
   <div>
    <Navbar/>
    <Newnavbar/>
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/login' element={<Signin/>}/>
      <Route path='/register' element={<Signup/>}/>
      <Route path='/getproductsone/:id' element={<Cart/>}/>
      <Route path='/buynow' element={<Buynow/>}/>
      
   </Routes>
    
    <Footer/>
   </div>
    
   
  );
}

export default App;
