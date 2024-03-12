// AdminDashboard.jsx
import React from 'react';
import Button from '../../components/shared/Button';
import { GrAddCircle } from 'react-icons/gr';
import './AdminDashboard.scss';
import EmployeeCard from '../../components/dashboard/EmployeeCard';
import { useGetUsersQuery } from '../../features/user/userApi';
import { TbUserSquareRounded } from 'react-icons/tb';
import BarCharts from '../../components/charts/BarCharts';
import { Data } from '../../utils/data'; 
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const AdminDashboard = () => {
  const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const { data: users } = useGetUsersQuery();

  if (!users) {
    return <div>Loading...</div>;
  }

  const usersWithUserRole = users.filter((user) => user.role && user.role.includes('user'));

  return (
    <div className="Dashboard">
      <div className="dashboard-top">
        <h2>
          Hello <span>{storedUser.user.FirstName}</span> Welcome Back!{' '}
        </h2>
        <div className="add-staff">
          <Button imgBtn={<GrAddCircle />} msg="Add Staff" />
        </div>
      </div>
      <div className="total-numbers">
        <EmployeeCard userIcon={<TbUserSquareRounded />} employeeLength={usersWithUserRole.length} txt="Employee(s)" />
        <EmployeeCard userIcon={<TbUserSquareRounded />} employeeLength={usersWithUserRole.length} txt="present" />
        <EmployeeCard userIcon={<TbUserSquareRounded />} employeeLength={usersWithUserRole.length} txt="leave" />
      </div>
      <div className="barcharts">
        <BarCharts chartData={Data} />
      </div>
    </div>
  );
};

export default AdminDashboard;
