import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './detailcard.css'
import Icons from '../Icons/Icons';
import './detailcard.css'
import { AiFillGithub, AiFillSlackCircle, AiFillLinkedin } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { allemployees } from '../../../Apis/Api';
import { useSelector } from 'react-redux';
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
  employeeEmail: string;
}
function EmployeeList(): React.ReactElement {
  const role=useSelector((state:RootState)=>state.statetype.role)
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 10;
  useEffect(() => {
    const config = {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    };
    axios.get<Employee[]>(allemployees, config)
      .then(response => setEmployees(response.data))
      .catch(error => console.error(error))
  }, []);
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
  const pageCount = Math.ceil(employees.length / itemsPerPage);
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const renderPageButtons = () => {
    const pageButtons = [];
    for (let i = 1; i <= pageCount; i++) {
      pageButtons.push(
        <button key={i} onClick={() => handlePageClick(i)} className={currentPage === i ? "active" : ""}>
          {i}
        </button>
      );
    }
    return pageButtons;
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>
      <div className='information'>
        {currentItems.map(employee => (
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
                <a href={employee.employeeGit} style={{ background: 'black' }} className="link" target="_blank" rel="noreferrer">
                  <Icons icon={AiFillGithub} />
                </a>
                <a href={employee.employeeSlack} style={{ background: 'purple' }} className="link" target="_blank" rel="noreferrer">
                  <Icons icon={AiFillSlackCircle} />
                </a>
                <a href={employee.employeeLinkedIn} style={{ background: '#0C77B5' }} className="link" target="_blank" rel="noreferrer">
                  <Icons icon={AiFillLinkedin} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {renderPageButtons()}
      </div>
    </>
  );
}
export default EmployeeList;