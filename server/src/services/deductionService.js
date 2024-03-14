import logger from "../utils/Logger.js";
import { poolRequest, sql } from "../utils/dbConnect.js";

export const createDeductionService = async (newDeduction) => {
  try {
    const createdDeduction = await poolRequest()
      .input("DeductionID", sql.VarChar, newDeduction.DeductionID)
      .input("Description", sql.VarChar, newDeduction.Description)
      .input("NssfDeduction", sql.Decimal, newDeduction.NssfDeduction)
      .input("NhifDeduction", sql.Decimal, newDeduction.NhifDeduction)
      .input("TaxDeduction", sql.Decimal, newDeduction.TaxDeduction)
      .input("DeductionAmount", sql.Decimal, newDeduction.DeductionAmount)
      .input("UserID", sql.VarChar, newDeduction.UserID)
      .query(
        "INSERT INTO Deduction(DeductionID, Description, NssfDeduction, NhifDeduction, TaxDeduction, DeductionAmount, UserID) VALUES(@DeductionID, @Description, @NssfDeduction, @NhifDeduction, @TaxDeduction, @DeductionAmount, @UserID)"
      );
    logger.info("New Deduction created", createdDeduction);
    return createdDeduction;
  } catch (error) {
    logger.error("Error while creating Deduction", error);
    return { error: "Failed to create Deduction." };
  }
};

export const updateDeductionService = async (updateDeduction) => {
  try {
    const updatedDeduction = await poolRequest()
      .input("DeductionID", sql.VarChar, updateDeduction.DeductionID)
      .input("Description", sql.VarChar, updateDeduction.Description)
      .input("NssfDeduction", sql.Decimal, updateDeduction.NssfDeduction)
      .input("NhifDeduction", sql.Decimal, updateDeduction.NhifDeduction)
      .input("TaxDeduction", sql.Decimal, updateDeduction.TaxDeduction)
      .input("DeductionAmount", sql.Decimal, updateDeduction.DeductionAmount)
      .input("UserID", sql.VarChar, updateDeduction.UserID)
      .query(`
        UPDATE Deduction SET UserID = @UserID, Description = @Description, NssfDeduction = @NssfDeduction, NhifDeduction = @NhifDeduction, TaxDeduction = @TaxDeduction, DeductionAmount = @DeductionAmount WHERE DeductionID = @DeductionID
      `);

    logger.info("Deduction updated", updatedDeduction);
    return updatedDeduction;
  } catch (error) {
    logger.error("Error updating Deduction", error);
    return { error: "Failed to update Deduction." };
  }
};



export const getSingleDeductionService = async (DeductionID) => {
  try {
    const singleDeduction = await poolRequest()
      .input("DeductionID", sql.VarChar, DeductionID)
      .query('SELECT * FROM Deduction WHERE DeductionID = @DeductionID');
    logger.info("Single Deduction fetched", singleDeduction);
    return singleDeduction;
  } catch (error) {
    logger.error("Error fetching single Deduction", error);
    return { error: "Failed to fetch single Deduction." };
  }
};

export const getAllDeductionService = async () => {
  try {
    const allDeduction = await poolRequest().query("SELECT * FROM Deduction");
    logger.info("All Deduction fetched", allDeduction);
    return allDeduction;
  } catch (error) {
    logger.error("Error fetching all Deduction", error);
    return { error: "Failed to fetch all Deduction." };
  }
};

export const deleteDeductionService = async (DeductionID) => {
  try {
    const deletedDeduction = await poolRequest()
      .input("DeductionID", sql.VarChar, DeductionID)
      .query("DELETE FROM Deduction WHERE DeductionID = @DeductionID");
    logger.info("Deduction deleted", deletedDeduction);
    return deletedDeduction;
  } catch (error) {
    logger.error("Error deleting Deduction", error);
    return { error: "Failed to delete Deduction." };
  }
};
