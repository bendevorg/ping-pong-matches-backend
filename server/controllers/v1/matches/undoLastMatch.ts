/**
 * @api {POST} /matches/undo-last POST Undo last match
 * @apiName Undo last match
 * @apiGroup Matches
 * @apiVersion 0.0.1
 *
 * @apiParam {String} Example Example's body string
 * @apiParamExample {json} Request-example:
 * {
 *     "example": "Test"
 * }
 * @apiSuccess (200) {String} data Hey.
 * @apiSuccessExample {json} Success-Response:
    { "data": "Hey!" }
 * @apiError (400) {String} msg Error message.
 * @apiErrorExample {json} Error-Response:
    { "data": "example is missing or is not correctly formatted." }
  *
 */

import { Request, Response } from 'express';
import { Match } from '~/models';

export default async (_req: Request, res: Response) => {
  const deleted = await Match.undoLast();
  return res.status(200).json({ data: deleted });
};
