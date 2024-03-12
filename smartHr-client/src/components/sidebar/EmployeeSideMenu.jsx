import React from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegListAlt } from "react-icons/fa";
import { BiDollarCircle } from "react-icons/bi";

import './SideMenu.scss';
import { NavLink } from 'react-router-dom';

function EmployeeSideMenu() {
  const items = [
    {
      name: 'Dashboard',
      icon: <LuLayoutDashboard />,
      path: 'employee/dashboard', 
    },
    {
      name: 'Attendance',
      icon: <FaRegListAlt />,
      path: 'employee/attendance', 
    },
    {
      name: 'payroll',
      icon: <BiDollarCircle />,
      path: 'employee/payroll', 
    }   
   
  ];

  return (
    <div className="side-menu">
      
      <div className="menu-down">
        {items &&
          items.map((item) => (
            <div key={item.path} className="menu-item" onClick={() => handleItemClick(item.path)}>
            <NavLink style={{textDecorationLine:"none"}}
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}

            >
              {item.icon}
              <p>{item.name}</p>
            </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
}

export default EmployeeSideMenu;

