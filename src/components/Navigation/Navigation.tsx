import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";  
import ChangePasswordPage from "../../pages/changepassword/changepassword";
import LoginPage from "../../pages/Login/Loginpage";
import OtpPage from "../../pages/otp/otp";
import OtpverificationPage from "../../pages/Otpverification/Otpverification";
import Navbar from "../organisms/PagesNavigation/PagesNavigation";
import ReporteesList from "../organisms/Reportees/Reportees";
import './navigation.css'
import EmployeeList from "../atoms/DetailCard/DetailCard";
import Formadmin from "../organisms/Form/Form";
import Chart from "../organisms/Orgchart/Chart";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import Employeeprofileadmin from "../organisms/Employeeprofile/Employeeprofileadmin";
import Employeeprofile from "../organisms/Employeeprofile/Employeeprofileemployee";
import Employeeprofilehr from "../organisms/Employeeprofile/Employeeprofilehr";
import Employeeprofilehrspoc from "../organisms/Employeeprofile/Employeeprofilehrspoc";
import Userprofile from "../organisms/Userprofile/Userprofileadmin";
import FiteredDepartmentList from "../atoms/DetailCard/Departmen";
import FiteredDesignationList from "../atoms/DetailCard/Designation";
import FiteredJobTitleList from "../atoms/DetailCard/JobTitle";



function Navigation(): JSX.Element {
  const currentPath = useSelector((state:RootState)=>state.statetype.location)
  const role=useSelector((state:RootState)=>state.statetype.role)
  console.log(role)
  const hideNavbarPaths = ["/OtpPage", "/OtpverificationPage", "/ChangePasswordPage",'/'];
  console.log(currentPath)
  return (
    <Router>
    <div>
    {!hideNavbarPaths.includes(currentPath) && <Navbar/>}
      <Routes>
        <Route path="LandingPage" element={<EmployeeList/>}/>
        <Route path="/" element={<LoginPage/>} />
        <Route path="OtpPage" element={<OtpPage/>} />
        <Route path="OtpverificationPage" element={<OtpverificationPage />} />
        <Route path="ChangePasswordPage" element={<ChangePasswordPage/>}/>
        <Route path="Form" element={<Formadmin/>}/>
        <Route path="Chart" element={<Chart/>}/> 
        <Route path='viewreportees' element={<ReporteesList/>}/>
        <Route path="/employee/:employeeEmail" element={<Employeeprofile/>}/>
        <Route path='/employeehr/:employeeEmail' element={<Employeeprofilehr/>}/>
        <Route path="/employeeadmin/:employeeEmail" element={<Employeeprofileadmin/>} />
        <Route path="/employeehrspoc/:employeeEmail" element={<Employeeprofilehrspoc/>}/>
        <Route path="/userprofile" element={<Userprofile/>}/>
        <Route path="/filterdesignation/:designation" element={<FiteredDesignationList/>}/>
        <Route path="/filterdepartment/:department" element={<FiteredDepartmentList/>}/>
        <Route path="/filterjobtitle/:jobtitle" element={<FiteredJobTitleList/>}/>
      </Routes>
    </div>
  </Router>
    
    
  );
}

export default Navigation;