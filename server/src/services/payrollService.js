import logger from "../utils/Logger.js";
import { poolRequest, sql } from "../utils/dbConnect.js";

export const createPayrollService = async (newPayroll) => {
  try {
    const createdPayroll = await poolRequest()
      .input("PayrollID", sql.VarChar, newPayroll.PayrollID)
      .input("NetSalary", sql.Decimal, newPayroll.NetSalary)
      .input("GrossIncome", sql.Decimal, newPayroll.GrossIncome)
      .input("DeductionsTotal", sql.Decimal, newPayroll.DeductionsTotal)
      .input("CashAdvanceTotal", sql.Decimal, newPayroll.CashAdvanceTotal)
      .input("AllowanceTotal", sql.Decimal, newPayroll.AllowanceTotal)
      .input("UserID", sql.VarChar, newPayroll.UserID)
      .query(
        "INSERT INTO Payroll(PayrollID, GrossIncome, DeductionsTotal, CashAdvanceTotal, AllowanceTotal, NetSalary, UserID) VALUES(@PayrollID, @GrossIncome, @DeductionsTotal, @CashAdvanceTotal, @AllowanceTotal, @NetSalary, @UserID)"
      );
    logger.info("New Payroll created", createdPayroll);
    return createdPayroll;
  } catch (error) {
    logger.error("Error while creating Payroll", error);
    return { error: "Failed to create Payroll." };
  }
}; 

export const updatePayrollService = async (updatePayroll) => {
  try {
    const updatedPayroll = await poolRequest()
      .input("PayrollID", sql.VarChar, updatePayroll.PayrollID)
      .input("NetSalary", sql.Decimal, updatePayroll.NetSalary)
      .input("GrossIncome", sql.Decimal, updatePayroll.GrossIncome)
      .input("DeductionsTotal", sql.Decimal, updatePayroll.DeductionsTotal)
      .input("CashAdvanceTotal", sql.Decimal, updatePayroll.CashAdvanceTotal)
      .input("AllowanceTotal", sql.Decimal, updatePayroll.AllowanceTotal)
      .input("UserID", sql.VarChar, updatePayroll.UserID)
      .query(`
        UPDATE Payroll SET UserID = @UserID, NetSalary = @NetSalary, GrossIncome = @GrossIncome, DeductionsTotal = @DeductionsTotal, CashAdvanceTotal = @CashAdvanceTotal, AllowanceTotal = @AllowanceTotal WHERE PayrollID = @PayrollID
      `);

    logger.info("Payroll updated", updatedPayroll);
    return updatedPayroll;
  } catch (error) {
    logger.error("Error updating Payroll", error);
    return { error: "Failed to update Payroll." };
  }
};



export const getSinglePayrollService = async (PayrollID) => {
  try {
    const singlePayroll = await poolRequest()
      .input("PayrollID", sql.VarChar, PayrollID)
      .query('SELECT * FROM Payroll WHERE PayrollID = @PayrollID');
    logger.info("Single Payroll fetched", singlePayroll);
    return singlePayroll;
  } catch (error) {
    logger.error("Error fetching single Payroll", error);
    return { error: "Failed to fetch single Payroll." };
  }
};

export const getAllPayrollService = async () => {
  try {
    const allPayroll = await poolRequest().query("SELECT * FROM Payroll");
    logger.info("All Payroll fetched", allPayroll);
    return allPayroll;
  } catch (error) {
    logger.error("Error fetching all Payroll", error);
    return { error: "Failed to fetch all Payroll." };
  }
};

export const deletePayrollService = async (PayrollID) => {
  try {
    const deletedPayroll = await poolRequest()
      .input("PayrollID", sql.VarChar, PayrollID)
      .query("DELETE FROM Payroll WHERE PayrollID = @PayrollID");
    logger.info("Payroll deleted", deletedPayroll);
    return deletedPayroll;
  } catch (error) {
    logger.error("Error deleting Payroll", error);
    return { error: "Failed to delete Payroll" };
  }
};
