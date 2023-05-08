import React, { useEffect, useState } from 'react';
import './userprofile.css'
import { BsFillCameraFill } from 'react-icons/bs';
import TypographyComponent from '../../atoms/Typography/Typography';
import Button from '../../atoms/Button/Button';
import Icons from '../../atoms/Icons/Icons';
import { FaGithub, FaLinkedin ,FaSlack} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import { saveAs } from 'file-saver';
import { updateuserprofileadminapi } from '../../../Apis/Api';
import { getemployeeemailidapi } from '../../../Apis/Api';
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
  employeeStatus:string;
}
const Userprofile: React.FC = () => {
const [isEditing, setIsEditing] = useState(false);
const [employee, setEmployee] = useState<Employee | null>(null);
const [phoneError, setPhoneError] = useState('');

const [phoneValue, setPhoneValue] = useState('');
const [workmodeValue, setWorkmodeValue] = useState('');
const [addressValue, setAddressValue] = useState('');
 const [initialValues, setInitialValues] = useState({
    workmode:'',
    addr: '',
    phone: '',
  
  });
  
 useEffect(() => {
   if (employee) {
      setInitialValues({
       workmode:employee.employeeWorkingMode.toString(),
        addr: employee.employeeAddress.toString(),
       
        phone: employee.employeeContactNumber.toString(),
        
      });
    }
  }, [employee]);
  const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic'));
  const email=useSelector((state:RootState)=>state.statetype.email);
  const { employeeEmail } = useParams<{ employeeEmail: string }>();
 
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      const config = {
        headers: {  'ngrok-skip-browser-warning': 'true'}
      };
      try {
        const response = await axios.get<Employee>(`${getemployeeemailidapi}/${email}`,config);
        console.log(response.data);
        setEmployee(response.data);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployeeDetails();
  }, []);//email should come 
   const [isActive, setIsActive] = useState(
    JSON.parse(localStorage.getItem("isActive") || "true")
  );
useEffect(() => {
  localStorage.setItem("isActive", JSON.stringify(isActive));
}, [isActive]);


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
const [showeditPopup, setShoweditPopup] = useState(false);

const handleeditConfirmation = (confirmed: boolean) => {
  setShoweditPopup(false);
  if (confirmed) {
    setIsEditing(true);
    setPhoneValue(initialValues.phone);
    setWorkmodeValue(initialValues.workmode);
    setAddressValue(initialValues.addr);
  }
    else {
    setIsEditing(false);
    // reset form values here
  setPhoneValue(initialValues.phone);
    setWorkmodeValue(initialValues.workmode);
    setAddressValue(initialValues.addr);
  }
};
  const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    
    
    reader.readAsDataURL(file!);
  };
     function Onedit(){
       setShoweditPopup(true);
       
    }
 function Onexport(){
        html2canvas(document.body).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('l', 'pt', [canvas.width, canvas.height]);
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    const exportType = prompt('Enter file type: CSV or PDF');
    if (exportType) {
      if (exportType.toLowerCase() === 'csv') {
        const csvData = `
        Name,${employee!.employeeFirstName} ${employee!.employeeLastName}
        Designation,${employee!.employeeDesignation}
        Employee ID,${employee!.employeeId}
        Date of Birth,${employee!.employeeDateOfBirth}
        Job Title,${employee!.employeeJobTitle}
        Department,${employee!.employeeDept}
        Email,${employee!.employeeEmail}
        Phone,${employee!.employeeContactNumber}
        Address,${employee!.employeeAddress}
        Location,${employee!.employeeWorkingLocation}
        Started On,${employee!.employeeNineleapsJoiningDate}
        Mode of Work,${employee!.employeeWorkingMode}
        No of Years,${employee!.employeeTotalNoOfYears}
        LinkedIn,${employee!.employeeLinkedIn}
        Github,${employee!.employeeGit}
        
        Slack,${employee!.employeeSlack}`;
        
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
        if (window.confirm('Are you sure you want to download the CSV?')) {
          saveAs(blob, 'employeeprofile.csv');
        }
        
      } else if (exportType.toLowerCase() === 'pdf') {
        if (window.confirm('Are you sure you want to download the PDF?')) {
          pdf.save('employeeprofile.pdf');
        }
      } else {
        alert('Invalid file type entered. Please enter CSV or PDF.');
      }
    }
  });
    }
     const Onsave=async ()=>{
      setIsEditing(false);
      
 if (!addressValue) {
    setAddressValue(initialValues.addr);
  }
  if (!workmodeValue) {
    setWorkmodeValue(initialValues.workmode);
  }
  if (!phoneValue) {
    setPhoneValue(initialValues.phone);
  } else if (!/^[9768]\d{9}$/.test(phoneValue)) {
    setPhoneError('Phone number has to be a 10 digit number');
    return;
  } else {
    try {
      const response = await axios.post(
        updateuserprofileadminapi,
        null,
        {
          params: {
            employeeEmail: email,
            employeeAddress: addressValue,
            employeeContactNumber: phoneValue,
            employeeWorkingMode: workmodeValue,
          },
        }
      );
      setEmployee(response.data);
    } catch (error) {
      console.log(error);
    }

    setPhoneError('');
    
  }
}
    function Oncancel(){
      setIsEditing(false);
      setWorkmodeValue(initialValues.workmode);
     
    setAddressValue(initialValues.addr);
   
        setPhoneValue(initialValues.phone);
       
  setPhoneError("");
    }
 const buttonStyle4= {
    backgroundColor: buttonColor,
    color:'white',
  };
  const buttonStyle5 = {
    backgroundColor: '#064D6F',
  };
  const buttonStyle6 = {
    backgroundColor: '#4B4646',
  };
  const buttonStyle7= {
    backgroundColor: 'blue',
  };
  const buttonStyle8 = {
    backgroundColor: 'blue',
  };
  console.log(email);
  
  return (
       <div className='background'>
        <div className='Main-employee-container'>
      <div className='container-1'>
      <div className="profile-picture-container">
        {profilePic ? (
          <img src={employee?.employeeProfilePhoto} alt="Profile" />
        ) : null}
      </div>
      <div className="employee-details-container">
        {/* <div className="upload-image-container">
          <BsFillCameraFill className="camera-icon"/>
          <label htmlFor="file-upload" className="upload-label">
            Upload Image
            <input
              id="file-upload"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => onUpload(e)}
              style={{display: 'none'}}
            />
          </label>
        </div> */}
        </div>
          <div className="employee-details-container">
            <div className='employee-detail-title'>
          
            <TypographyComponent variant='title'><b>{employee?.employeeFirstName} {employee?.employeeLastName}</b></TypographyComponent>
            <TypographyComponent variant='subtitle1'>{employee?.employeeDesignation}</TypographyComponent>
          
          </div>
          <div className='employee-profile-icons'>
          <a href={employee?.employeeLinkedIn} target='_blank'><Icons icon={FaLinkedin} height='20px' width='40px' /></a> 
          <a href={employee?.employeeGit } target='_blank'><Icons icon={FaGithub} height='20px' width='40px'/></a>
          <a href={employee?.employeeSlack} target='_blank'><Icons icon={FaSlack} height='20px' width='40px'/></a>
          </div>
            <div className="buttons-container">
             <Button buttonStyle={buttonStyle4} onClick={handleClick} text={employee?.employeeStatus ? employee.employeeStatus : ''}  />
         
              <Button buttonStyle={buttonStyle5} onClick={Onedit} text='Edit Profile' />
                     {showeditPopup && (
          <div className="popup-container-2">
            <div className="pop-2">
              <p>Are you sure you want to Edit Profile?</p>
              <button onClick={() => handleeditConfirmation(true)}>Yes</button>
              <button onClick={() => handleeditConfirmation(false)}>No</button>
            </div>
          </div>
        )}
               <Button buttonStyle={buttonStyle6} onClick={Onexport} text='Export' />
            </div>
          </div>
          </div>
           <div className='container-2'>
            <div className='Main-employee-details-container'>
                {/* <div className='employee-details'>
    <TypographyComponent variant='title'><b>EMPLOYEE DETAILS</b></TypographyComponent>
  </div> */}
  <div className='employee-info'>
    <div className='text-field-container-row'>
  <div className='text-field-container'>
    <TypographyComponent variant='subtitle1'>ID Number:</TypographyComponent>
  
            <TypographyComponent variant='subtitle1'>{employee?.employeeId}</TypographyComponent>
        
  </div>
  <div className='text-field-container'>
    <TypographyComponent variant='subtitle1'>Date of Birth:</TypographyComponent>
   
            <TypographyComponent variant='subtitle1'>{employee?.employeeDateOfBirth}</TypographyComponent>
         
  </div>
</div>
<div className='text-field-container-row'>
  <div className='text-field-container'>
    <TypographyComponent variant='subtitle1'>Title:</TypographyComponent>
   
            <TypographyComponent variant='subtitle1'>{employee?.employeeJobTitle}</TypographyComponent>
          
  </div>
  <div className='text-field-container'>
    <TypographyComponent variant='subtitle1'>Department:</TypographyComponent>
  
            <TypographyComponent variant='subtitle1'>{employee?.employeeDept}</TypographyComponent>
        
  </div>
</div>
<div className='text-field-container-row'>
    <div className='text-field-container'>
  <TypographyComponent variant='subtitle1'>Address:</TypographyComponent>
 {isEditing ? (
            <input type="text" value={addressValue}  onChange={(e) => setAddressValue(e.target.value)} />
            
          ) : (
            <TypographyComponent variant='subtitle1'>{employee?.employeeAddress}</TypographyComponent>
          )}
         
</div>
  <div className='text-field-container'>
    <TypographyComponent variant='subtitle1'>Email:</TypographyComponent>
   
            <TypographyComponent variant='subtitle1'>{employee?.employeeEmail}</TypographyComponent>
         
  </div>
</div>
<div className='text-field-container-row'>
    <div className='text-field-container'>
    <TypographyComponent variant='subtitle1'>Phone:</TypographyComponent>
    {isEditing ? (
            <input type="text" value={phoneValue} onChange={(e) => setPhoneValue(e.target.value)} />
          ) : (
            <TypographyComponent variant='subtitle1'>{employee?.employeeContactNumber}</TypographyComponent>
          )}
          {phoneError && <div className="error-message">{phoneError}</div>}
  </div>
  <div className='text-field-container'>
    <TypographyComponent variant='subtitle1'>Location:</TypographyComponent>
   
            <TypographyComponent variant='subtitle1'>{employee?.employeeWorkingLocation}</TypographyComponent>
         
  </div>
</div>
<div className='text-field-container-row'>
     <div className='text-field-container'>
    <TypographyComponent variant='subtitle1'>Started On:</TypographyComponent>
  
            <TypographyComponent variant='subtitle1'>{employee?.employeeNineleapsJoiningDate}</TypographyComponent>
        
  </div>
  <div className='text-field-container'>
    <TypographyComponent variant='subtitle1'>Work Mode:</TypographyComponent>
    {isEditing ? (
            <input type="text" value={workmodeValue} onChange={(e) => setWorkmodeValue(e.target.value)} />
            
          ) : (
  
            <TypographyComponent variant='subtitle1'>{employee?.employeeWorkingMode}</TypographyComponent>
            )}
  </div>
</div>
  </div>
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
  )
}
export default Userprofile;