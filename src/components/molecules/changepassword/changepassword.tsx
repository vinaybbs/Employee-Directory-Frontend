import React, { useState } from "react";
import InputControl from "../../atoms/InputControl/InputControl";
import Button from "../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import './changepassword.css'
import PasswordChecklist from "react-password-checklist";
import { useSelector } from 'react-redux';
import axios from "axios";
import { changepasswordapi } from "../../../Apis/Api";
import { RootState } from "../../../Redux/Store";
const ChangePassword = () => {
    const navigate=useNavigate()
    const email=useSelector((state:RootState)=>state.statetype.email);
    console.log(email)
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('')
    const validatepassword = (e: { target: { value: any; }; }) => {
        const cPassword = e.target.value
        setConfirmPassword(cPassword)


        if (password === cPassword) {
            setErrorMsg('')
        }
        else if (cPassword === '') {
            setErrorMsg('')

        }
        else {
            setErrorMsg('Both Should be same')
        }

    }
    const CheckPassword = async () => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
        if (!pattern.test(password)) {
           if(password === "")
        {
            setErrorMsg('Fill the required fields')
        }
    else{
        alert('Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be between 8 to 15 characters long.');
        setPassword('')
        setConfirmPassword('')
        setErrorMsg('')
        }
        }
        else {
            try {
                const response = await axios.post(changepasswordapi, null, {
                  params: {
                  username:email,
                  newPassword:password
                  },
                });
            
                if (response.data==='Password successfully changed') {
                 
                     navigate('/')
                }
              } catch (error) {
                console.log(error);
              }
            }
    }
    const Cancel = () => {
        setConfirmPassword('')
        setPassword('')
        setErrorMsg('')
    }
    return (
        <>
      <div className="changeinputfield">
            <InputControl 
                value={password}
                label="New Password"
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => { setPassword(e.target.value); }}
                type='password'/>
                
            <InputControl
                value={confirmPassword}
                label="Confirm New Password"
                onChange={(e: { target: { value: any; }; }) => validatepassword(e)}
                type='password' />
           </div>  
            <span style={{color:'red'}}>{errorMsg}</span>
            <PasswordChecklist
							rules={["specialChar","number","capital"]}
							minLength={8}
							value={password}
							onChange={(isValid) => {}}
						/>
            <div className="changepasswordButton">
                <Button onClick={CheckPassword} text="Submit"/>
                <Button onClick={Cancel} text='Cancel'/>
            </div>
            </>
        )
}
export default ChangePassword