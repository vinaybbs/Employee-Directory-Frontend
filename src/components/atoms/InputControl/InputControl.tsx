import React from "react";

import "./InputControl.css";

const InputControl=(props:any)=> {
  return (
    <div className="inputcontainer">
      {props.label && <label>{props.label}</label>}
      <input{...props}/>
    </div>
  );
}

export default InputControl;