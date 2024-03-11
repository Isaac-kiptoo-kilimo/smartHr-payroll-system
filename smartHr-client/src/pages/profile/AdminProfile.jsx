// import stylefile
import './Profile.scss'

//import components
import CompleProfile from '../../components/profile/CompleteProfile'
import TopProfile from '../../components/profile/TopProfile'
import ProfileIntro from '../../components/profile/ProfileIntro'


const AdminProfile = () => {
    return (
      <div className="profileContainer">
        <div className="ProfileContentTop">
        <TopProfile/>
               </div>
        <div className="ProfileContentBottom">
          <div className="ProfileContentBottomLeft">
            <div className="completeProfile">
              <CompleProfile />
            </div>
            <div className="intro">
              <ProfileIntro />
            </div>
         
          </div>
          <div className="ProfileContentBottomRight">
         
          </div>
        </div>
      </div>
    );
}

export default AdminProfile;