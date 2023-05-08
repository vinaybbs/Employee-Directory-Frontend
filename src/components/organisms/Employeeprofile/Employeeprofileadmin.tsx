import  './employeeprofileadmin.css'
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
import { useSelector } from 'react-redux';
import { employeestatus, getemployeeemailidapi } from '../../../Apis/Api';
 import { updateemployeeprofileapi } from '../../../Apis/Api';
import { RootState } from '../../../Redux/Store';
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
  employeeMiddleName:string;
  employeeStatus:string;
}
function Employeeprofileadmin(): React.ReactElement {
  const { employeeEmail } = useParams<{ employeeEmail: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [workmodeValue, setWorkmodeValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [designationValue, setDesignationValue] = useState('');
  const [deptValue, setDeptValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const email=useSelector((state:RootState)=>state.statetype.email);
  const [activestatus,setActivestatus]=useState('Active')

 const [initialValues, setInitialValues] = useState({
       designation: '',
        title: '',
        dept: '',
        addr: '',
        phone: '',
        workmode: ''
  });
     useEffect(() => {
   if (employee) {
      setInitialValues({
        designation: employee.employeeDesignation.toString(),
        title: employee.employeeJobTitle.toString(),
        dept: employee.employeeDept.toString(),
        addr: employee.employeeAddress.toString(),
        phone: employee.employeeContactNumber.toString(),
        workmode: employee.employeeWorkingMode.toString()
      });
    }
  }, [employee]);

  const handleeditConfirmation = (confirmed: boolean) => {
  setShoweditPopup(false);
  if (confirmed) {
    setIsEditing(true);
    setDesignationValue(initialValues.designation);
    setTitleValue(initialValues.title);
    setDeptValue(initialValues.dept);
    setAddressValue(initialValues.addr);
    setPhoneValue(initialValues.phone);
    setWorkmodeValue(initialValues.workmode);
    
  }
    else {
    setIsEditing(false);
    // reset form values here
      setDesignationValue(initialValues.designation);
      setTitleValue(initialValues.title);
      setDeptValue(initialValues.dept);
      setAddressValue(initialValues.addr);
      setPhoneValue(initialValues.phone);
      setWorkmodeValue(initialValues.workmode);
  }
};
  async function Onsave(){
    setIsEditing(false);

    if(!addressValue){
      setAddressValue(initialValues.addr)
    }
    if(!designationValue){
      setDesignationValue(initialValues.addr)
    }
    if(!deptValue){
      setDeptValue(initialValues.addr)
    }
    if(!titleValue){
      setTitleValue(initialValues.addr)
    }
    if(!workmodeValue){
      setWorkmodeValue(initialValues.addr)
    }
    if (!phoneValue) {
        setPhoneValue(initialValues.phone);
      } else if (!/^[9768]\d{9}$/.test(phoneValue)) {
        setPhoneError("Phone number has to be a number");
        return;
      } else {
        try {
          const response = await axios.post(
            updateemployeeprofileapi,
            null,
            {
              params: {
                employeeEmail: employee?.employeeEmail,
                employeeAddress: addressValue,
                employeeContactNumber: phoneValue,
                employeeWorkingMode: workmodeValue,
                employeeDept: deptValue,
                employeeDesignation: designationValue,
                employeeJobTitle:titleValue,
                employeeStatus:activestatus
              },
            }
          );
          setEmployee(response.data);
        } catch (error) {
          console.log(error);
        }
        setPhoneError(""); // clear the error message state
  }
}
 function Oncancel(){
      setIsEditing(false);
      setDesignationValue(initialValues.designation);
      setTitleValue(initialValues.title);
      setDeptValue(initialValues.dept);
      setAddressValue(initialValues.addr);
      setPhoneValue(initialValues.phone);
      setWorkmodeValue(initialValues.workmode);
  setPhoneError("");
    }
  function Onedit(){
    setShoweditPopup(true);
};
  
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
  const [isActive, setIsActive] = useState(
    JSON.parse(localStorage.getItem("isActive") || "true")
  );
useEffect(() => {
  localStorage.setItem("isActive", JSON.stringify(isActive));
}, [isActive]);
 const [isEdit, setIsEdit] = useState(
    JSON.parse(localStorage.getItem("isEdit") || "true")
  );
useEffect(() => {
  localStorage.setItem("isEdit", JSON.stringify(isEdit));
}, [isEdit]);
const [showPopup, setShowPopup] = useState(false);
const [showeditPopup, setShoweditPopup] = useState(false);

function handleActiveClick() {
  setShowPopup(true);

}
function handleInactiveClick() {
  setShowPopup(true);
}

const handleConfirmation = async (confirmed: boolean) => {
  
  setShowPopup(false);
  if (confirmed) {
    setIsActive(!isActive);
   
  }
  const status=isActive
  if(status){
    setActivestatus('Active')
    }
  if(!status){
    setActivestatus('Inactive')
  }
  console.log(activestatus)
  try {
    const response = await axios.post(`${employeestatus}/${employeeEmail}/${activestatus}`, null, {
     
    });
    if(response.data==='DONE ...'){
      console.log('hi')
    }
  
  } catch (error) {
    console.log(activestatus)
    console.log(error);
  }
};
const buttonStyle1 = {
backgroundColor: isActive ? 'green' : 'red',
color: 'white',
width: '100%',
};
const buttonStyle2 = {
backgroundColor: '#064D6F',
width: '100%',
};
const buttonStyle3 = {
backgroundColor: '#4B4646',
width: '100%',
};
const buttonStyle7= {
    backgroundColor: 'blue',
    width: '25%',
};
const buttonStyle8 = {
    backgroundColor: 'blue',
    width: '25%',
};
  return(
   <div className="container-bg">
    <div className="rectangle">
      <div className="Main-rectangle-content">
          <div><TypographyComponent variant='header'>{employee?.employeeFirstName}{employee?.employeeMiddleName} {employee?.employeeLastName}</TypographyComponent></div>
          <div>
          {isEditing ? (
            <input type="text" value={designationValue} onChange={(e) => setDesignationValue(e.target.value)} />
          ) : (
          <TypographyComponent variant='title'>{employee?.employeeDesignation}</TypographyComponent>)}</div>
          <div className="rectangle-content">
          <div className='icons-subtitle'>
                    <Icons icon={AddLocationIcon} />
                    <Icons icon={MdCalendarMonth} height='20px' width='20px'/>
                    <Icons icon={MdWork} height='25px' width='20px'/>
          </div>
          <div className="icons-subtitle">
          
          <TypographyComponent variant='subtitle'>::{employee?.employeeWorkingLocation}</TypographyComponent>
          
            <TypographyComponent variant='subtitle'>::{employee?.employeeNineleapsJoiningDate}</TypographyComponent>
            {isEditing ? (
            <input type="text" value={workmodeValue} onChange={(e) => setWorkmodeValue(e.target.value)} />
          ) : (
          <TypographyComponent variant='subtitle'>::{employee?.employeeWorkingMode}</TypographyComponent>
          )}
​
          </div>
          </div>
      </div>
    </div>
    <div className='employee-profile-pic'></div>
    <div className="emp-details-container">
    <div className="Button-container">
    <div className="btn">
    <Button buttonStyle={buttonStyle1} onClick={employee?.employeeStatus ? handleInactiveClick : handleActiveClick} text={isActive ? "Active" : "Inactive"} />
        {showPopup && (
          <div className="popup-container-1">
            <div className="popup-1">
              <p>Are you sure you want to {isActive ? "deactivate" : "activate"}?</p>
              <button onClick={() => handleConfirmation(true)}>Yes</button>
              <button onClick={() => handleConfirmation(false)}>No</button>
            </div>
          </div>
        )}
    </div>
    <div className="btn">
        <Button buttonStyle={buttonStyle2} onClick={Onedit} text='Edit Profile' />
        {showeditPopup && (
          <div className="popup-container-2">
            <div className="popup-2">
              <p>Are you sure you want to Edit Profile?</p>
              <button onClick={() => handleeditConfirmation(true)}>Yes</button>
              <button onClick={() => handleeditConfirmation(false)}>No</button>
            </div>
          </div>
        )}
    </div>
    </div>
      <div className="employee-details">
        <div className='Main-header'>
        <div className='subtitle-header' style={{marginTop: "20px", marginBottom:"20px"}}>
        <div className='emp-text-field-container'>
            <TypographyComponent variant='subtitle1'>ID Number:</TypographyComponent>
            <TypographyComponent variant='subtitle1'>{employee?.employeeId}</TypographyComponent>
        </div>
        <div className='emp-text-field-container'>
            <TypographyComponent variant='subtitle1'>Date of Birth:</TypographyComponent>
            <TypographyComponent variant='subtitle1'>{employee?.employeeDateOfBirth}</TypographyComponent>
        </div>
        <div className='emp-text-field-container'>
            <TypographyComponent variant='subtitle1'>Title:</TypographyComponent>
            {isEditing ? (
            <input type="text" value={titleValue} onChange={(e) => setTitleValue(e.target.value)} />
          ) : (
            <TypographyComponent variant='subtitle1'>{employee?.employeeJobTitle}</TypographyComponent>
            )}
        </div>
        <div className='emp-text-field-container'>
            <TypographyComponent variant='subtitle1'>Department:</TypographyComponent>
            {isEditing ? (
            <input type="text" value={deptValue} onChange={(e) => setDeptValue(e.target.value)} />
          ) : (
            <TypographyComponent variant='subtitle1'>{employee?.employeeDept}</TypographyComponent>
            )}
        </div>
        <div className='emp-text-field-container'>
            <TypographyComponent variant='subtitle1'>Email:</TypographyComponent>
            <TypographyComponent variant='subtitle1'>{employee?.employeeEmail}</TypographyComponent>
        </div>
        <div className='emp-text-field-container'>
            <TypographyComponent variant='subtitle1'>Phone:</TypographyComponent>
            {isEditing ? (
            <input type="number" value={phoneValue} onChange={(e) => setPhoneValue(e.target.value)} />
          ) : (
            <TypographyComponent variant='subtitle1'>{employee?.employeeContactNumber}</TypographyComponent>
            )}
        </div>
        <div className='emp-text-field-container'>
            <TypographyComponent variant='subtitle1'>Address:</TypographyComponent>
            {isEditing ? (
            <input type="text" value={addressValue} onChange={(e) => setAddressValue(e.target.value)} />
          ) : (
            <TypographyComponent variant='subtitle1'>{employee?.employeeAddress}</TypographyComponent>
            )}
​
        </div>
​
            <TypographyComponent variant='title'>SOCIAL MEDIA &nbsp;:&nbsp; 
              <a href={employee?.employeeLinkedIn}><Icons icon={FaLinkedin} height='20px' width='40px'/></a>
              <a href={employee?.employeeGit}><Icons icon={FaGithub} height='20px' width='40px'/></a>
              <a href={employee?.employeeSlack}><Icons icon={FaSlack} height='20px' width='40px'/></a>
            </TypographyComponent>
            
            {isEditing && (
          <div className="employee-buttons">
          <Button buttonStyle={buttonStyle7} onClick={Onsave} text="Save" />
          <Button buttonStyle={buttonStyle8} onClick={Oncancel} text="Cancel" />
        </div>
)}
        </div>
        </div>
      </div>
        
    </div>
    
   </div>
  )
}
export default Employeeprofileadmin