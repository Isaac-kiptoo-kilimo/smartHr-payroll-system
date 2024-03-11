//Styling file
import './Sidebar.scss'
import SideProfile from '../components/SideProfile'
import SideMenu from '../components/SideMenu'
import { RiLogoutCircleLine } from "react-icons/ri";

//import layouts

const Sidebar = () => {
    
    return(
    <div className='sidebar-column'>
       
       <div className='SideMenu'>
        <SideMenu/>
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
export default Sidebar