import express from 'express';
import retrieveControllers from '../../../utils/retrieveControllers';
import retrieveSchemas from '../../../utils/retrieveSchemas';

const router = express.Router();
const routerName = __filename.split(/\\routers|\/routers/)[1].split('.')[0];
const controllers = retrieveControllers(routerName);
const schemas = retrieveSchemas(routerName);

router.get('/', controllers.getPlayers);
router.get('/:id', controllers.getPlayer);
router.post('/', schemas.newPlayer, controllers.newPlayer);

export default router;
