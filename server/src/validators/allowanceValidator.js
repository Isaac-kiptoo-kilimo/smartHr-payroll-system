
import joi from 'joi';

export const createAllowanceValidation = (allowance) => {
  const createAllowanceSchema = joi.object({ 
    HomeAllowance: joi.Decimal().required(),
    CommuterAllowance: joi.Decimal().required(),
    MedicalAllowance: joi.Decimal().required()
    });
    
  return createAllowanceSchema.validate(allowance);
};




export  const updateAllowanceValidator=(updatedAllowance)=>{
  const updateAllowanceValidatorSchema=joi.object({
    HomeAllowance: joi.Decimal().required(),
    CommuterAllowance: joi.Decimal().required(),
    MedicalAllowance: joi.Decimal().required()
  })
   
  return updateAllowanceValidatorSchema.validate(updatedAllowance);
}

