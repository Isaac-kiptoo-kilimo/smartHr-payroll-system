// BarCharts.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Data } from '../../utils/data';
import './Barcharts.scss'
const BarCharts = () => {
  const chartData = {
    labels: Data.map((entry) => entry.month),
    datasets: [
      {
        label: 'attendance',
        data: Data.map((entry) => entry.attendance),
        backgroundColor: '#fd7556',
        borderWidth: 1,
        borderRadius: "10px"
        
      },
      {
        label: 'Absent',
        data: Data.map((entry) => entry.absent),
        backgroundColor: '#34444c', 
        borderWidth: 1,
      },
      
    ],
  };

  return (
    <div className="chart-container">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Monthly Employee Attendance statistics',
            },
            legend: {
              display: true,
            },
          },
        }}
      />
    </div>
  );
};

export default BarCharts;
