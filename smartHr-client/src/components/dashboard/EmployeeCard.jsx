import React from "react";
import './EmployeeCard.scss'

const EmployeeCard = ({employeeLength,txt,userIcon}) => {
  
  return (
    <div className="total-employees">
      <div className="employee-icons">
        {userIcon}
      </div>
      <div className="total-items">
        <span >{employeeLength}</span>
        <p>{txt}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
