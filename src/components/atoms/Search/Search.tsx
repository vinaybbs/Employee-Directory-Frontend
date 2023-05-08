import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import './search.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allemployees } from "../../../Apis/Api";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";

interface Employee{
  employeeFirstName:string;
  employeeId:number;
  employeeLastName:string
  employeeMiddleName: string;
  employeeJobTitle: string;
  employeeEmail: string;
}
const Search = () => {
  const navigate=useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const role=useSelector((state:RootState)=>state.statetype.role)

  useEffect(() => {
    const config = {
      headers: {'ngrok-skip-browser-warning': 'true'}
    };

    axios.get<Employee[]>(allemployees, config)
      .then(response => setEmployees(response.data))
      .catch(error => console.error(error))
  }, []);

  const handleButtonClick = (employeeEmail: string) => {

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
  const [isOpen, setIsOpen] = useState("");
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (!isOpen) {
      inputRef.current?.focus();
    }
    setIsOpen(!Boolean(isOpen) ? "open" : "");
   
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // const filterEmployees = (employees: Employee[], search: string) => {
  //   return employees.filter((employee) => {
  //     const fullName = `${employee.employeeFirstName} ${employee.employeeMiddleName} ${employee.employeeLastName}`;
  //     return (
  //       search.length &&
  //       (employee.employeeFirstName.toLowerCase().includes(search.toLowerCase()) ||
  //         employee.employeeMiddleName.toLowerCase().includes(search.toLowerCase()) ||
  //         employee.employeeLastName.toLowerCase().includes(search.toLowerCase()) ||
  //         employee.employeeJobTitle.toLowerCase().includes(search.toLowerCase()) ||
  //         fullName.toLowerCase().includes(search.toLowerCase()))
  //     );
  //   });
  // };
  // const filteredEmployees = filterEmployees(employees, search);

  const filteredEmployees = employees.filter(
    (employee) =>
      search.length &&
      (employee.employeeFirstName.toLowerCase().startsWith(search.toLowerCase()) ||
        (employee.employeeMiddleName &&
          employee.employeeMiddleName
            .toLowerCase()
            .startsWith(search.toLowerCase())) ||
        employee.employeeLastName.toLowerCase().startsWith(search.toLowerCase()) ||
        employee.employeeJobTitle.toLowerCase().startsWith(search.toLowerCase()))
  );

  return (
    <div className={`search ${isOpen}`}>
      <input
        ref={inputRef}
        onChange={handleChange}
        placeholder="Find an employee"
        type="text"
      />
      <button
        onClick={handleClick}
        className={`nav-button uil uil-${isOpen ? "multiply" : "search"}`}
      ></button>
      <div className={`items ${isOpen}`}>
        {Boolean(filteredEmployees.length) &&
          filteredEmployees.slice(0, 3).map((employee) => (
            <button
              key={employee.employeeEmail}
              onClick={() => handleButtonClick(employee.employeeEmail)}
            >
              {`${employee.employeeFirstName} ${employee.employeeMiddleName} ${employee.employeeLastName} ${employee.employeeJobTitle}`}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Search;