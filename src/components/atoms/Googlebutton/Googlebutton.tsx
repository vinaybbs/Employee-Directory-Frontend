import jwtDecode, { JwtPayload } from 'jwt-decode';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { googlebtnapi } from '../../../Apis/Api';
import { useDispatch } from 'react-redux';
import { setRole } from '../../../Redux/Action';
declare global {
  interface Window { google: any; }
}
function Googlebutton(): JSX.Element {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  function fn(response: any): void {
    console.log(response.credential);
    const token = response.credential;
    localStorage.setItem('Authorization', token);
    fetch(googlebtnapi, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to verify JWT token');
      }
    }).then(data => {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      const decoded = jwtDecode<JwtPayload>(data.access_token) as any;
      dispatch(setRole(decoded.roles[0]));
      if (data.access_token) {
        navigate('/LandingPage');
      } else {
        console.log('No access token');
      }
    }).catch(error => {
      console.error(error);
      alert('You are not Authorized. Please use your Nineleaps account!!');
      
    });
  }
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "139460402068-upt4ujlt7jjrtj83185h6820s7ij8fjc.apps.googleusercontent.com",
      callback: fn
    });
    window.google.accounts.id.renderButton(
      document.getElementById("signIn") ||  document.createElement("div"),
      { theme: "outline", size: "large" }
    );
  }, []);
  return (
    <div id="signIn"></div>
  );
}
export default Googlebutton;