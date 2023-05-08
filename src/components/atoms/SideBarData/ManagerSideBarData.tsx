import React from 'react';
import * as HiIcons from 'react-icons/hi';
import * as CgIcons from 'react-icons/cg';
import * as GiIcons from 'react-icons/gi';
import * as GrIcons from 'react-icons/gr';
export const ManagerSidebarData = [
  {
    title: 'Home',
    path: '/LandingPage',
    icon: < HiIcons.HiHome/>,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/userprofile',
    icon: <CgIcons.CgProfile />,
    cName: 'nav-text'
  },
  {
    title: 'Org Chart',
    path: '/Chart',
    icon: <GiIcons.GiOrganigram/>,
    cName: 'nav-text'
  },
  {
    title: 'View Reportees',
    path: '/viewreportees',
    icon: <GrIcons.GrView/>,
    cName: 'nav-text'
  }
 
];
