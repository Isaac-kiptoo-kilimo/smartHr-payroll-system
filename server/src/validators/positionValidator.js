import joi from 'joi';

export const createPositionValidation = (position) => {
  const createPositionSchema = joi.object({ 
    JobPostion: joi.string().required()
    });
    
  return createPositionSchema.validate(position);
};




export  const updatePostionValidator=(updatedPosition)=>{
  const updatePositionValidatorSchema=joi.object({
    JobPostion: joi.string().required()
  })
   
  return updatePositionValidatorSchema.validate(updatedPosition);
}

