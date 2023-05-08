import { IconContext } from "react-icons";
import SideBar from "../../molecules/SideBar/SideBar";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons  from "react-icons/fa";
import * as AiIcons from "react-icons/ai"
import Image from "../../atoms/Image/Image";
import nineleaps from '../../assets/Nineleaps.png'
import Search from "../../atoms/Search/Search";
import Filter from "../../molecules/Filter/Filter";
import './navigation.css'
import EmployeeList from "../../atoms/DetailCard/DetailCard";
import MainBar from "../../molecules/SideBar/MainBar";
function Navbar() {
    const [sidebar, setSidebar] = useState(false);
  
    const showSidebar = () => setSidebar(!sidebar);
  
    return (
      <>
        <IconContext.Provider value={{ color: '#000' }}>
          <div className='navbar'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <div className="nav">
            <Image imageSrc={nineleaps} height='50px' width='200px'/>
            <div className="nav-items">
            <Search/>
            <Filter/>
            </div>
            </div>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
           <MainBar/>
            </ul>
          </nav>
        </IconContext.Provider>
       
      </>
    );
  }
  
  export default Navbar;
  