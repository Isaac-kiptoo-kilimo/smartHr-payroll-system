import joi from 'joi';

export const userRegistrationValidation = (user) => {
  const userRegistrationSchema = joi.object({
    FirstName: joi.string().required(),
    LastName: joi.string().required(),
    JobPostion: joi.string().required(),
    Gender: joi.string().required(),
    Address: joi.string().required(),
    Department: joi.string().required(),
    Phone_No: joi.string().required(),
    Email: joi.string().email().required(),
    Password: joi
      .string()
      .min(8) 
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/, 'password')
      .message(
        'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one digit, and one special character.'
      )
      .required(),
    WorkSchedule: joi.string().required(),
    Birth_Date: joi.string().required(),
  });

  return userRegistrationSchema.validate(user);
};


export const userLoginValidation = (user) => {
  const userLoginSchema = joi.object({
    Email: joi.string().email().required(),
    EmployeeID: joi.string().required(),
    Password: joi.string().required(),
    
  });
  // EmployeeID
  return userLoginSchema.validate(user);
};



export  const updateUserValidator=(updateduser)=>{
  const updateUserValidatorSchema=joi.object({
      FirstName: joi.string().required(),
      LastName: joi.string().required(),
      Birth_Date: joi.string().required(),
      Address: joi.string().required(),
      Department : joi.string().required(),
      Gender: joi.string().required(),
      Phone_No: joi.string().required(),
      profileImage: joi.string().required(),
  })
   
  Department
  return updateUserValidatorSchema.validate(updateduser);
}



export  const updateUserPasswordValidator=(updateduser)=>{
  const updateUserPassValidatorSchema=joi.object({
      Password: joi.string().min(4).required(),
  })

  return updateUserPassValidatorSchema.validate(updateduser);
}
