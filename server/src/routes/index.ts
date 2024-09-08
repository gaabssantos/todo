import { Router } from 'express';
import { baseRoute } from './base.route';
import { todoRoute } from './todo.route';

export const route = Router();

route.use('/', baseRoute);
route.use('/todo', todoRoute);
