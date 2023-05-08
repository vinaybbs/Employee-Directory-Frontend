import React from "react"
import './footer.css';
import Image from "../../atoms/Image/Image";
import logo from "../../assets/Nineleaps.png"
import Icons from "../../atoms/Icons/Icons";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';


function Footer() {
  return (
      <div className="footer_container">
        <div className="logo">
          <a href="https://www.nineleaps.com/"><Image imageSrc={logo} /></a>
        </div>
        <div className="info">
         
          <p>&copy; 2023 Your Company Name. All rights reserved.</p>
          <a href="your-privacy-policy-url">Privacy Policy</a>
        </div>
        <div className="social">
        
        <a href="https://www.facebook.com/nineleaps/"><Icons icon={FaFacebook} height='30px' width='40px' /></a>
        <a href="https://www.instagram.com/nineleaps_tech/?hl=en"><Icons icon={FaInstagram} height='30px' width='40px' /></a>
        <a href="https://in.linkedin.com/company/nineleaps"><Icons icon={FaLinkedin} height='30px' width='40px' /></a>
        <a href="https://twitter.com/nineleaps"><Icons icon={FaTwitter} height='30px' width='40px' /></a>
    </div>
      </div>
  );
}

export default Footer