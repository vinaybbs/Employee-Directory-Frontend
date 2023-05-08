import React, { useRef, useState } from "react";
import './filter.css'
import Dropdowns from "../../atoms/Dropdown/Dropdown";
const Filter = () => {
  const [isOpen, setIsOpen] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (!isOpen) {
      inputRef.current?.focus();
    }
    setIsOpen(!Boolean(isOpen) ? "open" : "");
  };

  return (
    <div className={`filter ${isOpen}`}>
     <div className="drop">
      {isOpen&&<Dropdowns />}
      </div>
      <button
        onClick={handleClick}
        className={`nav-button uil uil-${isOpen ? "multiply" : "filter"}`}
      ></button>

    </div>
  )
}
export default Filter