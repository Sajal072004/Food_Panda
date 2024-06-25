import './Navbar.css'
import {assets} from '../../assets/assets.js'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext.jsx'

const Navbar = ({setShowLogin}) => {

  const {getTotalCartAmount  }=useContext(StoreContext);
  return (
      <div className="navbar">
        <Link to='/'><img src={assets.logo} alt="" className='logo' /></Link>
        <ul className="navbar-menu">
            <Link to='/'>Home</Link>
            <a href='#explore-menu'>Menu</a>
            <a href='#app-download'>Mobile-app</a>
            <a href='#footer'>contact us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                <div className={
                  getTotalCartAmount()===0
                  ?""
                  :"dot"

                }></div>
            </div>
            <button onClick={()=>setShowLogin(true)}>sign in </button>
        </div>
      </div>
  )
}

export default Navbar
