import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import GetHelp from './GetHelp';
import ChangePasswordPage from './pages/changepassword/changepassword';
import Navbar from './components/organisms/PagesNavigation/PagesNavigation';
import './App.css';

function App() {
  return (
    <>
    <Router>
      <Navbar/>
     <Routes>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>} />
        <Route path='/gethelp' element={<GetHelp/>} />
        <Route path='/navbar' element={<Navbar/>} />
        <Route path='/changepassword' element={<ChangePasswordPage/>}/>
        </Routes>
    </Router>
  </>
  );
}

export default App;