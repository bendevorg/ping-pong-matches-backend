/**
 * @api {GET} /matches GET List matches
 * @apiName List matches
 * @apiGroup Matches
 * @apiVersion 0.0.1
 *
 * @apiSuccess (200) {String} data Hey.
 * @apiSuccessExample {json} Success-Response:
    { "data": [...MatchData] }
 * @apiError (400) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "data": "example is missing or is not correctly formatted." }
  *
 */
import { NextFunction, Request, Response } from 'express';
import { Match } from '~/models';

export default async (req: Request, res: Response, next: NextFunction) => {
  let limit = 100;
  // @ts-ignore
  if (req.query && req.query.limit && !isNaN(req.query.limit)) {
    // @ts-ignore
    limit = parseInt(req.query.limit);
  }
  const matches = await Match.getAll(limit);
  return res.status(200).json({
    data: matches.map((match) => match.getPublicData()),
  });
};
