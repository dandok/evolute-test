import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { RequestHandler } from 'express';
import { IExtendedRequest } from '../@types/app.interface';
import { HttpStatusCode } from '../@types/httpsStatusCode';

export function validationMiddleware<T extends object>(
  dtoClass: new () => T
): any {
  return async (req: IExtendedRequest<T>, res: any, next: any) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    const validationErrors = await validate(dtoInstance);

    if (validationErrors.length) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        statusCode: HttpStatusCode.BAD_REQUEST,
        errors: validationErrors.map((error) => error.constraints),
      });
    }

    req.validatedBody = dtoInstance;
    next();
  };
}
