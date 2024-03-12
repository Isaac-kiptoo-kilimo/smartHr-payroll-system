//Styling file
import './Sidebar.scss'
import SideProfile from '../components/sidebar/SideProfile'
import { RiLogoutCircleLine } from "react-icons/ri";
import EmployeeSideMenu from '../components/sidebar/EmployeeSideMenu';

//import layouts

const EmployeeSidebar = () => {
    
    return(
    <div className='sidebar-column'>
       
       <div className='SideMenu'>
        <EmployeeSideMenu/>
       </div>

       <div className="sidebar-bottom">
       <div className="SideProfile">
        <SideProfile />
       </div>
       <div className="log-out">
       <RiLogoutCircleLine />
        <h4>Logout</h4>
       </div>
       </div>
       
      
    </div>
    )
}
export default EmployeeSidebar;