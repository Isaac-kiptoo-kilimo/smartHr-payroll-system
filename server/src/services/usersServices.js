import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import logger from "../utils/Logger.js";
import { poolRequest, sql } from "../utils/dbConnect.js";

export const registerUserService = async (newUser) => {
  try {
    const newRegisteredUser = await poolRequest()
      .input("UserID", sql.VarChar, newUser.UserID)
      .input("FirstName", sql.VarChar, newUser.FirstName)
      .input("LastName", sql.VarChar, newUser.LastName)
      .input("Gender", sql.VarChar, newUser.Gender)
      .input("JobPostion", sql.VarChar, newUser.JobPostion)
      .input("Address", sql.VarChar, newUser.Address)
      .input("WorkSchedule", sql.VarChar, newUser.WorkSchedule)
      .input("Department", sql.VarChar, newUser.Department)
      .input("Phone_No", sql.VarChar, newUser.Phone_No)
      .input("Email", sql.VarChar, newUser.Email)
      .input("Password", sql.VarChar, newUser.Password)
      .input("Birth_Date", sql.Date, newUser.Birth_Date)
      .input("EmployeeID", sql.VarChar, newUser.EmployeeID)
      .query(
        "INSERT INTO tbl_user(UserID,FirstName,LastName,Gender,JobPostion,Address,WorkSchedule,Department,Phone_No,Email,Password,Birth_Date,EmployeeID) VALUES(@UserID,@FirstName,@LastName,@Gender,@JobPostion,@Address,@WorkSchedule,@Department,@Phone_No,@Email,@Password,@Birth_Date,@EmployeeID)"
      );
    logger.info("new user service", newRegisteredUser);
    return newRegisteredUser;
  } catch (error) {
    // logger.error("Error while registering", error);
    console.log(error.error);
    console.log(error.message);
    return { error: "Invalid Credentials" };
  }
};


export const authenticateloginUserService = async (user) => {
  try {
    const userFoundResponse = await poolRequest()
      .input("Email", sql.VarChar, user.Email)
      .input("EmployeeID", sql.VarChar, user.EmployeeID)
      .query("SELECT * FROM tbl_user WHERE Email=@Email AND EmployeeID=@EmployeeID");
    if (userFoundResponse.recordset[0]) {
    
      if(await bcrypt.compare(user.Password,userFoundResponse.recordset[0].Password)){

        let token=jwt.sign({
          UserID:userFoundResponse.recordset[0].UserID,
          Password:userFoundResponse.recordset[0].Password,
          Email:userFoundResponse.recordset[0].Email,
          EmployeeID:userFoundResponse.recordset[0].EmployeeID
        },process.env.SECRET_KEY,{ expiresIn: "24h" })
        console.log("Token is",token);
        const {Password,...user}=userFoundResponse.recordset[0]
        return {user,token:`JWT ${token}`}
  
      }else{
        return { error: 'Invalid Credentials' };
      }
    } else {
      return { error: "Invalid Credentials" };
    }
  } catch (error) {
    logger.error("Login Error", error);
    return { error: "Invalid Credentials" };
  }
};


export const updateUserService = async (updateUser) => {
  console.log("update user", updateUser);

  try {
    const updatedUser = await poolRequest()
      .input("UserID", sql.VarChar, updateUser.UserID)
      .input("FirstName", sql.VarChar, updateUser.FirstName)
      .input("LastName", sql.VarChar, updateUser.LastName)
      .input("Gender", sql.VarChar, updateUser.Gender)
      .input("Address", sql.VarChar, updateUser.Address)
      .input("Department", sql.VarChar, updateUser.Department)
      .input("Phone_No", sql.VarChar, updateUser.Phone_No)
      .input("Birth_Date", sql.VarChar, updateUser.Birth_Date)
      .input("profileImage", sql.VarChar, updateUser.profileImage)
      .query(`
        UPDATE tbl_user
        SET FirstName=@FirstName, LastName=@LastName, Gender=@Gender, 
        Department=@Department, Address=@Address, Phone_No=@Phone_No, 
        Birth_Date=@Birth_Date, profileImage=@profileImage
        WHERE userID = @UserID
      `);

    console.log("updated", updateUser);
    return updatedUser;
  } catch (error) {
    console.error("Error updating user", error);
    return { error };
  }
};



export const updatePasswordService = async (updatePassword) => {
  try {
    const updatedPassword = await poolRequest()
      .input("UserID", sql.VarChar, updatePassword.UserID)
      .input("Password", sql.VarChar, updatePassword.Password)
      .query("UPDATE tbl_user SET Password=@Password WHERE UserID=@UserID");
    logger.info("updated password", updatedPassword);
    return updatedPassword;
  } catch (error) {
    console.log("error",error);
    // return { error: "Invalid Credentials" };
  }
};

export const getUserByEmailService = async (Email) => {
  try {
    const getUserByEmail = await poolRequest()
      .input("Email", sql.VarChar, Email)
      .query("SELECT * FROM tbl_user WHERE Email=@email");
    console.log("single user", getUserByEmail.recordset);
    if (getUserByEmail.rowsAffected[0] >= 0) {
      return getUserByEmail.rowsAffected[0];
    }
  } catch (error) {
    return error
  }
};

export const getSingleUserServices=async(UserID)=>{
  const singleUser= await poolRequest()
  .input('UserID', sql.VarChar,UserID)
  .query('SELECT * FROM tbl_user WHERE UserID = @UserID ')
  console.log('single user',singleUser);
  return singleUser
}


export const getAllUsersService = async () => {
  try {
    const allUsers = await poolRequest().query(`SELECT * FROM tbl_user`);
    // const { Password, ...users } = allUsers.recordset;
    // console.log("users", users);
    return allUsers;
  } catch (error) {
    return { error: "Invalid Credentials" };
  }
};



// Fetching delete user
export const deleteUserServices=async(UserID)=>{
  const deletedUser= await poolRequest()
  .input('UserID', sql.VarChar,UserID)
  .query('DELETE FROM tbl_user WHERE UserID = @UserID ')
  console.log(' yeah',deletedUser.recordset);
  return deletedUser.recordset;
}