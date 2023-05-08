import React, { useState } from "react";
import "./Dropdowns.css";
import { filterdepartment, filterdesignation, filterjobtitle, url } from "../../../Apis/Api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface MultiSelectDropdownProps {
  options: string[];
  label: string;
  endpoint: string;
}
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
const designation=["Full-Time", "Intern"]
const jobtitle =["Data Analysts", "Java Developers", "React Developers","C# Developers","Angular","SDET","HR","HRSpoc","Admin","Manager","React-Native"]
const department=["Development", "Testing", "DevOps","Management","Data Engineer"]
const MultiSelectDropdown = ({
  options,
  label,
  endpoint,
}: MultiSelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = async (value: string) => {
    setSelected(value);
  };
  const handleReset = () => {
    setSelected(null);
  };
  const navigate=useNavigate()
  const handleApply = () => {
    if (selected !== null) {
      if (designation.includes(selected)) {
        const config = {
          headers: { 'ngrok-skip-browser-warning': 'true' }
        };
        axios.get<Employee[]>(`${filterdesignation}/${selected}`, config)
          .then(response => console.log(response.data))
          .catch(error => console.error(error))
        console.log(selected)
        
      }
      if (department.includes(selected)) {
        const config = {
          headers: { 'ngrok-skip-browser-warning': 'true' }
        };
        axios.get<Employee[]>(`${filterdepartment}/${selected}`, config)
          .then(response => console.log(response.data))
          .catch(error => console.error(error))
        console.log(selected)
        
      }
      if (jobtitle.includes(selected)) {
        const config = {
          headers: { 'ngrok-skip-browser-warning': 'true' }
        };
        axios.get<Employee[]>(`${filterjobtitle}/${selected}`, config)
          .then(response => console.log(response.data))
          .catch(error => console.error(error))
        console.log(selected)
      }
    }
  };
  
  return (
    <div className="dropdown-container">
      <button onClick={toggleDropdown}>{label}</button>
      {isOpen && (
        <div className="dropdown">
          {options.map((option) => (
            <label key={option} className="dropdown-option">
              <input
                type="radio"
                checked={selected === option}
                onChange={() => handleSelect(option)}
              />
              {option}
            </label>
          ))}
          <div className="dropdown-buttons">
           <button onClick={handleApply}>Apply</button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
};
const Dropdowns = () => {
  return (
    <div className="dropdowns-container">
      <MultiSelectDropdown
        options={designation}
        label="Designation"
        endpoint="employeedesignation"
      />
      <MultiSelectDropdown
        options={jobtitle}
        label="Job Title"
        endpoint="employeetitle"
      />
      <MultiSelectDropdown
        options={department}
        label="Department"
        endpoint="employeedept"
      />
    </div>
  );
};
export default Dropdowns;