import logger from "../utils/Logger.js";
import { poolRequest, sql } from "../utils/dbConnect.js";

export const createAllowanceService = async (newAllowance) => {
  try {
    const createdAllowance = await poolRequest()
      .input("AllowanceID", sql.VarChar, newAllowance.AllowanceID)
      .input("HomeAllowance", sql.Decimal, newAllowance.HomeAllowance)
      .input("CommuterAllowance", sql.Decimal, newAllowance.CommuterAllowance)
      .input("MedicalAllowance", sql.Decimal, newAllowance.MedicalAllowance)
      .input("UserID", sql.VarChar, newAllowance.UserID)
      .query(
        "INSERT INTO Allowance(AllowanceID, HomeAllowance, CommuterAllowance, MedicalAllowance, UserID) VALUES(@AllowanceID, @HomeAllowance, @CommuterAllowance, @MedicalAllowance, @UserID)"
      );
    logger.info("New Allowance created", createdAllowance);
    return createdAllowance;
  } catch (error) {
    logger.error("Error while creating Allowance", error);
    return { error: "Failed to create Allowance." };
  }
};

export const updateAllowanceService = async (updateAllowance) => {
  try {
    const updatedAllowance = await poolRequest()
      .input("AllowanceID", sql.VarChar, updateAllowance.AllowanceID)
      .input("UserID", sql.VarChar, updateAllowance.UserID)
      .input("HomeAllowance", sql.Decimal, updateAllowance.HomeAllowance)
      .input("CommuterAllowance", sql.Decimal, updateAllowance.CommuterAllowance)
      .input("MedicalAllowance", sql.Decimal, updateAllowance.MedicalAllowance)
      .query(`
        UPDATE Allowance SET UserID = @UserID, HomeAllowance = @HomeAllowance, CommuterAllowance = @CommuterAllowance, MedicalAllowance = @MedicalAllowance WHERE AllowanceID = @AllowanceID
      `);

    logger.info("Allowance updated", updatedAllowance);
    return updatedAllowance;
  } catch (error) {
    logger.error("Error updating Allowance", error);
    return { error: "Failed to update Allowance." };
  }
};

export const getSingleAllowanceService = async (AllowanceID) => {
  try {
    const singleAllowance = await poolRequest()
      .input("AllowanceID", sql.VarChar, AllowanceID)
      .query('SELECT * FROM Allowance WHERE AllowanceID = @AllowanceID');
    logger.info("Single Allowance fetched", singleAllowance);
    return singleAllowance;
  } catch (error) {
    logger.error("Error fetching single Allowance", error);
    return { error: "Failed to fetch single Allowance." };
  }
};

export const getAllAllowanceService = async () => {
  try {
    const allAllowance = await poolRequest().query("SELECT * FROM Allowance");
    logger.info("All Allowance fetched", allAllowance);
    return allAllowance;
  } catch (error) {
    logger.error("Error fetching all Allowance", error);
    return { error: "Failed to fetch all Allowance." };
  }
};

export const deleteAllowanceService = async (AllowanceID) => {
  try {
    const deletedAllowance = await poolRequest()
      .input("AllowanceID", sql.VarChar, AllowanceID)
      .query("DELETE FROM Allowance WHERE AllowanceID = @AllowanceID");
    logger.info("Allowance deleted", deletedAllowance);
    return deletedAllowance;
  } catch (error) {
    logger.error("Error deleting Allowance", error);
    return { error: "Failed to delete Allowance." };
  }
};
