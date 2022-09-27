import joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const schema = joi.object().keys({
  teamA: joi
    .object({
      playerAId: joi.string().required,
      playerBId: joi.string().required,
    })
    .required(),
  teamB: joi
    .object({
      playerAId: joi.string().required,
      playerBId: joi.string().required,
    })
    .required(),
  won: joi.number().min(0).max(1).required(),
});

export default (req: Request, _res: Response, next: NextFunction) => {
  const { error }: joi.ValidationResult = schema.validate(req.body);
  if (!error) {
    return next();
  }
  return next(error);
};
