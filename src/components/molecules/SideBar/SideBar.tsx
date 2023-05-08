import { SidebarData } from "../../atoms/SideBarData/SideBarData";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import './sidebar.css'
import { BiLogOut } from "react-icons/bi";
const SideBar=()=>{
    return(
        <IconContext.Provider value={{ color: '#000' }}>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
  <li className="logout-text"><Link to='/'><BiLogOut/><span>Logout</span></Link></li>
          </IconContext.Provider>
    )

}
export default SideBar