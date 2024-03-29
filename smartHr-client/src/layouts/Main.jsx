//Styling file
import './Main.scss'
import { Route, Routes } from 'react-router-dom';

//Importing layouts
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Messages from '../pages/messages/Messages';
import AdminProfile from '../pages/profile/AdminProfile'
import LoadingApp from '../components/loading/LoadingApp';
import ProgressBar from '../components/loading/ProgressBar';
import { useEffect, useState } from 'react';
import EmployeeDashboard from '../pages/employee/dashboard/EmployeeDashboard';
import AdminDashboard from '../pages/admin/Dashboard/AdminDashboard';
import EmployeeSidebar from './EmployeeSideBar';
import EmployeeList from '../pages/admin/employeelist/EmployeeList';
import AdminViewAttendance from '../pages/admin/attendance/AdminViewAttendance';

const MainContent = () => {
  const storedUser=JSON.parse(localStorage.getItem("loggedInUser"))
  const storedRole=storedUser.user.role
// console.log("storedUser",storedUser.user.role);
const[isLoading,setIsLoading]=useState(true)
const [progress,setProgress]=useState(0)
const [role,setRole]=useState(storedRole)
console.log("role");
useEffect(()=>{

const handleLoading=()=>{
setTimeout(()=>{
  setIsLoading(false)
  setProgress(100)
},2000)

};
handleLoading()
},[])


    return (
    <div>
      { isLoading ? (
        <div>
        <LoadingApp />
        <ProgressBar progress={progress} />
       </div>
      ) : (
        <div className='mainContainer'>
        <div className="navbar">
            <Navbar />
        </div>
          <div className="mainBottom">
            {role=="Admin" ? (<div className="sidebar">
            <Sidebar />
            </div>):(<div className="sidebar">
            <EmployeeSidebar />
            </div>)}
            
            
            <div className="mainPageContent">
           <Routes>
            {/* Admin pages routes */}
         {/* <Route path='/employee/profile' element={ <AdminProfile />}/> */}
         <Route path='/admin/dashboard' element={ <AdminDashboard />}/>
         <Route path='/admin/employee' element={ <EmployeeList />}/>
         <Route path='/admin/attendance' element={ <AdminViewAttendance/>}/>

         {/* Employee pages routes */}
         <Route path='/employee/dashboard' element={ <EmployeeDashboard />}/>
         
         {/* shared pages Routes */}
         <Route path='/profile' element={ <AdminProfile />}/>
         <Route path='/messages' element={<Messages/>}/>
   
           </Routes>
           </div>
             
           </div>
       </div>
  
      )

      }
    </div>
      

    );
}

export default MainContent