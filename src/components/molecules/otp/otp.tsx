import arrow from '../../assets/arrow-left-circle.png';
import otpimage from '../../assets/what-is-a-one-time-password-hero 1.png'
import TypographyComponent from '../../atoms/Typography/Typography';
import Image from '../../atoms/Image/Image';
import Button from '../../atoms/Button/Button';
import './otp.css'
import OtpInput from 'react-otp-input';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { otpgenerateapi } from '../../../Apis/Api';
import { otpverifyapi } from '../../../Apis/Api';
import { RootState } from '../../../Redux/Store';


const Otp=()=>{
  const navigate=useNavigate()
   const [otp, setOtp] = useState('');
   const email=useSelector((state:RootState)=>state.statetype.email);
   const [message,setMessage]=useState('')
   const handleOtpSubmit = async (event: { preventDefault: () => void; }) => {
     event.preventDefault();
     if(otp==='')
       {
        alert("Fill the OTP Fields")
       }
     try {
       const response = await axios.post(otpverifyapi, null, {
         params: {
           userEnteredotp: otp,
         },
       });
       console.log(response.data)
       if (response.data===true) {
        
            navigate('/ChangePasswordPage')
       }
     } catch (error) {
       setMessage('Error verifying OTP.');
     }
   };
  const onClickingarrow=() => {
      navigate("/OtpverificationPage");
    }
    const sendOtp=async ()=>{
      try {
        const response = await axios.post(otpgenerateapi, null, {
          params: {
            employeeEmail: email,
          },
        });
        console.log(response.data);
        if (response.data==='DONE ...') {
          setMessage('OTP successfully sent');
         
          navigate('/OtpPage')
        }
        
      } catch (error) {
        setMessage('Error sending OTP.');
      }
    }
    return(
        <>
        <div className='arrow'>
        <Image imageSrc={arrow} altText='/' width='43px' height='39px'onClick={onClickingarrow}/>
        </div>
        <div className='otp-image'>
        <Image  imageSrc={otpimage} altText='/' width='240px' height='133px'/>
        </div>
       <div className='otp-text'> <TypographyComponent variant='title'><b>OTP SENT !!</b></TypographyComponent></div>
        <div className='email-sent'><TypographyComponent variant='title'>Enter the OTP sent to <div className='email'>{email}</div> </TypographyComponent></div>
        <div className='submit'>
          <OtpInput
            inputStyle='otp-input'
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputType='tel'
            renderInput={(props) => <input {...props} />}
          />
          
          <p className='resend' onClick={sendOtp}>Not received?<b><u> RESEND</u></b></p>
        <Button text="Submit" onClick={handleOtpSubmit}/>
        <p>{message}</p>
          </div>
        </>
    )
}
export default Otp;