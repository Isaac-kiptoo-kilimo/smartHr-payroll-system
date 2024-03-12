import React from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegListAlt } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { BiDollarCircle } from "react-icons/bi";

import './SideMenu.scss';
import { NavLink } from 'react-router-dom';

function SideMenu() {
  const items = [
    {
      name: 'Dashboard',
      icon: <LuLayoutDashboard />,
      path: 'admin/dashboard', 
    },
    {
      name: 'Employees',
      icon: <LuUsers />,
      path: 'admin/employee', 
    },
    {
      name: 'Attendance',
      icon: <FaRegListAlt />,
      path: 'admin/attendance', 
    },
    {
      name: 'payroll',
      icon: <BiDollarCircle />,
      path: 'admin/payroll', 
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

export default SideMenu;

