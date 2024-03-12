import React from "react";
import { createPortal } from "react-dom";
import "./TopProfile.scss";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UpdateUser from "../../features/user/UpdateUser";
const updateUserEl = document.getElementById("edit-post");

const TopProfile = ({ user }) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [editingUserId, setEditingUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem("loggedInUser"));
    setUserDetails(storedUserDetails);
    // console.log(storedUserDetails.user.Username);

    if (!storedUserDetails || !storedUserDetails.token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleEdit = () => {
    // console.log(userDetails.user);
    console.log(userDetails.user.UserID);
    setEditingUserId(userDetails.user.UserID);
    setShowModal(true);
  };

  // const [editingUserId, setEditingUserId] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  // onClick={handleEdit} disabled={editingUserId !== null}

  const closeModal = () => {
    setShowModal(false);
    setEditingUserId(null);
  };

  return (
    <div className="Top">
      <div className="BackGround">
        <div className="blueimage">
          <div className="btn">
            <div>
              <button
                onClick={handleEdit}
                disabled={editingUserId !== null}
                className="profile-btn"
              >
                Edit Profile
              </button>
            </div>
            <div>
              {showModal &&
                createPortal(
                  <UpdateUser user={user} closeModal={closeModal} />,
                  updateUserEl
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-top">
        <div className="profile-img-top">
          <div>
          <img
            className="avatar"
            src={userDetails.user && userDetails.user.profileImage}
            alt="noimage"
          />
          </div>
        </div>
        <div className="head-pro">
          <div className="profile-head-items">
            <h2>Name: </h2>
            <p>
              {userDetails.user && userDetails.user.FirstName}{" "}
              {userDetails.user && userDetails.user.LastName}
            </p>
          </div>
          <div className="profile-head-items">
            <h3>Employee ID: </h3>
            <p>{userDetails.user && userDetails.user.EmployeeID} </p>
          </div>
          <div className="profile-head-items">
            <h3>Position: </h3>
            <p>{userDetails.user && userDetails.user.JobPostion}</p>
          </div>
          <div className="profile-head-items">
            <h3>Email: </h3>
            <p>{userDetails.user && userDetails.user.Email}</p>
          </div>
          <div className="profile-head-items">
            <h3>Address: </h3>
            <p>{userDetails.user && userDetails.user.Address}</p>
          </div>
          <div className="profile-head-items">
            <h3>Mobile No.: </h3>
            <p> {userDetails.user && userDetails.user.Phone_No}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopProfile;
