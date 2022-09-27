/**
 * @api {POST} /players POST Create player
 * @apiName Create player
 * @apiGroup Players
 * @apiVersion 0.0.1
 *
 * @apiParam {String} name Player's name
 * @apiParamExample {json} Request-example:
 * {
 *     "name": "Test"
 * }
 * @apiSuccess (200) {String} data Hey.
 * @apiSuccessExample {json} Success-Response:
    { "data": ...PlayerData }
 * @apiError (400) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "data": "example is missing or is not correctly formatted." }
  *
 */

import { NextFunction, Request, Response } from 'express';
import { Player, Team } from '~/models';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const createdData = await Player.getOrCreate(name);
  if (createdData === null) return res.status(501).json({});
  const [player, created] = createdData;
  const otherPlayers = await Player.findAll();
  const teams: Team[] = [];
  for (let i = 0; i < otherPlayers.length; i++) {
    if (otherPlayers[i].id === player.id) continue;
    const newTeamData = await Team.getOrCreate(otherPlayers[i].id, player.id);
    if (newTeamData === null) return;
    const [newTeam, created] = newTeamData;
    teams.push(newTeam);
  }
  return res.status(200).json({
    data: {
      player,
      teams,
    },
  });
};
