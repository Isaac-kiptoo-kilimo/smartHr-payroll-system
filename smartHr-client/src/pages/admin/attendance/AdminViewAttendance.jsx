import React from 'react'
import "./AdminViewAttendance.scss";
import SearchForm from "../../../components/shared/SearchForm";
import Button from "../../../components/shared/Button";
import { GrAddCircle } from "react-icons/gr";
import { RiSearchLine } from "react-icons/ri";
import { useGetUsersQuery } from "../../../features/user/userApi";
import EmployeeAttendance from '../../../components/attendance/EmployeeAttendance';


const AdminViewAttendance = () => {
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
       
      </div>
      <div className="employee-table-list">
        <div className="table-head">
          <div className="name-title">
            <h4>Employee</h4>
          </div>
          <div className="employeid-title">
            <h4>EmployeeID</h4>
          </div>
          <div className="today-title">
            <h4>Date</h4>
          </div>
          <div className="punch-in-title">
            <h4>Punch In</h4>
          </div>
          <div className="punch-out-title">
            <h4>Punch Out</h4>
          </div>
          <div className="production-title">
            <h4>Production</h4>
          </div>
          
          <div className="overtime-title">
            <h4>Overtime</h4>
          </div>
        </div>
        <div className="employee-list-items">
          {usersListWithUserRole &&
            usersListWithUserRole.map((user) => (
              <EmployeeAttendance user={user}/>
              
            ))}
        </div>
      </div>
    </div>
  )
}

export default AdminViewAttendance
