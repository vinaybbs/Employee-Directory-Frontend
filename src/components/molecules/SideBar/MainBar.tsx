import EmployeeSideBar from "./EmployeeSideBar";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import AdminSideBar from "./AdminSideBar";
import ManagerSideBar from "./ManagerSideBar";
const MainBar=()=>{
    const role=useSelector((state:RootState)=>state.statetype.role);
    console.log(role)
    if(role==='Admin'){
        return <AdminSideBar/>
    }
    else if(role==='Manager'){
        return <ManagerSideBar/>
    }
    else if(role==='Employee'|| role==='HR' || role==='HRSpoc'){
        return <EmployeeSideBar/>
    }
    return null
}
export default MainBar