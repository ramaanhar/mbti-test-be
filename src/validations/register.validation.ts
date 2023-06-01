import joi from 'joi'

const registerValidation = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  gender: joi.string().required().valid('male', 'female'),
  password: joi.string().required(),
  retypePassword: joi.string().valid(joi.ref('password')).required()
})

export default registerValidation
