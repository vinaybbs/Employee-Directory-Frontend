import React, { useState } from 'react';
import './form.css'
import { BsFillCameraFill } from 'react-icons/bs';
import TypographyComponent from '../../atoms/Typography/Typography';
import Button from '../../atoms/Button/Button';
import { MenuItem, Select } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { insertemployeeapi } from '../../../Apis/Api';

interface FormState {
  firstName: string;
  middleName: string;
  lastName: string;
  employeeid: string;
  dob: string;
  jobtitle: string;
  department: string;
  designation: string;
  address: string;
  email: string;
  phone: string;
  location: string;
  startedon: string;
  workmode: string;
  linkedInUrl: string;
  githubUrl: string;
  slackUrl: string;
  reportingmanager: string;
  profilephoto: string;

}


function Formadmin() {
  const [designation, setDesignation] = useState('');
  const [jobtitle, setJobtitle] = useState('');
  const [department, setDepartment] = useState('');
  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    middleName: '',
    lastName: '',
    employeeid: '',
    address: '',
    location: '',
    workmode: '',
    dob: '',
    startedon: '',
    jobtitle: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    linkedInUrl: '',
    githubUrl: '',
    slackUrl: '',
    reportingmanager: '',
    profilephoto: '',
  });


  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [profilePic, setProfilePic] = useState('');
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  // const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   console.log("indra", file);
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setProfilePic(reader.result as string);
  //     setIsImageUploaded(true);
  //   };
  //   reader.readAsDataURL(file!);
  //   console.log("sejal", reader.result);
  // };

  const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    var reader = new FileReader();
    reader.onloadend = function() {
      console.log('RESULT', reader.result)
      setProfilePic(reader.result as string);
    }
    reader.readAsDataURL(file!);
  };
  
  // const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const arrayBuffer = reader.result as ArrayBuffer;
  //     const uint8Array = new Uint8Array(arrayBuffer);
  //     const decoder = new TextDecoder();
  //     const decodedString = decoder.decode(uint8Array);
  //     console.log(decodedString, uint8Array, file )
  //     setProfilePic(decodedString);
  //     setIsImageUploaded(true);
  //   };
  //   reader.readAsArrayBuffer(file!);
  // };
  
  
  
  
  
  
  
  console.log('sagar', profilePic);
  


  function Oncancel() {
    setFormData(
      {
        firstName: '',
        middleName: '',
        lastName: '',
        employeeid: '',
        address: '',
        location: '',
        workmode: '',
        startedon: '',
        dob: '',
        email: '',
        phone: '',
        jobtitle: '',
        department: '',
        designation: '',
        linkedInUrl: '',
        githubUrl: '',
        slackUrl: '',
        reportingmanager: '',
        profilephoto: '',
      }); // clear form data
    setErrors({});
    setProfilePic('');
    setIsImageUploaded(false);
  }

  function Onsave() {
    let formErrors = {} as Partial<FormState>;
    

    if (!formData.firstName) {
      formErrors.firstName = 'First name is required.';
    }
    if (!formData.lastName) {
      formErrors.lastName = 'Last name is required.';
    }
    if (!formData.address) {
      formErrors.address = 'Address is required.';
    }
    if (!formData.location) {
      formErrors.location = 'Location is required.';
    }
    if (!formData.workmode) {
      formErrors.workmode = 'Work Mode is required.';
    }
    if (!formData.dob) {
      formErrors.dob = 'Date of birth is required.';
    }
    if (!formData.startedon) {
      formErrors.startedon = 'Started On is required.';
    }
    if (!formData.jobtitle) {
      formErrors.jobtitle = 'Job Title is required.';
    }
    if (!formData.department) {
      formErrors.department = 'Department is required.';
    }
    if (!formData.designation) {
      formErrors.designation = 'Designation is required.';
    }
    if (!formData.email) {
      formErrors.email = 'Email is required.';
    } else if (!/^[a-zA-Z]+\.[a-zA-Z]+@nineleaps\.com$/.test(formData.email)) {
      formErrors.email = 'Invalid email type.';
    }
    if (!formData.phone) {
      formErrors.phone = 'Phone is required.';
    } else if (!/^[9768]\d{9}$/.test(formData.phone)) {
      formErrors.phone = 'Invalid phone number format.';
    }
    if (!formData.linkedInUrl) {
      formErrors.linkedInUrl = 'LinkedIn URL is required.';
    } else if (!/^(ftp|http|https|www):\/\/[^ "]+$/.test(formData.linkedInUrl)) {
      formErrors.linkedInUrl = 'Invalid LinkedIn URL format.';
    }
    if (!formData.githubUrl) {
      formErrors.githubUrl = 'Github URL is required.';
    } else if (!/^(ftp|http|https|www):\/\/[^ "]+$/.test(formData.githubUrl)) {
      formErrors.githubUrl = 'Invalid Github URL format.';
    }
    if (!formData.slackUrl) {
      formErrors.slackUrl = 'Slack URL is required.';
    } else if (!/^(ftp|http|https|www):\/\/[^ "]+$/.test(formData.slackUrl)) {
      formErrors.slackUrl = 'Invalid Slack URL format.';
    }
    //  if (!isImageUploaded) {
    //   alert('Please upload an image.');
    // }
    if (!formData.reportingmanager) {
      formErrors.reportingmanager = 'Reporting Manager is required.';
    }
    else if (!/^[a-zA-Z]+\.[a-zA-Z]+@nineleaps\.com$/.test(formData.reportingmanager)) {
      formErrors.reportingmanager = 'Invalid reporting email type.';
    }
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      axios.post(insertemployeeapi, {
        employeeFirstName: formData.firstName,
        employeeMiddleName: formData.middleName,
        employeeLastName: formData.lastName,
        nineleapsEmployeeId: formData.employeeid,
        employeeAddress: formData.address,
        employeeWorkingLocation: formData.location,
        employeeDateOfBirth: formData.dob,
        employeeJobTitle: formData.jobtitle,
        employeeDept: formData.department,
        employeeDesignation: formData.designation,
        employeeContactNumber: formData.phone,
        employeeEmail: formData.email,
        employeeNineleapsJoiningDate: formData.startedon,
        employeeGit: formData.githubUrl,
        employeeLinkedIn: formData.linkedInUrl,
        employeeSlack: formData.slackUrl,
        employeeWorkingMode: formData.workmode,
        reportingManager: formData.reportingmanager,
        employeeProfilePhoto: profilePic
      },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'ngrok-skip-browser-warning': 'true'
          }
        })
        .then((res: any) => {
          console.log(res.data)
          window.location.href = '/LandingPage';

        })
        .catch((err: any) => {
          console.log(err)
        });
    }
  }
  const buttonStyle7 = {
    backgroundColor: 'blue',
  };
  const buttonStyle8 = {
    backgroundColor: 'blue',
  };
  return (
    <div className="form-background">
      <div className='form-box'>

        <div className='Employee-details-container'>
          <div className="profile-pic-container">
            {profilePic ? (
              <img src={profilePic} alt="Profile" />
            ) : null}
          </div>
          <div className="upload-image-container">
            <BsFillCameraFill className="camera-icon" />
            <label htmlFor="file-upload" className="upload-label">

              Upload Image
              <input
                id="file-upload"
                type="file"
                accept="image/jpeg, image/png"
                onChange={(e) => onUpload(e)}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <div className='form-title'>
            <TypographyComponent variant='title'><b>EMPLOYEE DETAILS</b></TypographyComponent>
          </div>
          <div className='employee-details-input'>
            <div className='name-row-container'>
              <div className='container-name'>
                <TypographyComponent variant='subtitle1'>First Name: <span className='required'>*</span></TypographyComponent>
                <input type='text' value={formData.firstName} onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value });
                  setErrors({ ...errors, firstName: '' }); // clear error message for last name field
                }} />
                {errors.firstName && <div className='error'>{errors.firstName}</div>}
              </div>
              <div className='container-name'>
                <TypographyComponent variant='subtitle1'>Middle Name: </TypographyComponent>
                <input type='text' value={formData.middleName} onChange={(e) => {
                  setFormData({ ...formData, middleName: e.target.value });
                  setErrors({ ...errors, middleName: '' }); // clear error message for middle name field
                }} />
                {errors.middleName && <div className='error'>{errors.middleName}</div>}
              </div>
              <div className='container-name'>
                <TypographyComponent variant='subtitle1'>Last Name: <span className='required'>*</span></TypographyComponent>
                <input type='text' value={formData.lastName} onChange={(e) => {
                  setFormData({ ...formData, lastName: e.target.value });
                  setErrors({ ...errors, lastName: '' }); // clear error message for last name field
                }} />
                {errors.lastName && <div className='error'>{errors.lastName}</div>}
              </div>
            </div>
            <div className='form-second-row'>
              <div className='container-row'>
                <TypographyComponent variant='subtitle1'>Employee ID: <span className='required'>*</span></TypographyComponent>
                <input type='text' value={formData.employeeid} onChange={(e) => {
                  setFormData({ ...formData, employeeid: e.target.value });
                  setErrors({ ...errors, employeeid: '' }); // clear error message for last name field
                }} />
                {errors.employeeid && <div className='error'>{errors.employeeid}</div>}
              </div>
              <div className='container-row'>
                <TypographyComponent variant='subtitle1'>Date of Birth: <span className='required'>*</span></TypographyComponent>
                <DatePicker
                  id='dob'
                  selected={formData.dob ? new Date(formData.dob) : null}
                  onChange={(date: Date) => {
                    const formattedDate = date.toISOString().substr(0, 10); // format the date as a string
                    setFormData({ ...formData, dob: formattedDate });
                  }}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode='select'
                  placeholderText='Select a date'
                  dateFormat='yyyy-MM-dd'
                  className='date-picker'
                />
                {errors.dob && <div className='error'>{errors.dob.toString()}</div>}
              </div>
            </div>


            <div className='form-second-row'>
              <div className='container-row'>
                <TypographyComponent variant='subtitle1'>Job Title: <span className='required'>*</span> </TypographyComponent>
                <Select
                  value={formData.jobtitle}
                  label='new department'
                  onChange={(e) => {
                    setFormData({ ...formData, jobtitle: e.target.value as string });
                    setErrors({ ...errors, jobtitle: '' });
                  }}
                  key={formData.jobtitle}
                  style={{ width: '90%' }}
                >
                  <MenuItem value='Data Analyst'>Data Analyst</MenuItem>    
                  <MenuItem value='Java Developer'>Java Developer</MenuItem>
                  <MenuItem value='React Developer'>React Developer</MenuItem>
                  <MenuItem value='C# Developer'>C# Developer</MenuItem>
                  <MenuItem value='Angular Developer'>Angular Developer</MenuItem>
                  <MenuItem value='SDET'>SDET</MenuItem>
                  <MenuItem value='HR'>HR</MenuItem>
                  <MenuItem value='HR Spoc'>HR Spoc</MenuItem>
                  <MenuItem value='Manager'>Manager</MenuItem>
                  <MenuItem value='React Native Develeoper'>React Native Developer</MenuItem>
                </Select>
                {errors.jobtitle && <div className='error'>{errors.jobtitle}</div>}
              </div>
              <div className='container-row'>
                <TypographyComponent variant='subtitle1'>Department: <span className='required'>*</span></TypographyComponent>
                <Select
                  value={formData.department}
                  label='new department'
                  onChange={(e) => {
                    setFormData({ ...formData, department: e.target.value as string });
                    setErrors({ ...errors, department: '' });
                  }}
                  key={formData.department}
                  style={{ width: '90%' }}
                >
                  <MenuItem value='Developer'>Developer</MenuItem>
                  <MenuItem value='Tester'>Tester</MenuItem>
                  <MenuItem value='DevOps'>DevOps</MenuItem>
                  <MenuItem value='Management'>Management</MenuItem>
                  <MenuItem value='Data Engineer'>Data Engineer</MenuItem>
                </Select>
                {errors.department && <div className='error'>{errors.department}</div>}
              </div>
            </div>


            <div className='form-second-row'>
              <div className='container-row'>
                <TypographyComponent variant='subtitle1'>Designation: <span className='required'>*</span></TypographyComponent>
                <Select
                  value={formData.designation}
                  
                  label='new designation'
                  onChange={(e) => {
                    setFormData({ ...formData, designation: e.target.value as string });
                    setErrors({ ...errors, designation: '' });
                  }}
                  style={{ width: '90%' }}
                >
                  <MenuItem value='Intern'>Intern</MenuItem>
                  <MenuItem value='Full-Time'>Full-Time</MenuItem>
                </Select>
                {errors.designation && <div className='error'>{errors.designation}</div>}
              </div>
              <div className='container-row'>
                <TypographyComponent variant='subtitle1'>Address: <span className='required'>*</span></TypographyComponent>
                <input type='text' value={formData.address} onChange={(e) => {
                  setFormData({ ...formData, address: e.target.value });
                  setErrors({ ...errors, address: '' }); // clear error message for last name field
                }} />
                {errors.address && <div className='error'>{errors.address}</div>}
              </div>

            </div>
            <div className='form-second-row'>
              <div className='container-row'>
                <TypographyComponent variant='subtitle1'>Email: <span className='required'>*</span></TypographyComponent>
                <input
                  type='text'
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setErrors({ ...errors, email: '' }); // clear error message for email field
                  }}
                />
                {errors.email && <div className='error'>{errors.email}</div>}
              </div>
              <div className='container-row'>
                <TypographyComponent variant='subtitle1'>Phone: <span className='required'>*</span></TypographyComponent>
                <input
                  type='text'
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    setErrors({ ...errors, phone: '' }); // clear error message for phone field
                  }}
                />
                {errors.phone && <div className='error'>{errors.phone}</div>}
              </div>
            </div>

            <div className='form-second-row'>
              <div className='container-row'>
                <TypographyComponent variant='subtitle1'>Location: <span className='required'>*</span></TypographyComponent>
                <input type='text' value={formData.location} onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });
                  setErrors({ ...errors, location: '' }); // clear error message for last name field
                }} />
                {errors.location && <div className='error'>{errors.location}</div>}
              </div>
              <div className='container-row'>
                <TypographyComponent variant='subtitle1'>Started On:<span className='required'>*</span></TypographyComponent>
                <DatePicker
                  id='startedon'
                  selected={formData.startedon ? new Date(formData.startedon) : null}
                  onChange={(date: Date) => {
                    const formattedDate = date.toISOString().substr(0, 10); // format the date as a string
                    setFormData({ ...formData, startedon: formattedDate });
                  }}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode='select'
                  placeholderText='Select a date'
                  dateFormat='yyyy-MM-dd'
                  className='date-picker'
                />
                {errors.startedon && <div className='error'>{errors.startedon.toString()}</div>}
              </div>
            </div>
            <div className='form-second-row'>
              <div className='container-row'>
                <TypographyComponent variant='subtitle1'>Work Mode: <span className='required'>*</span></TypographyComponent>
                <input type='text' value={formData.workmode} onChange={(e) => {
                  setFormData({ ...formData, workmode: e.target.value });
                  setErrors({ ...errors, workmode: '' }); // clear error message for last name field
                }} />
                {errors.workmode && <div className='error'>{errors.workmode}</div>}
              </div>
              <div className='container-row'>
                <TypographyComponent variant='subtitle1'>LinkedIn Url: <span className='required'>*</span></TypographyComponent>
                <input
                  type='text'
                  value={formData.linkedInUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, linkedInUrl: e.target.value });
                    setErrors({ ...errors, linkedInUrl: '' }); // clear error message for URL field
                  }}
                />
                {errors.linkedInUrl && <div className='error'>{errors.linkedInUrl}</div>}
              </div>
            </div>
            <div className='form-second-row'>
              <div className='container-row'>
                <TypographyComponent variant='subtitle1'>Github Url: <span className='required'>*</span></TypographyComponent>
                <input
                  type='text'
                  value={formData.githubUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, githubUrl: e.target.value });
                    setErrors({ ...errors, githubUrl: '' }); // clear error message for URL field
                  }}
                />
                {errors.githubUrl && <div className='error'>{errors.githubUrl}</div>}
              </div>
              <div className='container-row'>
                <TypographyComponent variant='subtitle1'>Slack Url: <span className='required'>*</span></TypographyComponent>
                <input
                  type='text'
                  value={formData.slackUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, slackUrl: e.target.value });
                    setErrors({ ...errors, slackUrl: '' }); // clear error message for URL field
                  }}
                />
                {errors.slackUrl && <div className='error'>{errors.slackUrl}</div>}
              </div>
            </div>
            <div className='container-row'>
              <TypographyComponent variant='subtitle1'>Reporting Manager Email: <span className='required'>*</span></TypographyComponent>
              <input type='text' value={formData.reportingmanager} onChange={(e) => {
                setFormData({ ...formData, reportingmanager: e.target.value });
                setErrors({ ...errors, reportingmanager: '' }); // clear error message for last name field
              }} />
              {errors.reportingmanager && <div className='error'>{errors.reportingmanager}</div>}
            </div>


          </div>

          <div className='form-buttons'>
            <Button buttonStyle={buttonStyle7} onClick={Onsave} text='Save' />
            <Button buttonStyle={buttonStyle8} onClick={Oncancel} text='Cancel' />

          </div>


        </div>

      </div>
    </div>
  )

}
export default Formadmin;
