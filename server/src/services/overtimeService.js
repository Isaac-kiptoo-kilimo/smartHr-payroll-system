import logger from "../utils/Logger.js";
import { poolRequest, sql } from "../utils/dbConnect.js";

export const createOvertimeService = async (newOvertime) => {
  try {
    const createdOvertime = await poolRequest()
      .input("OvertimeID", sql.VarChar, newOvertime.OvertimeID)
      .input("OvertimeHours", sql.Int, newOvertime.OvertimeHours)
      .input("Rate", sql.Decimal, newOvertime.Rate)
      .input("UserID", sql.VarChar, newOvertime.UserID)
      .query(
        "INSERT INTO Overtime(OvertimeID, OvertimeHours, Rate, UserID) VALUES(@OvertimeID, @OvertimeHours, @Rate, @UserID)"
      );
    logger.info("New Overtime created", createdOvertime);
    return createdOvertime;
  } catch (error) {
    logger.error("Error while creating Overtime", error);
    return { error: "Failed to create overtime." };
  }
};

export const updateOvertimeService = async (updateOvertime) => {
  try {
    const updatedOvertime = await poolRequest()
      .input("OvertimeID", sql.VarChar, updateOvertime.OvertimeID)
      .input("UserID", sql.VarChar, updateOvertime.UserID)
      .input("OvertimeHours", sql.Int, updateOvertime.OvertimeHours)
      .input("Rate", sql.Decimal, updateOvertime.Rate)
      .query(`
        UPDATE Overtime
        SET UserID = @UserID, OvertimeHours = @OvertimeHours, Rate = @Rate
        WHERE OvertimeID = @OvertimeID
      `);

    logger.info("Overtime updated", updatedOvertime);
    return updatedOvertime;
  } catch (error) {
    logger.error("Error updating Overtime", error);
    return { error: "Failed to update overtime." };
  }
};

export const getSingleOvertimeService = async (OvertimeID) => {
  try {
    const singleOvertime = await poolRequest()
      .input("OvertimeID", sql.VarChar, OvertimeID)
      .query('SELECT * FROM Overtime WHERE OvertimeID = @OvertimeID');
    logger.info("Single Overtime fetched", singleOvertime);
    return singleOvertime;
  } catch (error) {
    logger.error("Error fetching single Overtime", error);
    return { error: "Failed to fetch single overtime." };
  }
};

export const getAllOvertimeService = async () => {
  try {
    const allOvertime = await poolRequest().query("SELECT * FROM Overtime");
    logger.info("All Overtime fetched", allOvertime);
    return allOvertime;
  } catch (error) {
    logger.error("Error fetching all Overtime", error);
    return { error: "Failed to fetch all overtime." };
  }
};

export const deleteOvertimeService = async (OvertimeID) => {
  try {
    const deletedOvertime = await poolRequest()
      .input("OvertimeID", sql.VarChar, OvertimeID)
      .query("DELETE FROM Overtime WHERE OvertimeID = @OvertimeID");
    logger.info("Overtime deleted", deletedOvertime);
    return deletedOvertime;
  } catch (error) {
    logger.error("Error deleting Overtime", error);
    return { error: "Failed to delete overtime." };
  }
};
