import express from 'express';
import cors from 'cors';
import router from '../server/core/router';

const productionApp = express();
productionApp.use(cors());
productionApp.use('/', router);

module.exports = productionApp;
