import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar-left">
        <img src={assets.photo} alt="Logo" className="logo" />
      </div>
      <img src={assets.profile_image} alt="Profile" className="profile" />
    </div>
  );
};

export default Navbar;
