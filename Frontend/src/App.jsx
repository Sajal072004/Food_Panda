import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { useState , useEffect } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx";
import Verify from '../src/pages/Verify/Verify.jsx';
import MyOrders from "./pages/MyOrders/MyOrders.jsx";


const App = () => {

  const[showLogin, setShowLogin]=useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.location.href.startsWith("https://food-panda-dviw.onrender.com/verify?success")) {
        clearInterval(interval); 
        alert("Payment Successful! Check your orders section.");
        window.location.href = "https://food-panda-dviw.onrender.com";
      }
    }, 1000); 

    return () => clearInterval(interval); 
  }, []);


  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder/>} />
          <Route path="/verify" element={<Verify/>}/>
          <Route path="/myorders" element={<MyOrders/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
