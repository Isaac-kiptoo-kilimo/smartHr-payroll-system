import joi from 'joi';

export const createAdvanceValidation = (advance) => {
  const createAdvanceSchema = joi.object({ 
    AdvanceAmount: joi.Decimal().required()
    });
    
  return createAdvanceSchema.validate(advance);
};


export  const updateAdvanceValidator=(updatedAdvance)=>{
  const updateAdvanceValidatorSchema=joi.object({
    AdvanceAmount: joi.Decimal().required()
  })
   
  return updateAdvanceValidatorSchema.validate(updatedAdvance);
}

