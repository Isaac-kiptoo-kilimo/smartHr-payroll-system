import logger from "../utils/Logger.js";
import { poolRequest, sql } from "../utils/dbConnect.js";

export const createLeaveService = async (newLeave) => {
  try {
    const createdLeave = await poolRequest()
      .input("LeaveID", sql.VarChar, newLeave.LeaveID)
      .input("LeaveType", sql.Int, newLeave.LeaveType)
      .input("Reason", sql.VarChar, newLeave.Reason) // Assuming Reason is a VARCHAR field
      .input("StartLeaveDate", sql.Date, newLeave.StartLeaveDate)
      .input("EndLeaveDate", sql.Date, newLeave.EndLeaveDate)
      .input("UserID", sql.VarChar, newLeave.UserID)
      .query(
        "INSERT INTO Leave(LeaveID, LeaveType, Reason, StartLeaveDate, EndLeaveDate, UserID) VALUES(@LeaveID, @LeaveType, @Reason, @StartLeaveDate, @EndLeaveDate, @UserID)"
      );
    logger.info("New Leave created", createdLeave);
    return createdLeave;
  } catch (error) {
    logger.error("Error while creating Leave", error);
    return { error: "Failed to create Leave." };
  }
};

export const updateLeaveService = async (updateLeave) => {
  try {
    const updatedLeave = await poolRequest()
      .input("LeaveID", sql.VarChar, updateLeave.LeaveID)
      .input("UserID", sql.VarChar, updateLeave.UserID)
      .input("LeaveType", sql.Int, updateLeave.LeaveType)
      .input("Reason", sql.VarChar, updateLeave.Reason)
      .input("StartLeaveDate", sql.Date, updateLeave.StartLeaveDate)
      .input("EndLeaveDate", sql.Date, updateLeave.EndLeaveDate)
      .query(`
        UPDATE Leave SET LeaveType = @LeaveType, Reason = @Reason, StartLeaveDate = @StartLeaveDate, EndLeaveDate = @EndLeaveDate WHERE LeaveID = @LeaveID AND UserID = @UserID
      `);

    logger.info("Leave updated", updatedLeave);
    return updatedLeave;
  } catch (error) {
    logger.error("Error updating Leave", error);
    return { error: "Failed to update Leave" };
  }
};

export const getSingleLeaveService = async (LeaveID) => {
  try {
    const singleLeave = await poolRequest()
      .input("LeaveID", sql.VarChar, LeaveID)
      .query('SELECT * FROM Leave WHERE LeaveID = @LeaveID');
    logger.info("Single Leave fetched", singleLeave);
    return singleLeave;
  } catch (error) {
    logger.error("Error fetching single Leave", error);
    return { error: "Failed to fetch single Leave" };
  }
};

export const getAllLeaveService = async () => {
  try {
    const allLeave = await poolRequest().query("SELECT * FROM Leave");
    logger.info("All Leave fetched", allLeave);
    return allLeave;
  } catch (error) {
    logger.error("Error fetching all Leave", error);
    return { error: "Failed to fetch all Leave" };
  }
};

export const deleteLeaveService = async (LeaveID) => {
  try {
    const deletedLeave = await poolRequest()
      .input("LeaveID", sql.VarChar, LeaveID)
      .query("DELETE FROM Leave WHERE LeaveID = @LeaveID");
    logger.info("Leave deleted", deletedLeave);
    return deletedLeave;
  } catch (error) {
    logger.error("Error deleting Leave", error);
    return { error: "Failed to delete Leave." };
  }
};
