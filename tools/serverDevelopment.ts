import express from 'express';
import cors from 'cors';
import router from '../server/core/router';

const developmentApp = express();

developmentApp.use(cors());
developmentApp.use('/', router);

module.exports = developmentApp;
