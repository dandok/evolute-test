import { Request } from 'express';

export interface IExtendedRequest<T> extends Request {
  validatedBody?: T;
  headers: { [key: string]: string };
}
