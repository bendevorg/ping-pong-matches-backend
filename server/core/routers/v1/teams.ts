import express from 'express';
import retrieveControllers from '../../../utils/retrieveControllers';

const router = express.Router();
const routerName = __filename.split(/\\routers|\/routers/)[1].split('.')[0];
const controllers = retrieveControllers(routerName);

router.get('/', controllers.getTeams);
router.get('/:playerAId/:playerBId', controllers.getTeamForPlayers);
router.get('/:id', controllers.getTeam);

export default router;
