// import React, {useState} from 'react'
// import './card.css'
// import InputControl from '../../atoms/InputControl/InputControl'
// import Button from "../../atoms/Button/Button"
// import { Link } from 'react-router-dom';
// interface LoginFormData {
//     email: string;
//     password: string;
//   }
//   interface LoginFormErrors {
//     email?: string;
//     password?: string;
//   }
// export const Card = () => {
//         const [formData, setFormData] = useState<LoginFormData>({
//           email: "",
//           password: "",
//         });
//         const [formErrors, setFormErrors] = useState<LoginFormErrors>({});
//         const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//           const { name, value } = event.target;
//           setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
//         };
//         const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
//           event.preventDefault();
//           const errors: LoginFormErrors = {};
//           if (!formData.email) {
//             errors.email = "Email is required";
//           } else if (!/^[a-zA-Z]+\.[a-zA-Z]+@nineleaps\.com$/.test(formData.email)) {
//             errors.email = "Email is invalid";
//           }
//           if (!formData.password) {
//             errors.password = "Password is required";
//           } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[!-\\/:-@\\[-`{-~])[A-Za-z\d@#$%^&+=!-\\/:-@\\[-`{-~]{8,15}$/.test(formData.password)) {
//             errors.password = "Password is invalid";
//           }
//           setFormErrors(errors);
//           if (Object.keys(errors).length === 0) {
//             // Submit the form
//             console.log(formData);
//           }
//         };
//   return (
//     <div className='login_component'>
//     <div className='login_header'>LOGIN</div>
//     <div className="card_description">Sign in to your account</div>
//     <div className='Input'>
//     <div className="email_comp">
//       <InputControl
//         label="Email"
//         type="email"
//         id="email"
//         name="email"
//         value={formData.email}
//         onChange={handleInputChange}
//         placeholder="abc.xyz@nineleaps.com"
//       />
//       {formErrors.email && <div className="error">{formErrors.email}</div>}
// </div>
// <div className="password_comp">
//       <InputControl
//         label="Password"
//         type="password"
//         id="password"
//         name="password"
//         value={formData.password}
//         onChange={handleInputChange}
//         placeholder="Enter your password"
//       />
//       {formErrors.password && (
//         <div className="error">{formErrors.password}</div>
//       )}
//       </div>
//       </div>
// <div className="form_forget_password"><Link to ={'/OtpverificationPage'}>Forget Password?</Link></div>

// <div className="submit_button">
// <Button text="Login" onClick={handleSubmit}></Button>
// </div>
//     </div>
//   )
// }




// login-card

import React, {useState} from 'react'
import './card.css'
import InputControl from '../../atoms/InputControl/InputControl'
import Button from "../../atoms/Button/Button"
// import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import Googlebutton from '../../atoms/Googlebutton/Googlebutton';
import axios from 'axios';
import { Link } from 'react-router-dom';


interface LoginFormData {
    email: string;
    password: string;
  }
  
  interface LoginFormErrors {
    email?: string;
    password?: string;
  }





// export const Card = () => {

//         const navigate = useNavigate();

//         const [showPassword, setShowPassword] = useState(false);

//         const AlterShowPassword = () => {
//           console.log('Clicked on visibility icon');
//           setShowPassword(!showPassword);
//           console.log('showPassword:', showPassword);
//         };

//         const [formData, setFormData] = useState<LoginFormData>({
//           email: "",
//           password: "",
//         });
      
//         const [formErrors, setFormErrors] = useState<LoginFormErrors>({});
      
//         const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//           const { name, value } = event.target;
//           setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
//         };
      
//         const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
//           event.preventDefault();
//           const errors: LoginFormErrors = {};
      
//           if (!formData.email) {
//             errors.email = "Email is required";
//           } else if (!/^[a-zA-Z]+\.[a-zA-Z]+@nineleaps\.com$/.test(formData.email)) {
//             errors.email = "Email is invalid";
//           }
      
//           if (!formData.password) {
//             errors.password = "Password is required";
//           } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[!-\/:-@\[-`{-~])[A-Za-z\d@#$%^&+=!-\/:-@\[-`{-~]{8,15}$/.test(formData.password)) {
//             errors.password = "Password is invalid";
//           }
      
//           setFormErrors(errors);
      
//           if (Object.keys(errors).length === 0) {
//             // Submit the form
//             axios.post('http://cors-anywhere.herokuapp.com/http://0a83-106-51-70-135.ngrok-free.app/api/login',{
//     username:formData.email,
//     password:formData.password

//    },
//   { headers:{
//     'Access-Control-Allow-Origin': '*',
//     'ngrok-skip-browser-warning':'true'
//    }})
//    .then((res)=>{
//     console.log(res)
//     navigate('/LandingPage')
//    })
//    .catch((err)=>{
//     console.log(err)
//    });
//           }
//         };
    
//   return (

    
//     <div className='login_component'>
//     <div className='login_header'>LOGIN</div>
//     <div className="card_description">Sign in to your account</div>
//     <div className="email_comp">
//       <InputControl
//         label="Email"
//         type="email"
//         id="email"
//         name="email"
//         value={formData.email}
//         onChange={handleInputChange}
//         placeholder="abc.xyz@nineleaps.com"
//       />
//       						<EmailIcon className="icon" />

//       {formErrors.email && <div className="error">{formErrors.email}</div>}
// </div>



// <div className="password_comp">    
//       <InputControl
//         label="Password"
//         // type="password"
//         type={showPassword ? "text" : "password"}
//         id="password"
//         name="password"
//         value={formData.password}
//         onChange={handleInputChange}
//         placeholder="Enter your password"
//       />
//       {showPassword ? (
// 			<VisibilityIcon className="icon" onClick={AlterShowPassword} />
// 				) : (
// 			<VisibilityOffIcon className="icon" onClick={AlterShowPassword} />
// 			)}
//       {formErrors.password && (
//       <div className="error">{formErrors.password}</div>
//       )}
//       </div>

//       <div className="form_forget_password"><Link to ={'/OtpverificationPage'}>Forget Password?</Link></div>

// {/* <Button className="submit_button" type="submit" onClick={handleSubmit}>Login</Button>  */}
// <div className="submit_button">
// <Button text="Login"  onClick={handleSubmit}></Button>
// </div>
// <hr/>
// <div className='google_btn'>
//  <Googlebutton />
// </div>

//     </div>


//   )
// }
export const Card = () => {
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
            } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[!-\\/:-@\\[-`{-~])[A-Za-z\d@#$%^&+=!-\\/:-@\\[-`{-~]{8,15}$/.test(formData.password)) {
              errors.password = "Password is invalid";
            }
            setFormErrors(errors);
            if (Object.keys(errors).length === 0) {
              // Submit the form
              console.log(formData);
            }
          };
    return (
      <div className='login_component'>
      <div className='login_header'>LOGIN</div>
      <div className="card_description">Sign in to your account</div>
      <div className='Input'>
      <div className="email_comp">
        <InputControl
          label="Email"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="abc.xyz@nineleaps.com"
        />
        {formErrors.email && <div className="error">{formErrors.email}</div>}
  </div>
  <div className="password_comp">
        <InputControl
          label="Password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
        />
        {formErrors.password && (
          <div className="error">{formErrors.password}</div>
        )}
        </div>
        </div>
  <div className="form_forget_password"><Link to ={'/OtpverificationPage'}>Forget Password?</Link></div>
  
  <div className="submit_button">
  <Button text="Login" onClick={handleSubmit}></Button>
  </div>
      </div>
    )
  }