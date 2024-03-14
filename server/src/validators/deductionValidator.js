
import joi from 'joi';

export const createDeductionValidation = (deduction) => {
  const createDeductionSchema = joi.object({ 
    Description: joi.string().required(),
    NssfDeduction: joi.Decimal().required(),
    NhifDeduction: joi.Decimal().required(),
    TaxDeduction: joi.Decimal().required(),
    DeductionAmount: joi.Decimal().required()
    });
    
  return createDeductionSchema.validate(deduction);
};




export  const updateDeductionValidator=(updatedDeduction)=>{
  const updateDeductionValidatorSchema=joi.object({
    Description: joi.string().required(),
    NssfDeduction: joi.Decimal().required(),
    NhifDeduction: joi.Decimal().required(),
    TaxDeduction: joi.Decimal().required(),
    DeductionAmount: joi.Decimal().required()
  })
   
  return updateDeductionValidatorSchema.validate(updatedDeduction);
}

