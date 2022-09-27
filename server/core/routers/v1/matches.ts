import express from 'express';
import retrieveControllers from '../../../utils/retrieveControllers';
import retrieveSchemas from '../../../utils/retrieveSchemas';

const router = express.Router();
const routerName = __filename.split(/\\routers|\/routers/)[1].split('.')[0];
const controllers = retrieveControllers(routerName);
const schemas = retrieveSchemas(routerName);

router.post('/', schemas.setResult, controllers.setResult);

export default router;
