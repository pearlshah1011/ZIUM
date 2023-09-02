import './App.css';
import Navbar from './components/Navbar';
import Newnavbar from './components/Newnavbar/Newnavbar';
import Main from './components/home/Main';
import Footer from './components/home/footer/Footer';
function App() {
  return (
   <div>
    <Navbar/>
    <Newnavbar/>
    <Main/>
    <Footer/>
   </div>
    
   
  );
}

export default App;
