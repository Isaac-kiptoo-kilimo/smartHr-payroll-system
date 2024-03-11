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
import EmployeeDashboard from '../pages/Dashboard/EmployeeDashboard';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';

const MainContent = () => {
const[isLoading,setIsLoading]=useState(true)
const [progress,setProgress]=useState(0)

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
            <div className="sidebar">
            <Sidebar />
            </div>
            <div className="mainPageContent">
           <Routes>
         <Route path='/admin/profile' element={ <AdminProfile />}/>
         <Route path='/employee/profile' element={ <AdminProfile />}/>
         <Route path='/admin/dashboard' element={ <AdminDashboard />}/>
         <Route path='/employee/dashboard' element={ <EmployeeDashboard />}/>
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