import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization 
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        req['user'] = decodedToken; // Attach the decoded token to the request object
        next();
      })
      .catch((error) => {
        return res.status(403).json({ message: 'Forbidden' });
      });
  }
}
