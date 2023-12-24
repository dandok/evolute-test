import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../@types/httpsStatusCode';
import { AdminModel } from '../Models/Admin/schema';

export async function validateAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const adminEmail = req.headers.email as string;
  const admin = await AdminModel.findOne({ adminEmail });

  if (!admin) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Admin not found' });
  }

  next();
}
