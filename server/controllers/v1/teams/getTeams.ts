/**
 * @api {GET} /teams GET List teams
 * @apiName List teams
 * @apiGroup Teams
 * @apiVersion 0.0.1
 *
 * @apiSuccess (200) {String} data Hey.
 * @apiSuccessExample {json} Success-Response:
    { "data": [...TeamData] }
 * @apiError (400) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "data": "example is missing or is not correctly formatted." }
  *
 */
import { NextFunction, Request, Response } from 'express';
import { Team } from '~/models';

export default async (_req: Request, res: Response, next: NextFunction) => {
  const teams = await Team.getAll();
  const teamsData = await Promise.all(
    teams.map(async (team) => await team.getPublicData()),
  );
  return res.status(200).json({
    data: teamsData,
  });
};
