import React from "react";
import "./EmployeeListTable.scss";
import { HiDotsVertical } from "react-icons/hi";
import { format } from "date-fns";

function EmployeeListTable({ user }) {
  return (
    <div className="single-employee-row" key={user.UserID}>
      <div className="employee-name-image">
        <img
          width={40}
          height={40}
          style={{ borderRadius: "50%" }}
          src={user.profileImage}
          alt="user profile"
        />
        <div className="names">
          <p>{user.FirstName}</p>
          <p>{user.LastName}</p>
        </div>
      </div>
      <p>{user.EmployeeID}</p>
      <p>{user.Email}</p>
      <p>{user.JobPostion}</p>
      <p>Active</p>
      <p>{format(user.registeredDate, "MMMM do yyyy")}</p>
      <p>{user.Phone_No}</p>
      <div className="action-icon">
        <HiDotsVertical />
      </div>
    </div>
  );
}

export default EmployeeListTable;
