import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reportees.css';
import { AiFillGithub,AiFillSlackCircle,AiFillLinkedin } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Icons from '../../atoms/Icons/Icons';
import { useSelector } from 'react-redux';
import { reporteesapi } from '../../../Apis/Api';
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
function ReporteesList(): React.ReactElement {
    const navigate=useNavigate();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const email=useSelector((state:RootState)=>state.statetype.email);
    useEffect(() => {
        const fetchEmployeeDetails = async () => {
          const config = {
            headers: {  'ngrok-skip-browser-warning': 'true'}
          };
          try {
            const response = await axios.get<Employee[]>(`${reporteesapi}/${email}`,config);
            console.log(response.data);
            setEmployees(response.data)
          } catch (error) {
            console.error(error);
          }
        };
        fetchEmployeeDetails();
      }, []);
    const handleCardClick = (employeeEmail: string) => {
      navigate(`/employee/${employeeEmail}`);
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
export default ReporteesList;