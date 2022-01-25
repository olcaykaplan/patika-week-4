import { Joi } from 'express-validation'

// validation for register Post
export const PostRegisterValidation = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required()
})

