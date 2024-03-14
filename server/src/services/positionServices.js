import logger from "../utils/Logger.js";
import { poolRequest, sql } from "../utils/dbConnect.js";

export const createPositionService = async (newPosition) => {
  try {
    const createdPosition = await poolRequest()
      .input("PositionID", sql.VarChar, newPosition.PositionID)
      .input("JobPostion", sql.VarChar, newPosition.JobPostion)
      .query(
        "INSERT INTO Position(PositionID, JobPostion) VALUES(@PositionID, @JobPostion)"
      );
    logger.info("New position created", createdPosition);
    return createdPosition;
  } catch (error) {
    logger.error("Error while creating the position", error);
    return { error };
  }
};

export const updatePositionService = async (updatePosition) => {
  try {
    const updatedPosition = await poolRequest()
      .input("PositionID", sql.VarChar, updatePosition.PositionID)
      .input("JobPostion", sql.VarChar, updatePosition.JobPostion)
      .query(`
        UPDATE Position SET JobPostion = @JobPostion WHERE PositionID = @PositionID
      `);

    logger.info("Position updated", updatedPosition);
    return updatedPosition;
  } catch (error) {
    logger.error("Error updating position", error);
    return { error };
  }
};

export const getSinglePositionService = async (PositionID) => {
  try {
    const singlePosition = await poolRequest()
      .input("PositionID", sql.VarChar, PositionID)
      .query('SELECT * FROM Position WHERE PositionID = @PositionID');
    logger.info("Single position fetched", singlePosition);
    return singlePosition;
  } catch (error) {
    logger.error("Error while fetching single position", error);
    return { error };
  }
};

export const getAllPositionService = async () => {
  try {
    const allPositions = await poolRequest().query("SELECT * FROM Position");
    logger.info("All positions fetched", allPositions);
    return allPositions;
  } catch (error) {
    logger.error("Error while fetching all positions", error);
    return { error };
  }
};

export const deletePositionService = async (PositionID) => {
  try {
    const deletedPosition = await poolRequest()
      .input("PositionID", sql.VarChar, PositionID)
      .query("DELETE FROM Position WHERE PositionID = @PositionID");
    logger.info("Position deleted", deletedPosition);
    return deletedPosition;
  } catch (error) {
    logger.error("Error while deleting position", error);
    return { error };
  }
};
