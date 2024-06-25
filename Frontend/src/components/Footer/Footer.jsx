import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img className="footer-logo-img"src={assets.logo} alt="" width="50%" height="45%"  />
                <p>Delivering deliciousness right to your door. Our mission is to connect you with the best local restaurants and provide a seamless, mouth-watering experience. We pride ourselves on fast, reliable service and a diverse selection of cuisines to satisfy every craving. Your satisfaction is our priority.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About US</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-212-456-7890</li>
                    <li>contact@foodPanda.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 &copy; foodPanda.com - All Rights Reserved</p>
      
    </div>
  )
}

export default Footer
