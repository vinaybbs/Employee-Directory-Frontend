import Image from "../../atoms/Image/Image";
import arrow from '../../assets/arrow-left-circle.png';
import otpverifiimage from '../../assets/locklogo.png'
import InputControl from "../../atoms/InputControl/InputControl";
import TypographyComponent from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import { useState } from 'react';
import './otpverification.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setEmail } from "../../../Redux/Action";
import { otpverificationapi } from "../../../Apis/Api";
function Otpverification() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [enteredemail, setEnteredemail] = useState('');
  const [message, setMessage] = useState('');
  const [error,setError]=useState(0)
  const Onhandle=(e: { target: { value: any; }; })=>{
    const cEmail=e.target.value
    setEnteredemail(cEmail)
    dispatch(setEmail(cEmail));
    if(cEmail===''){
        setMessage('')
    }
 }
 const onClickingarrow=() => {
      navigate("/");
    }
 const onClicking=async () => {
    const regEx = /^[a-zA-Z]+\.[a-zA-Z]+@nineleaps\.com$/;
    if(regEx.test(enteredemail))
    {
        setMessage('')
        try {
          const response = await axios.post(otpverificationapi, null, {
            params: {
              employeeEmail: enteredemail,
            },
          });
          console.log(response.data);
          if (response.data==='DONE ...') {
           
            navigate('/OtpPage')
          }
        } catch (error) {
          setError(1)
          setMessage('Error sending OTP.');
        }
    }
    else if(!regEx.test(enteredemail))
    {
      setError(1)
      setMessage('Enter nineleaps email-id only')
     
    }
    if(enteredemail === '')
    {
      setError(1)
      setMessage('Fill the required field')
    }
    }
    return (
    <>
    <div className='arrow'>
        <Image imageSrc={arrow} altText='/' width='43px' height='39px'onClick={onClickingarrow} />
    </div>
    <div className='otpverification-image'>
        <Image  imageSrc={otpverifiimage} altText='/' width='125px' />
    </div>
    <div className='otp-text'> <TypographyComponent variant='title'><b>OTP VERIFICATION</b></TypographyComponent></div>
    <div className='email-sent'><TypographyComponent variant='title'>We will send you a <b>One Time Password</b><br />in your respective email id</TypographyComponent></div>
    <div className="inputfield">
        <InputControl
                value={enteredemail}
                label="Email-Id"
                placeholder="abc.xyz@nineleaps.com"
                onChange={(e: { target: { value: any; }; }) => Onhandle(e)}
                type='text'/>
    </div>
    <div className='message'>
    <span style={{color:'red'}}>{message}</span>
    </div>
    <div className="Buttonn">
        <Button onClick={onClicking} text="Submit"/>
    </div>
    </>
)
}
export default Otpverification