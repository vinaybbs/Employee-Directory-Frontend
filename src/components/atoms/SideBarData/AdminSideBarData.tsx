import * as HiIcons from 'react-icons/hi';
import * as CgIcons from 'react-icons/cg';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io';
export const AdminSidebarData = [
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
    title: 'Add Employee',
    path: '/Form',
    icon: <IoIcons.IoMdPersonAdd/>,
    cName: 'nav-text'
  },
  
 
];
