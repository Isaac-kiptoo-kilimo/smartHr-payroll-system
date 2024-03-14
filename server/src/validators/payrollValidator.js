
import joi from 'joi';

export const createPayrollValidation = (payroll) => {
  const createPayrollSchema = joi.object({ 
    GrossIncome: joi.Decimal().required(),
    DeductionsTotal: joi.Decimal().required(),
    CashAdvanceTotal: joi.Decimal().required(),
    AllowanceTotal: joi.Decimal().required(),
    NetSalary: joi.Decimal().required()
    });
    
  return createPayrollSchema.validate(payroll);
};




export  const updateAllowanceValidator=(updatedAllowance)=>{
  const updateAllowanceValidatorSchema=joi.object({
    GrossIncome: joi.Decimal().required(),
    DeductionsTotal: joi.Decimal().required(),
    CashAdvanceTotal: joi.Decimal().required(),
    AllowanceTotal: joi.Decimal().required(),
    NetSalary: joi.Decimal().required()
  })
   
  return updateAllowanceValidatorSchema.validate(updatedAllowance);
}

