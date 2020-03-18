import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import midAuth from './app/middlewares/auth';

const routs = new Router();

routs.post('/sessions', SessionController.store);

routs.use(midAuth);

routs.post('/recipients', RecipientController.store);

routs.put('/recipients/:id', RecipientController.update);

export default routs;
