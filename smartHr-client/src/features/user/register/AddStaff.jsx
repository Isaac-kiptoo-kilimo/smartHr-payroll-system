// SignUp.jsx
import React, { useEffect, useState } from "react";
import "./AddStaff.scss";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAddUserMutation } from "../userApi";
import { ToasterContainer, SuccessToast } from "../../../toaster/Toaster";
import { LoadingToast } from "../../../toaster/Toaster";
import { FaRegWindowClose } from "react-icons/fa";

const AddStaff = ({ setShowModal }) => {
  const [navToLogin, setNavToLogin] = useState("/signup");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [addUser] = useAddUserMutation();

  const schema = yup.object().shape({
    FirstName: yup.string().required("FirstName is required"),
    LastName: yup.string().required("LastName is required"),
    Gender: yup.string().required("Gender is required"),
    Address: yup.string().required("Address is required"),
    WorkSchedule: yup.string().required("WorkSchedule is required"),
    Department: yup.string().required("Department is required"),
    Email: yup.string().email().required("Email is required"),
    Password: yup
      .string()
      .required("password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/,
        "Must Contain 4 Chars, 1 Uppercase, 1 Lowercase, 1 Number & 1 special Char"
      ),
    Birth_Date: yup.string().required("Sate of birth is required"),
    Phone_No: yup.string().required("Phone Number is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const loginNavigation = () => {
    setNavToLogin(navToLogin);
    navigate("/");
  };

  const onSubmit = async (formData) => {
    LoadingToast();
    try {
      const response = await addUser({
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        Gender: formData.Gender,
        JobPostion: formData.JobPostion,
        Address: formData.Address,
        WorkSchedule: formData.WorkSchedule,
        Department: formData.Department,
        Email: formData.Email,
        Password: formData.Password,
        Birth_Date: formData.Birth_Date,
        Phone_No: formData.Phone_No,
      });

      console.log("User registered:", response);

      if (response.data && response.data.message) {
        SuccessToast(response.data.message);
        // setSuccessMessage(response.data.message);
        // setErrorMessage('');
        reset();

        setTimeout(() => {
          setShowModal(false);
        }, 2000);
      } else {
        // 5319983
        // ErrorToast(response.data.error);
        setErrorMessage("Registration failed. Please try again.");
        // setSuccessMessage('');
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // ErrorToast(response.data.error);
      setErrorMessage("Registration failed. Please try again.");
      // setSuccessMessage('');
    }
    LoadingToast(false);
  };
  const handleClose = () => {
    reset();
    setShowModal(false);
  };

  return (
    <div className="modal">
      <div className="add-staff-row">
        <div className="add-staff">
          <div className="form-wrapper">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <ToasterContainer />
              <div className="form-titles">
                <div className="heading">
                  <h3>Add Employee</h3>
                  <div className="close-icon">
                    <FaRegWindowClose onClick={handleClose} />
                  </div>
                </div>

                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </div>
              {/* <div>
                {successMessage && (
                  <p className="success-message">{successMessage}</p>
                )}
              </div> */}
              <div className="staff-inputs">
                <div className="input-group">
                  <input
                    type="text"
                    name="FirstName"
                    id="FirstName"
                    {...register("FirstName")}
                    placeholder="FirstName"
                  />
                </div>
                <p className="errors">{errors.FirstName?.message}</p>

                <div className="input-group">
                  <input
                    type="text"
                    name="LastName"
                    id="LastName"
                    {...register("LastName")}
                    placeholder="LastName"
                  />
                </div>
                <p className="errors">{errors.LastName?.message}</p>
              </div>
              <div className="staff-inputs">
                <div className="input-group">
                  <select name="Gender" id="Gender" {...register("Gender")}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <p className="errors">{errors.Gender?.message}</p>
                <div className="input-group">
                <select
                    name="JobPostion"
                    id="JobPostion"
                    {...register("JobPostion")}
                  >
                    <option value="">Select Job Position</option>
                    <option value="Developer">Developer</option>
                    <option value="QA/QEy">QA/QE</option>
                    <option value="IT support admin">IT support admin</option>
                    <option value="HR">HR</option>
                  </select>
                  
                </div>

                <p className="errors">{errors.JobPostion?.message}</p>
              </div>
              <div className="staff-inputs">
                <div className="input-group">
                  <input
                    type="text"
                    name="Address"
                    id="Address"
                    {...register("Address")}
                    placeholder="Address"
                  />
                </div>
                <p className="errors">{errors.Address?.message}</p>

                <div className="input-group">
                  <select
                    name="WorkSchedule"
                    id="WorkSchedule"
                    {...register("WorkSchedule")}
                  >
                    <option value="">Select Work Schedule</option>
                    <option value="night">Night</option>
                    <option value="day">Day</option>
                    <option value="swing">swing</option>
                  </select>
                </div>
                <p className="errors">{errors.WorkSchedule?.message}</p>
              </div>
              <div className="staff-inputs">
              <div className="input-group">
                <select
                  name="Department"
                  id="Department"
                  {...register("Department")}
                >
                  <option value="">Select Department</option>
                  <option value="Web Development">Web Development</option>
                  <option value="QA/QE">QA/QE</option>
                  <option value="Automation">Automation</option>
                </select>
                </div>
                <p className="errors">{errors.Department?.message}</p>
                <div className="input-group">
                  <input
                    type="email"
                    name="Email"
                    id="Email"
                    {...register("Email")}
                    placeholder="Email"
                  />
                </div>
                <p className="errors">{errors.Email?.message}</p>
              </div>
              <div className="staff-inputs">
                <div className="input-group">
                  <input
                    type="password"
                    id="Password"
                    name="Password"
                    {...register("Password")}
                    placeholder="Password"
                  />
                </div>
                <p className="errors">{errors.Password?.message}</p>

                <div className="input-group">
                  <input
                    type="date"
                    {...register("Birth_Date")}
                    id="Birth_Date"
                    name="Birth_Date"
                    placeholder="Date of Birth"
                  />
                </div>
                <p className="errors">{errors.Birth_Date?.message}</p>
              </div>
              <div className="staff-inputs">
                <div className="input-group">
                  <input
                    type="text"
                    {...register("Phone_No")}
                    id="Phone_No"
                    name="Phone_No"
                    placeholder="mobile number"
                  />
                </div>
                <p className="errors">{errors.Phone_No?.message}</p>
                <div className="input-group"></div>
              </div>
              <div className="btn-staff">
                <button className="signup-btn" type="submit">
                  Add staff
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
