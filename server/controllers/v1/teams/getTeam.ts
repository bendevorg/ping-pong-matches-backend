/**
 * @api {GET} /teams/:id GET Get team
 * @apiName Get team
 * @apiGroup Teams
 * @apiVersion 0.0.1
 *
 * @apiSuccess (200) {String} data Hey.
 * @apiSuccessExample {json} Success-Response:
    { "data": ...TeamData }
 * @apiError (400) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "data": "example is missing or is not correctly formatted." }
  *
 */
import { NextFunction, Request, Response } from 'express';
import { Team } from '~/models';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  let matches = 10;
  const { includeFullMatches } = req.query;
  // @ts-ignore
  if (req.query && req.query.matches && !isNaN(req.query.matches)) {
    // @ts-ignore
    matches = parseInt(req.query.matches);
  }
  const team = await Team.get(id);
  if (!team) return res.status(404).json({});
  return res.status(200).json({
    data: await team.getPublicData(matches, Boolean(includeFullMatches)),
  });
};
