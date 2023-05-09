import React, { useState, useEffect, useRef } from "react";
import "./Dropdowns.css";
import { useNavigate } from "react-router-dom";

interface MultiSelectDropdownProps {
  options: string[];
  label: string;
}

const designation = ["Full-Time", "Intern"];
const jobtitle = [
  "Data Analyst",
  "Java Developer",
  "React Developer",
  "C# Developer",
  "Angular Developer",
  "SDET",
  "HR",
  "HRSpoc",
  "Manager",
  "React Native Developer",
];
const department = ["Developer", "Tester", "DevOps", "Management", "Data Engineer"];

const MultiSelectDropdown = ({ options, label }: MultiSelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = async (value: string) => {
    setSelected(value);
  };

  const handleReset = () => {
    setSelected(null);
  };

  const handleApply = () => {
    if (selected !== null) {
      if (designation.includes(selected)) {
        navigate(`/filterdesignation/${selected}`);
        console.log(selected);
      }
      if (department.includes(selected)) {
        navigate(`/filterdepartment/${selected}`);
        console.log(selected);
      }
      if (jobtitle.includes(selected)) {
        navigate(`/filterjobtitle/${selected}`);
        console.log(selected);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="dropdown-container" ref={ref}>
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
      <MultiSelectDropdown options={designation} label="Designation" />
      <MultiSelectDropdown options={jobtitle} label="Job Title" />
      <MultiSelectDropdown options={department} label="Department" />
    </div>
  );
};

export default Dropdowns;
