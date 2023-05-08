import React, {useState} from 'react'
import Image from '../../atoms/Image/Image'
import logo from '../../assets/High_Performance.png'
import './login.css';
import InputControl from '../../atoms/InputControl/InputControl'
import { useNavigate } from 'react-router-dom';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import Footer from '../../molecules/Footer/Footer';
// import Button from "../../atoms/Button/Button";
import Button from '@mui/material/Button';
import Googlebutton from '../../atoms/Googlebutton/Googlebutton';
import Header from '../../molecules/Header/Header';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setEmail, setLocation, setRole } from '../../../Redux/Action';
import jwtDecode, { JwtPayload } from "jwt-decode";
import { login } from '../../../Apis/Api';

interface LoginFormData {
    email: string;
    password: string;
  }
  
  interface LoginFormErrors {
    email?: string;
    password?: string;
  }
export const Login = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const [showPassword, setShowPassword] = useState(false);

    const AlterShowPassword = () => {
      console.log('Clicked on visibility icon');
      setShowPassword(!showPassword);
      console.log('showPassword:', showPassword);
    };

    const [formData, setFormData] = useState<LoginFormData>({
      email: "",
      password: "",
    });
  
    const [formErrors, setFormErrors] = useState<LoginFormErrors>({});
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const errors: LoginFormErrors = {};
  
      if (!formData.email) {
        errors.email = "Email is required";
      } else if (!/^[a-zA-Z]+\.[a-zA-Z]+@nineleaps\.com$/.test(formData.email)) {
        errors.email = "Email is invalid";
      }
  
      if (!formData.password) {
        errors.password = "Password is required";
      } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[!-\/:-@\[-`{-~])[A-Za-z\d@#$%^&+=!-\/:-@\[-`{-~]{8,15}$/.test(formData.password)) {
        errors.password = "Password is invalid";
      }
  
      setFormErrors(errors);
  
      if (Object.keys(errors).length === 0) {
        axios.post(login,{
   username:formData.email,
   password:formData.password
  },
 { headers:{
   'Access-Control-Allow-Origin': '*',
   'ngrok-skip-browser-warning':'true'
  }})
  .then((res)=>{
   console.log(res)
   const decoded = jwtDecode<JwtPayload>(res.data.access_token) as any;
   dispatch(setRole(decoded.roles[0]));
   dispatch(setEmail(formData.email));
   navigate('/LandingPage')
   dispatch(setLocation('/LandingPage'))
  })
  .catch((err)=>{
   console.log(err)
  });
     }
    };

  return (
    <div className="page_container">
        <div className='header'>
          <Header/>
        </div>
        <div className="second-row">
            <div className="left-section">
                <Image className="img" imageSrc={logo}  />
            </div>
            <div className="right-section">
                <div className="card-container">
                    <div className="card-text">
                        <h1>LOGIN</h1>
                        <h2>Sign in to your account</h2>
                    </div>

                    <div className="email-comp">
                    <InputControl
                        label="Email"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="abc.xyz@nineleaps.com"/>
                        <EmailIcon className="icon" />
                       
                    </div>
                    {formErrors.email && <div className="error">{formErrors.email}</div>}

                    <div className="password-comp">    
                    <InputControl
                        label="Password"
                        // type="password"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"/>
                        {showPassword ? (
                        <VisibilityIcon className="icon" onClick={AlterShowPassword} />
                        ) : (
                        <VisibilityOffIcon className="icon" onClick={AlterShowPassword} />
                        )}
                       
                    </div>
                    {formErrors.password && (
                        <div className="error">{formErrors.password}</div>
                    )}
                    
                    <div className="forgot-pass"><a href="/OtpverificationPage">Forgot Password?</a></div>

                    <div className="submit-button">
                    <Button variant="contained" size="medium" onClick={handleSubmit}>
                      Login
                    </Button>
                        {/* <Button text="Login"  onClick={handleSubmit}></Button> */}
                    </div>
                    <hr></hr>
                    <div className='googlebutton'><Googlebutton></Googlebutton></div>
                    

                </div>
            </div>
        </div>
        <div className="footer">
            <Footer/>
        </div>
        
    </div>
    
    
  
  )
}