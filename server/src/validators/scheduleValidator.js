import joi from 'joi';

export const createScheduleValidation = (schedule) => {
  const createScheduleSchema = joi.object({ 
    WorkSchedule: joi.string().required(),
    StartTime: joi.Time().required(),
    EndTime: joi.Time().required(),
    });
    
  return createScheduleSchema.validate(schedule);
};




export  const updateScheduleValidator=(updatedSchedule)=>{
  const updateScheduleValidatorSchema=joi.object({
    WorkSchedule: joi.string().required(),
    StartTime: joi.Time().required(),
    EndTime: joi.Time().required(),

  })
   
  return updateScheduleValidatorSchema.validate(updatedSchedule);
}

