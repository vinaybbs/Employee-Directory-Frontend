import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './detailcard.css';
import { AiFillGithub,AiFillSlackCircle,AiFillLinkedin } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import Icons from '../../atoms/Icons/Icons';
import {filterdepartment} from '../../../Apis/Api';
import { RootState } from '../../../Redux/Store';
import { useSelector } from 'react-redux';
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
function FiteredDepartmentList(): React.ReactElement {
    const navigate=useNavigate();
    const role=useSelector((state:RootState)=>state.statetype.role)
    const [employees, setEmployees] = useState<Employee[]>([]);
    const { department } = useParams<{ department: string }>();
    useEffect(() => {
        const fetchEmployeeDetails = async () => {
          const config = {
            headers: {  'ngrok-skip-browser-warning': 'true'}
          };
          try {
            const response = await axios.get<Employee[]>(`${filterdepartment}/${department}`,config);
            console.log(response.data);
            setEmployees(response.data)
          } catch (error) {
            console.error(error);
          }
        };
        fetchEmployeeDetails();
      }, [department]);
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
export default FiteredDepartmentList;