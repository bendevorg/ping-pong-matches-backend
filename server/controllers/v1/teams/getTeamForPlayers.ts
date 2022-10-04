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
  const { playerAId, playerBId } = req.params;
  const team = await Team.getForPlayers(playerAId, playerBId);
  if (!team) return res.status(404).json({});
  return res.status(200).json({
    data: await team.getPublicData(),
  });
};
