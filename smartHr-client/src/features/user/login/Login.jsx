// Login.jsx
import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import SocialMedia1 from '../../../assets/social-media1.jpg';
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useAuthenticateUserMutation } from "../userApi";
import {
  ErrorToast,
  ToasterContainer,
  SuccessToast,
} from "../../../toaster/Toaster";
import { toast } from "sonner";
import loginImage from "../../../assets/login-img.png";
import Logo from "../../../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  const [authenticateUser] = useAuthenticateUserMutation();

  const schema = yup.object().shape({
    Email: yup.string().email().required("Email is required"),
    EmployeeID: yup.string().required("Employee ID is required"),
    Password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/,
        "Must Contain 4 Chars, 1 Uppercase, 1 Lowercase, 1 Number & 1 special Char"
      ),
  });

  // useEffect(() => {
  //   const userDetails = JSON.parse(localStorage.getItem('userDetails')) || [];
  //   setStoredUser(userDetails);
  // }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const loginUser = async (data) => {
    try {
      const response = await authenticateUser({
        Email: data.Email,
        EmployeeID: data.EmployeeID,
        Password: data.Password,
      });

      console.log(response.data.user);
      console.log(response.data.user.token);

      if (response.data && response.data.user.token) {
        console.log("User logged in:", response);

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(response.data.user)
        );
        SuccessToast(response.data.message);

        setLoginError("");
        // setLoginSuccess("Logged In successfully!");

        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        setLoginSuccess("");
        console.log(response.data);
        ErrorToast(response.data.error);

        // setLoginError("Invalid email or password");
      }
    } catch (error) {
      toast.error("Check Your login Details");
      // ErrorToast(response.data.error);

      // setLoginSuccess("");
      // setLoginError("Invalid email or password");
    }
  };
  return (
    <div className="container">
      <div className="image-login">
        <div className="img-login">
          <h2>GET YOUR PAYSLIP IN MINUTES</h2>
          <img src={loginImage} alt="" />
        </div>
      </div>
      <div className="row">
        <div className="col align-items-center flex-col ">
          <div className="form-wrapper">
            <h2>WELCOME TO SMARTHR</h2>
            <form className="form sign-in" onSubmit={handleSubmit(loginUser)}>
              <div className="form-before">

              </div>
              <h2>Login</h2>
              <div className="logo-img">
              <img src={Logo} alt="" />
              </div>
              <div>
                <ToasterContainer />
                {loginError && <p className="error-message">{loginError}</p>}
              </div>
              <div>
                {loginSuccess && (
                  <p className="success-message">{loginSuccess}</p>
                )}
              </div>
              <div>
                <div className="input-group">
                  <div className="bx bxs-user">
                    <MdEmail />
                  </div>
                  <input
                    type="email"
                    id="Email"
                    name="Email"
                    {...register("Email")}
                    placeholder="Email"
                  />
                </div>
                <p className="errors">{errors.Email?.message}</p>
              </div>
              <div>
                <div className="input-group">
                  <div className="bx bxs-user">
                    <MdEmail />
                  </div>
                  <input
                    type="text"
                    id="EmployeeID"
                    name="EmployeeID"
                    {...register("EmployeeID")}
                    placeholder="Employee ID"
                  />
                </div>
                <p className="errors">{errors.EmployeeID?.message}</p>
              </div>
              <div>
                <div className="input-group">
                  <div className="bx bxs-user">
                    <RiLockPasswordLine />
                  </div>
                  <input
                    type="password"
                    id="Password"
                    name="Password"
                    {...register("Password")}
                    placeholder="Password"
                  />
                </div>
                <p className="errors">{errors.Password?.message}</p>
              </div>
              <p className="forgot-password">
                <b>Forgot password?</b>
              </p>
              <button className="signin-btn">Sign in</button>
              <div className="form-after">
                
              </div>
            </form>
          </div>
      
        </div>
      </div>
    </div>
  );
};

export default Login;
