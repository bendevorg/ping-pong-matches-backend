/**
 * @api {GET} /players/:id GET Get player
 * @apiName Get player
 * @apiGroup Players
 * @apiVersion 0.0.1
 *
 * @apiSuccess (200) {String} data Hey.
 * @apiSuccessExample {json} Success-Response:
    { "data": ...PlayerData }
 * @apiError (400) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "data": "example is missing or is not correctly formatted." }
  *
 */
import { NextFunction, Request, Response } from 'express';
import { Player } from '~/models';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  let matches = 10;
  // @ts-ignore
  if (req.query && req.query.matches && !isNaN(req.query.matches)) {
    // @ts-ignore
    matches = parseInt(req.query.matches);
  }
  const player = await Player.get(id);
  if (!player) return res.status(404).json({});
  return res.status(200).json({
    data: await player.getPublicData(true, matches),
  });
};
