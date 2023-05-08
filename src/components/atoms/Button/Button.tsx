import React from 'react';
import  './button.css';

type ButtonProps = {
  text: string;
  buttonStyle?: React.CSSProperties;
  onClick: (event:React.FormEvent<HTMLButtonElement>) => void;
}

const Button = ({ text, buttonStyle, onClick }: ButtonProps) => {
  return (
    <button style={buttonStyle} className="button" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;