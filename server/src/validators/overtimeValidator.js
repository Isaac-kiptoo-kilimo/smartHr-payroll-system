import joi from 'joi';

export const createOvertimeValidation = (overtime) => {
  const createOvertimeSchema = joi.object({ 
    OvertimeHours: joi.Number().required(),
    Rate: joi.Decimal().required(),
    });
    
  return createOvertimeSchema.validate(overtime);
};




export  const updateOvertimeValidator=(updatedOvertime)=>{
  const updateOvertimeValidatorSchema=joi.object({
    OvertimeHours: joi.Number().required(),
    Rate: joi.Decimal().required(),
    
  })
   
  return updateOvertimeValidatorSchema.validate(updatedOvertime);
}

