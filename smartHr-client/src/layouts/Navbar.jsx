import LogoIcon from "../assets/logo.png";
import Responsive from "../assets/responsive.png";
import ActiveNotification from "../assets/active-notification.png";
import Message from "../assets/message-circle.png";
import SearchForm from "../components/shared/SearchForm";
import "./Navbar.scss";
import Dropdown from "../components/navbar/DropDown";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import Notification from "../components/Notification/Notification";
import { MdNotificationsNone } from "react-icons/md";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { format } from 'date-fns';


const Navbar = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const handleProfile = () => {
    setShowProfile(true);
    navigate("/profile");
    console.log("navigation");
  };
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem("loggedInUser"));
    setUserDetails(storedUserDetails);
    console.log(storedUserDetails.user.Username);

    if (!storedUserDetails || !storedUserDetails.token) {
      navigate("/login");
    }
  }, [navigate]);
  const [isLogoutVisible, setLogoutVisibility] = useState(false);
  const toggleLogout = () => {
    setLogoutVisibility(!isLogoutVisible);
    console.log("Toggle Logout: ", isLogoutVisible);
  };
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };
  const TodayDate=format(new Date(), 'MMMM do yyyy h:mm a')
console.log(TodayDate);
  const handleMessagesClick = () => {
    setShowMessages(true);
    // setShowProfile(true)
    navigate("/messages");
    console.log("navigation");
  };
  return (
    <>
      <div className="navbar">
        <div className="nav-left-items">
        <div className="nav-logo">
          <div className="responsive-icons">
            <img src={Responsive} alt="Responsive" />
          </div>

          <img id="logo" src={LogoIcon} alt="LogoIcon" />
        </div>
        <h3>{TodayDate}</h3>
        <div className="nav-input">
            <SearchForm />
          </div>
        </div>
        
        <div className="right-nav">
          
          <div>
            <div className="nav-icons">
              <BiSolidMessageRoundedDots onClick={handleMessagesClick} url={Message} />
              <div
                className="notification-icon"
                onClick={handleNotificationsClick}
              >
                <MdNotificationsNone url={ActiveNotification} />
                {showNotifications && (
                  <Notification onClose={handleNotificationsClick} />
                )}{" "}
              </div>
              <img
                className="profile"
                onClick={handleProfile}
                width={80}
                src={userDetails.user && userDetails.user.profileImage}
                alt="profile"
              />

              {/* <NavIcon onClick={toggleLogout} url={Chevron}  /> */}
              <div>
                <FaChevronDown onClick={toggleLogout} />
                <h4>{userDetails.user && userDetails.user.role}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLogoutVisible && (
        <div className="logout">
          <Dropdown />
        </div>
      )}
      {/* {showMessages && <Messages />} */}
    </>
  );
};

export default Navbar;
