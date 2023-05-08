import { AdminSidebarData } from "../../atoms/SideBarData/AdminSideBarData";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import './sidebar.css'
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../../../Redux/Action";
import { RootState } from "../../../Redux/Store";
const AdminSideBar=()=>{
    const dispatch=useDispatch()
  const handleChange=()=>{
   dispatch(setLocation('/'))
   
  }
    return(
        <IconContext.Provider value={{ color: '#000' }}>

            {AdminSidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
  <li className="logout-text"><Link to='/' onClick={handleChange}><BiLogOut/><span>Logout</span></Link></li>
          </IconContext.Provider>
    )

}
export default AdminSideBar