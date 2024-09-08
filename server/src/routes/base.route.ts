import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { name, version, description } from '../../package.json';

export const baseRoute = Router();

baseRoute.get('/', (_: Request, res: Response, __: NextFunction) => {
  return res.status(StatusCodes.OK).json({ name, version, description });
});
