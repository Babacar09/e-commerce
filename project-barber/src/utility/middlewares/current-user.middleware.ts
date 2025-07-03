import { Injectable, NestMiddleware } from '@nestjs/common';
import { isArray } from 'class-validator';
import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';

declare global {
    namespace Express {
      interface Request {
        currentUser?: UserEntity | null;
      }
    }
  }
interface JwtPayload {
  id: string;
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
  console.log('Token reçu dans le header :', req.headers.authorization);


    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || isArray(authHeader) || !authHeader.startsWith('Bearer ')) {

      req.currentUser = null;
      next();
      return;
    }

    try {
      const token = authHeader.split(' ')[1];
      const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
      console.log('cle secrete utilise',secretKey);
      console.log('clé utilisée pour signer :', process.env.ACCESS_TOKEN_SECRET_KEY);

      console.log('token recu', token);
      
      
      if (!secretKey) {
        throw new Error('La clé secrète JWT est manquante dans les variables d\'environnement.');
      }
      
      const decoded = verify(token, secretKey) as JwtPayload;
    
        console.log('Token décodé avec succès :', decoded);

      
      const currentUser = await this.usersService.findOne(+decoded.id);
      req.currentUser = currentUser;
      next();
    } catch (err) {
      console.error('Erreur de vérification JWT :', err.message);
      req.currentUser = null;
      next();
    }
  }
}


