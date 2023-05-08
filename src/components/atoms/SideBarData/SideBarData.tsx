import React from 'react';
import * as HiIcons from 'react-icons/hi';
import * as CgIcons from 'react-icons/cg';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io';
import * as GrIcons from 'react-icons/gr';
export const SidebarData = [
  {
    title: 'Home',
    path: '/LandingPage',
    icon: < HiIcons.HiHome/>,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/Userprofileadmin',
    icon: <CgIcons.CgProfile />,
    cName: 'nav-text'
  },
  {
    title: 'Get Help',
    path: '/gethelp',
    icon: <MdIcons.MdOutlineLiveHelp />,
    cName: 'nav-text'
  },
  {
    title: 'Org Chart',
    path: '/Chart',
    icon: <GiIcons.GiOrganigram/>,
    cName: 'nav-text'
  },
  {
    title: 'Add Employee',
    path: '/Form',
    icon: <IoIcons.IoMdPersonAdd/>,
    cName: 'nav-text'
  },
  {
    title: 'View Reportees',
    path: '/viewreportees',
    icon: <GrIcons.GrView/>,
    cName: 'nav-text'
  },
  {
    title: 'Employee Profile Admin',
    path: '/employee/:employeeEmail',
    icon: <CgIcons.CgProfile />,
    cName: 'nav-text'
  }
 
];
