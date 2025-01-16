import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBuilding, FaCogs, FaTachometerAlt, FaUsers } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';
import logo from '../../assets/Padget.png';

const Sidebar = ({ isOpen }) => {
  const { user } = useAuth();

  return (
    <div className={`bg-custom-purple text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className='bg-white h-12 flex items-center justify-center'>
        <img src={logo} alt="CheckSheets Logo" className='h-10' />
      </div>
      <div className='px-4'>
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) => `
    ${isActive ? "bg-white" : ""} 
    flex items-center space-x-4 block py-2.5 px-4 rounded
  `}
          end
        >
          {({ isActive }) => (
            <>
              <FaTachometerAlt className={`${isActive ? 'text-custom-purple' : 'text-white'}`} />
              <span className={`${isActive ? 'text-custom-purple' : 'text-white'}`}>Dashboard</span>
            </>
          )}
        </NavLink>

        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) => `
    ${isActive ? "bg-white" : ""} 
    flex items-center space-x-4 block py-2.5 px-4 rounded
  `}
        >
          {({ isActive }) => (
            <>
              <FaUsers className={`${isActive ? 'text-custom-purple' : 'text-white'}`} />
              <span className={`${isActive ? 'text-custom-purple' : 'text-white'}`}>My Profile</span>
            </>
          )}
        </NavLink>

        

        <NavLink
          to={`/employee-dashboard/leaves11/${user._id}`}
          className={({ isActive }) => `
    ${isActive ? "bg-white" : ""}
    flex items-center space-x-4 block py-2.5 px-4 rounded
  `}
        >
          {({ isActive }) => (
            <>
              <FaBuilding className={`${isActive ? 'text-custom-purple' : 'text-white'}`} />
              <span className={`${isActive ? 'text-custom-purple' : 'text-white'}`}>Data Analytics Monitoring</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) => `
    ${isActive ? "bg-white" : ""} 
    flex items-center space-x-4 block py-2.5 px-4 rounded
  `}
        >
          {({ isActive }) => (
            <>
              <FaCogs className={`${isActive ? 'text-custom-purple' : 'text-white'}`} />
              <span className={`${isActive ? 'text-custom-purple' : 'text-white'}`}>Settings</span>
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;