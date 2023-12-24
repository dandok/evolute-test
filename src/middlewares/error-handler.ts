import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../@types/httpsStatusCode';

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('here');
  // const statusCode = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
  // const status = err.status || 'Internal server error';
  // const message = err.message || 'error occured';
  // const responseObj = { statusCode, status, message };

  // if (process.env.NODE_ENV !== 'production') {
  //   const stack = err.stack || '';
  //   console.log("error",responseObj,stack)
  //   return res.status(statusCode).json({ ...responseObj, stack });
  // }

  // res.setHeader('Content-Type', 'application/json');

  // return res.status(statusCode).json(responseObj);
}
