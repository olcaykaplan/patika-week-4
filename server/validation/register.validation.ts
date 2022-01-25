import {Joi} from "express-validation";

// validation for register api
export const RegisterValidation = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
});
