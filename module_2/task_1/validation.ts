const joi = require("joi");

const ID = joi.string().required();
const LOGIN = joi.string().required();
const PASSWORD = joi
  .string()
  .pattern(/^(?=.*\d)(?=.*[a-zA-Z]).{1,}$/)
  .required();
const AGE = joi.number().integer().min(4).max(130).required();
const ISDELETED = joi.boolean().required();
export const updateUserSchema = joi.object({
  id: ID,
  login: LOGIN,
  password: PASSWORD,
  age: AGE,
  isDeleted: ISDELETED,
});

export const createUserSchema = joi.object({
  login: LOGIN,
  password: PASSWORD,
  age: AGE,
  isDeleted: ISDELETED,
});
export function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error && error.isJoi) {
      res.status(400).json({ error: error.details });
    } else {
      return next();
    }
  };
}
