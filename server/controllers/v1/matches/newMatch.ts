/**
 * @api {POST} /matches POST New match
 * @apiName New match
 * @apiGroup Matches
 * @apiVersion 0.0.1
 *
 * @apiParam {String} Example Example's body string
 * @apiParamExample {json} Request-example:
 * {
 *     "id": "asdasd",
 *     "winnerId": "asdasd"
 * }
 * @apiSuccess (200) {String} data Hey.
 * @apiSuccessExample {json} Success-Response:
    { "data": ...MatchData }
 * @apiError (400) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "data": "example is missing or is not correctly formatted." }
  *
 */

import { Request, Response } from 'express';
import { Match } from '~/models';

export default async (req: Request, res: Response) => {
  const { teamAId, teamBId, teamWonId } = req.body;
  const createdMatch = await Match.new(teamAId, teamBId, teamWonId);
  return res.status(201).json({
    data: createdMatch,
  });
};
