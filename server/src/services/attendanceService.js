import logger from "../utils/Logger.js";
import { poolRequest, sql } from "../utils/dbConnect.js";

export const createAttendanceService = async (newAttendance) => {
  try {
    const createdAttendance = await poolRequest()
      .input("AttendanceID", sql.VarChar, newAttendance.AttendanceID)
      .input("TimeIn", sql.Time, newAttendance.TimeIn)
      .input("TimeOut", sql.Time, newAttendance.TimeOut)
      .query(
        "INSERT INTO Attendance(AttendanceID, TimeIn, TimeOut) VALUES(@AttendanceID, @TimeIn, @TimeOut)"
      );
    logger.info("New attendance created", createdAttendance);
    return createdAttendance;
  } catch (error) {
    logger.error("Error while creating attendance", error);
    return { error: "Failed to create attendance." };
  }
};

export const updateAttendanceService = async (updateAttendance) => {
  try {
    const updatedAttendance = await poolRequest()
      .input("AttendanceID", sql.VarChar, updateAttendance.AttendanceID)
      .input("TimeIn", sql.Time, updateAttendance.TimeIn)
      .input("TimeOut", sql.Time, updateAttendance.TimeOut)
      .query(`
        UPDATE Attendance SET TimeIn = @TimeIn, TimeOut = @TimeOut WHERE AttendanceID = @AttendanceID
      `);

    logger.info("Attendance updated", updatedAttendance);
    return updatedAttendance;
  } catch (error) {
    logger.error("Error updating attendance", error);
    return { error: "Failed to update attendance." };
  }
};

export const getSingleAttendanceService = async (AttendanceID) => {
  try {
    const singleAttendance = await poolRequest()
      .input("AttendanceID", sql.VarChar, AttendanceID)
      .query('SELECT * FROM Attendance WHERE AttendanceID = @AttendanceID');
    logger.info("Single attendance fetched", singleAttendance);
    return singleAttendance;
  } catch (error) {
    logger.error("Error fetching single attendance", error);
    return { error: "Failed to fetch single attendance." };
  }
};

export const getAllAttendanceService = async () => {
  try {
    const allAttendance = await poolRequest().query("SELECT * FROM Attendance");
    logger.info("All attendance fetched", allAttendance);
    return allAttendance;
  } catch (error) {
    logger.error("Error fetching all attendance", error);
    return { error: "Failed to fetch all attendance." };
  }
};

export const deleteAttendanceService = async (AttendanceID) => {
  try {
    const deletedAttendance = await poolRequest()
      .input("AttendanceID", sql.VarChar, AttendanceID)
      .query("DELETE FROM Attendance WHERE AttendanceID = @AttendanceID");
    logger.info("Attendance deleted", deletedAttendance);
    return deletedAttendance;
  } catch (error) {
    logger.error("Error deleting attendance", error);
    return { error: "Failed to delete attendance." };
  }
};
