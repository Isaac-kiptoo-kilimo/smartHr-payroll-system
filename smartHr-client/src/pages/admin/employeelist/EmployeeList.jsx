import React from "react";
import "./EmployeeList.scss";
import SearchForm from "../../../components/shared/SearchForm";
import Button from "../../../components/shared/Button";
import { GrAddCircle } from "react-icons/gr";
import { RiSearchLine } from "react-icons/ri";
import { useGetUsersQuery } from "../../../features/user/userApi";

import EmployeeListTable from "../../../components/employee/EmployeeListTable";

const EmployeeList = () => {
  const { data: users } = useGetUsersQuery();

  if (!users) {
    return <div>Loading...</div>;
  }

  const usersListWithUserRole = users.filter(
    (user) => user.role && user.role.includes("user")
  );

  return (
    <div className="employee-container">
      <div className="employee-list-top">
        <SearchForm placeholder="search..." SearchIcon={<RiSearchLine />} />
        <div className="add-staff">
          <Button imgBtn={<GrAddCircle />} msg="Add Staff" />
        </div>
      </div>
      <div className="employee-table-list">
        <div className="table-head">
          <div className="name-title">
            <h4>Employee</h4>
          </div>
          <div className="employeid-title">
            <h4>EmployeeID</h4>
          </div>
          <div className="email-title">
            <h4>Email</h4>
          </div>
          <div className="job-position-title">
            <h4>Position</h4>
          </div>
          <div className="status-title">
            <h4>Status</h4>
          </div>
          <div className="joining-date-title">
            <h4>Join Date</h4>
          </div>
          <div className="mobile-no-title">
            <h4>Mobile No.</h4>
          </div>
          <div className="action-title">
            <h4>Action</h4>
          </div>
        </div>
        <div className="employee-list-items">
          {usersListWithUserRole &&
            usersListWithUserRole.map((user) => (
              <EmployeeListTable user={user}/>
              
            ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
