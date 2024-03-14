import joi from 'joi';

export const createLeaveValidation = (leave) => {
  const createLeaveSchema = joi.object({ 
    LeaveType: joi.string().required(),
    Reason: joi.string().required(),
    Reason: joi.string().required(),
    StartLeaveDate: joi.date().required(),
    EndLeaveDate: joi.date().required(),
    });
    
  return createLeaveSchema.validate(leave);
};




export  const updateLeaveValidator=(updatedLeave)=>{
  const updateLeaveValidatorSchema=joi.object({
    LeaveType: joi.string().required(),
    Reason: joi.string().required(),
    Reason: joi.string().required(),
    StartLeaveDate: joi.date().required(),
    EndLeaveDate: joi.date().required(),
    });
    
   
  return updateLeaveValidatorSchema.validate(updatedLeave);
}

