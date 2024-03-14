import joi from 'joi';

export const createAttendanceValidation = (attendance) => {
  const createAttendanceSchema = joi.object({ 
    WorkSchedule: joi.string().required(),
    TimeIn: joi.Time().required(),
    TimeOut: joi.Time().required(),
    });
    
  return createAttendanceSchema.validate(attendance);
};




export  const updateAttendanceValidator=(updatedattendance)=>{
  const updateAttendanceValidatorSchema=joi.object({
    WorkSchedule: joi.string().required(),
    StartTime: joi.Time().required(),
    EndTime: joi.Time().required(),

  })
   
  return updateAttendanceValidatorSchema.validate(updatedattendance);
}

