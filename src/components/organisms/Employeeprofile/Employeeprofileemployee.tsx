import './employeeprofileadmin.css'
import Button from '../../atoms/Button/Button';
import TypographyComponent from '../../atoms/Typography/Typography';
import Icons from '../../atoms/Icons/Icons';
import { Icon } from '@mui/material';
import { FaGithub, FaLinkedin ,FaSlack} from 'react-icons/fa';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import { MdCalendarMonth, MdWork} from "react-icons/md";
import React, { useState, useEffect  } from "react";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { getemployeeemailidapi } from '../../../Apis/Api';

interface Employee {
  employeeId: number;
  employeeFirstName: string;
  employeeLastName: string;
  employeeJobTitle: string;
  employeeProfilePhoto: string;
  employeeGit: string;
  employeeSlack: string;
  employeeLinkedIn: string;
  employeeDesignation:string;
  employeeWorkingMode:string;
  employeeNineleapsJoiningDate:string;
  nineleapsEmployeeId:string;
  employeeDateOfBirth:string;
  employeeDept:string;
  employeeEmail:string;
  employeeContactNumber:number;
  employeeAddress:string;
  employeeTotalNoOfYears:number;
  employeeWorkingLocation:string;
  employeeStatus:string;
  reportingManager:string;
}
function Employeeprofile(): React.ReactElement {
  const { employeeEmail } = useParams<{ employeeEmail: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);

  
 
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      const config = {
        headers: {  'ngrok-skip-browser-warning': 'true'}
      };
      try {
        const response = await axios.get<Employee>(`${getemployeeemailidapi}/${employeeEmail}`,config);
        setEmployee(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployeeDetails();
  }, [employeeEmail]);

//   const [isActive, setIsActive] = useState(
//     JSON.parse(localStorage.getItem("isActive") || "true")
//   );
// useEffect(() => {
//   localStorage.setItem("isActive", JSON.stringify(isActive));
// }, [isActive]);
const [buttonColor, setButtonColor] = useState('');

useEffect(() => {
  if (employee?.employeeStatus === "active") {
    setButtonColor("green");
  } else {
    setButtonColor("red");
  }
}, [employee]);
  const handleClick = () => {
   console.log('button')
  };

const buttonStyle1 = {
backgroundColor: buttonColor,
    color:'white',
width: '100%',
};

  return(
   <div className="container-bg">
    <div className="rectangle">
      <div className="Main-rectangle-content">
          <div><TypographyComponent variant='header'>{employee?.employeeFirstName} {employee?.employeeLastName}</TypographyComponent></div>
          <div>
          <TypographyComponent variant='title'>{employee?.employeeDesignation}</TypographyComponent></div>
          <div className="rectangle-content">
          <div className='icons-subtitle'>
                    <Icons icon={AddLocationIcon} />
                    <Icons icon={MdCalendarMonth} height='20px' width='20px'/>
                    <Icons icon={MdWork} height='25px' width='20px'/>
          </div>
          <div className="icons-subtitle">
          
          <TypographyComponent variant='subtitle'>::{employee?.employeeWorkingLocation}</TypographyComponent>
            <TypographyComponent variant='subtitle'>::{employee?.employeeNineleapsJoiningDate}</TypographyComponent>
            
          <TypographyComponent variant='subtitle'>::{employee?.employeeWorkingMode}</TypographyComponent>
          

          </div>
          </div>
      </div>
    </div>
    <div className='employee-profile-pic'></div>
    <div className="emp-details-container">
    <div className="Button-container">
    <div className="btn">
     <Button buttonStyle={buttonStyle1} onClick={handleClick} text={employee?.employeeStatus ? employee.employeeStatus : ''}  />
      
    </div>
    </div>
      <div className="employee-details">
        <div className='Main-header'>
        <div className='subtitle-header' style={{marginTop: "20px", marginBottom:"20px"}}>
        <div className='emp-text-field-container'>
            <TypographyComponent variant='subtitle1'>ID Number:</TypographyComponent>
            <TypographyComponent variant='subtitle1'>{employee?.nineleapsEmployeeId}</TypographyComponent>
        </div>
        <div className='emp-text-field-container'>
            <TypographyComponent variant='subtitle1'>Date of Birth:</TypographyComponent>
            <TypographyComponent variant='subtitle1'>{employee?.employeeDateOfBirth}</TypographyComponent>
        </div>
        <div className='emp-text-field-container'>
            <TypographyComponent variant='subtitle1'>Title:</TypographyComponent>
            <TypographyComponent variant='subtitle1'>{employee?.employeeJobTitle}</TypographyComponent>
         
        </div>
        <div className='emp-text-field-container'>
            <TypographyComponent variant='subtitle1'>Department:</TypographyComponent>
            <TypographyComponent variant='subtitle1'>{employee?.employeeDept}</TypographyComponent>
        
        </div>
        <div className='emp-text-field-container'>
            <TypographyComponent variant='subtitle1'>Email:</TypographyComponent>
            <TypographyComponent variant='subtitle1'>{employee?.employeeEmail}</TypographyComponent>
        </div>
        <div className='emp-text-field-container'>
            <TypographyComponent variant='subtitle1'>Phone:</TypographyComponent>
            <TypographyComponent variant='subtitle1'>{employee?.employeeContactNumber}</TypographyComponent>
        
        </div>
        <div className='emp-text-field-container'>
            <TypographyComponent variant='subtitle1'>Address:</TypographyComponent>
            
            <TypographyComponent variant='subtitle1'>{employee?.employeeAddress}</TypographyComponent>
           

        </div>
        <div className='emp-text-field-container'>
            <TypographyComponent variant='subtitle1'>Reporting Manager Email:</TypographyComponent>
            
            <TypographyComponent variant='subtitle1'>{employee?.reportingManager}</TypographyComponent>
           

        </div>

            <TypographyComponent variant='title'>SOCIAL MEDIA &nbsp;:&nbsp; 
              <a href={employee?.employeeLinkedIn} target="_blank"><Icons icon={FaLinkedin} height='20px' width='40px'/></a>
              <a href={employee?.employeeGit} target="_blank"><Icons icon={FaGithub} height='20px' width='40px'/></a>
              <a href={employee?.employeeSlack} target="_blank"><Icons icon={FaSlack} height='20px' width='40px'/></a>
            </TypographyComponent>
            
        </div>
        </div>
      </div>
        
    </div>
    
   </div>
  )
}
export default Employeeprofile