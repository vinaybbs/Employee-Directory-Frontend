import Image from "../../atoms/Image/Image";
import arrow from "../../assets/arrow-left-circle.png";
import ChangePassword from "../../molecules/changepassword/changepassword";
import { useNavigate } from "react-router-dom";

import './changepasswordorganism.css'
const ChangePasswordOrganism = () => {
    const navigate=useNavigate()
     const onClickingarrow=() => {
    
      navigate("/OtpverificationPage");
    }
    return (
        <div className="container">
            <div className="arrow">
            <Image imageSrc={arrow} altText='back' height='40px' width='40px' onClick={onClickingarrow} />
            </div>
            <h1 style={{textAlign: 'center'}}>Change Password</h1>
            <ChangePassword />
        </div>
      
    )
}
export default ChangePasswordOrganism