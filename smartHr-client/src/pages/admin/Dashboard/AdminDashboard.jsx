// AdminDashboard.jsx
import React, { useState } from 'react';
import Button from '../../../components/shared/Button';
import { GrAddCircle } from 'react-icons/gr';
import './AdminDashboard.scss';
import EmployeeCard from '../../../components/dashboard/EmployeeCard';
import { useGetUsersQuery } from '../../../features/user/userApi';
import { TbUserSquareRounded } from 'react-icons/tb';
import BarCharts from '../../../components/charts/BarCharts';
import { Data } from '../../../utils/data'; 
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { createPortal } from 'react-dom';
import AddStaff from '../../../features/user/register/AddStaff';

Chart.register(CategoryScale);

const AdminDashboard = () => {
  const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const [showModal, setShowModal] = useState(false);

  const { data: users } = useGetUsersQuery();

  if (!users) {
    return <div>Loading...</div>;
  }

  const usersWithUserRole = users.filter((user) => user.role && user.role.includes('user'));

  return (
  <>
    <div className="Dashboard">
      <div className="dashboard-top">
        <h2>
          Hello <span>{storedUser.user.FirstName}</span> Welcome Back!{' '}
        </h2>
        <div className="add-staff">
          <Button onClick={() => setShowModal(true)} imgBtn={<GrAddCircle />} msg="Add Staff" />
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
      <div className="modal-container">
      {
        showModal && createPortal(
          <AddStaff setShowModal={setShowModal}  />,
          document.body
        )
      }
    </div>
  </>
  );
};

export default AdminDashboard;
