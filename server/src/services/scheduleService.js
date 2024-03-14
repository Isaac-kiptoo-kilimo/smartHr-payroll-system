import logger from "../utils/Logger.js";
import { poolRequest, sql } from "../utils/dbConnect.js";

export const createScheduleService = async (newSchedule) => {
  try {
    const createdSchedule = await poolRequest()
      .input("ScheduleID", sql.VarChar, newSchedule.ScheduleID)
      .input("WorkSchedule", sql.VarChar, newSchedule.WorkSchedule)
      .input("StartTime", sql.Time, newSchedule.StartTime)
      .input("EndTime", sql.Time, newSchedule.EndTime)
      .query(
        "INSERT INTO Schedules(ScheduleID, StartTime, EndTime, WorkSchedule) VALUES(@ScheduleID, @StartTime, @EndTime, @WorkSchedule)"
      );
    logger.info("New schedule created", createdSchedule);
    return createdSchedule;
  } catch (error) {
    logger.error("Error while creating schedule", error);
    return { error };
  }
};

export const updateScheduleService = async (updateSchedule) => {
  try {
    const updatedSchedule = await poolRequest()
      .input("ScheduleID", sql.VarChar, updateSchedule.ScheduleID)
      .input("WorkSchedule", sql.VarChar, updateSchedule.WorkSchedule)
      .input("StartTime", sql.Time, updateSchedule.StartTime)
      .input("EndTime", sql.Time, updateSchedule.EndTime)
      .query(`
        UPDATE Schedules
        SET WorkSchedule = @WorkSchedule, StartTime = @StartTime, EndTime = @EndTime
        WHERE ScheduleID = @ScheduleID
      `);

    logger.info("Schedule updated", updatedSchedule);
    return updatedSchedule;
  } catch (error) {
    logger.error("Error updating schedule", error);
    return { error };
  }
};

export const getSingleScheduleService = async (ScheduleID) => {
  try {
    const singleSchedule = await poolRequest()
      .input("ScheduleID", sql.VarChar, ScheduleID)
      .query('SELECT * FROM Schedules WHERE ScheduleID = @ScheduleID');
    logger.info("Single schedule fetched", singleSchedule);
    return singleSchedule;
  } catch (error) {
    logger.error("Error while fetching single schedule", error);
    return { error };
  }
};

export const getAllScheduleService = async () => {
  try {
    const allSchedules = await poolRequest().query("SELECT * FROM Schedules");
    logger.info("All schedules fetched", allSchedules);
    return allSchedules;
  } catch (error) {
    logger.error("Error while fetching all schedules", error);
    return { error };
  }
};

export const deleteScheduleService = async (ScheduleID) => {
  try {
    const deletedSchedule = await poolRequest()
      .input("ScheduleID", sql.VarChar, ScheduleID)
      .query("DELETE FROM Schedules WHERE ScheduleID = @ScheduleID");
    logger.info("Schedule deleted", deletedSchedule);
    return deletedSchedule;
  } catch (error) {
    logger.error("Error while deleting schedule", error);
    return { error };
  }
};