import logger from "../utils/Logger.js";
import { poolRequest, sql } from "../utils/dbConnect.js";

export const createAdvanceCashService = async (newAdvanceCash) => {
  try {
    const createdAdvanceCash = await poolRequest()
      .input("AdvanceID", sql.VarChar, newAdvanceCash.AdvanceID)
      .input("AdvanceAmount", sql.Decimal, newAdvanceCash.AdvanceAmount)
      .input("UserID", sql.VarChar, newAdvanceCash.UserID)
      .query(
        "INSERT INTO AdvanceCash(AdvanceID, AdvanceAmount,  UserID) VALUES(@AdvanceID, @AdvanceAmount,@UserID)"
      );
    logger.info("New AdvanceCash created", createdAdvanceCash);
    return createdAdvanceCash;
  } catch (error) {
    logger.error("Error while creating AdvanceCash", error);
    return { error: "Failed to create AdvanceCash." };
  }
};

export const updateAdvanceCashService = async (updateAdvanceCash) => {
  try {
    const updatedAdvanceCash = await poolRequest()
       .input("AdvanceID", sql.VarChar, updateAdvanceCash.AdvanceID)
      .input("AdvanceAmount", sql.Decimal, updateAdvanceCash.AdvanceAmount)
      .query(`
        UPDATE AdvanceCash SET UserID = @UserID, AdvanceAmount = @AdvanceAmount WHERE AdvanceID = @AdvanceID
      `);

    logger.info("AdvanceCash updated", updatedAdvanceCash);
    return updatedAdvanceCash;
  } catch (error) {
    logger.error("Error updating AdvanceCash", error);
    return { error: "Failed to update AdvanceCash." };
  }
};

export const getSingleAdvanceCashService = async (AdvanceID) => {
  try {
    const singleAdvanceCash = await poolRequest()
      .input("AdvanceID", sql.VarChar, AdvanceID)
      .query('SELECT * FROM AdvanceCash WHERE AdvanceID = @AdvanceID');
    logger.info("Single AdvanceCash fetched", singleAdvanceCash);
    return singleAdvanceCash;
  } catch (error) {
    logger.error("Error fetching single AdvanceCash", error);
    return { error: "Failed to fetch single AdvanceCash." };
  }
};

export const getAllAdvanceCashService = async () => {
  try {
    const allAdvanceCash = await poolRequest().query("SELECT * FROM AdvanceCash");
    logger.info("All AdvanceCash fetched", allAdvanceCash);
    return allAdvanceCash;
  } catch (error) {
    logger.error("Error fetching all AdvanceCash", error);
    return { error: "Failed to fetch all AdvanceCash." };
  }
};

export const deleteAdvanceCashService = async (AdvanceID) => {
  try {
    const deletedAdvanceCash = await poolRequest()
      .input("AdvanceID", sql.VarChar, AdvanceID)
      .query("DELETE FROM AdvanceCash WHERE AdvanceID = @AdvanceID");
    logger.info("AdvanceCash deleted", deletedAdvanceCash);
    return deletedAdvanceCash;
  } catch (error) {
    logger.error("Error deleting AdvanceCash", error);
    return { error: "Failed to delete AdvanceCash." };
  }
};
