import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './detailcard.css';
import { AiFillGithub,AiFillSlackCircle,AiFillLinkedin } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import Icons from '../../atoms/Icons/Icons';
import {filterdesignation} from '../../../Apis/Api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store';
interface Employee {
  employeeId: number;
  employeeFirstName: string;
  employeeLastName:string;
  employeeJobTitle:string;
  employeeProfilePhoto:string;
  employeeGit:string;
  employeeSlack:string;
  employeeLinkedIn:string;
  employeeEmail:string
}
function FiteredDesignationList(): React.ReactElement {
    const navigate=useNavigate();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const role=useSelector((state:RootState)=>state.statetype.role)
    const { designation } = useParams<{ designation: string }>();
    useEffect(() => {
        const fetchEmployeeDetails = async () => {
          const config = {
            headers: {  'ngrok-skip-browser-warning': 'true'}
          };
          try {
            const response = await axios.get<Employee[]>(`${filterdesignation}/${designation}`,config);
            console.log(response.data);
            setEmployees(response.data)
          } catch (error) {
            console.error(error);
          }
        };
        fetchEmployeeDetails();
      }, [designation]);
    const handleCardClick = (employeeEmail: string) => {
        if(role==='Manager'|| role==='Employee'){
            navigate(`/employee/${employeeEmail}`);
            }
            else if(role==='Admin'){
              navigate(`/employeeadmin/${employeeEmail}`);
            }
            else if(role==='HR'){
              navigate(`/employeehr/${employeeEmail}`);
            }
            else if(role==='HRSpoc'){
              navigate(`/employeehrspoc/${employeeEmail}`);
            }
    };
    return (
      <>
      <div className='information'>
      {employees && employees.map(employee => (
  <div key={employee.employeeId}>
            <div className="profile-card" onClick={() => handleCardClick(employee.employeeEmail)}>
              <div className="image">
                <img src={employee.employeeProfilePhoto} alt="" className="profile-img" />
              </div>
              <div className="text-data">
                <span className="name">{employee.employeeFirstName} {employee.employeeLastName}</span>
                <span className="job">{employee.employeeJobTitle}</span>
              </div>
              <div className="media-buttons">
                <a href={employee.employeeGit} style={{ background: 'black' }} className="link">
                  <Icons icon={AiFillGithub} />
                </a>
                <a href={employee.employeeSlack} style={{ background: 'purple' }} className="link">
                  <Icons icon={AiFillSlackCircle} />
                </a>
                <a href={employee.employeeLinkedIn} style={{ background: '#0C77B5' }} className="link">
                  <Icons icon={AiFillLinkedin} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      </>
    );
}
export default FiteredDesignationList;