/**
 * @api {GET} /players GET List players
 * @apiName List players
 * @apiGroup Players
 * @apiVersion 0.0.1
 *
 * @apiSuccess (200) {String} data Hey.
 * @apiSuccessExample {json} Success-Response:
    { "data": [...PlayerData] }
 * @apiError (400) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "data": "example is missing or is not correctly formatted." }
  *
 */
import { NextFunction, Request, Response } from 'express';
import { Player } from '~/models';

export default async (_req: Request, res: Response, next: NextFunction) => {
  const players = await Player.getAll();
  return res.status(200).json({
    data: players.map((player) => player.getPublicData()),
  });
};
