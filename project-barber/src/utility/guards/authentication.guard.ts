import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/authorize-roles.decorator';


@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest()
    const currentUser = request.currentUser
    console.log('Required roles:', requiredRoles);
    console.log('Current user:', currentUser);

    if (!requiredRoles) {
        console.log('Aucun rôle requis pour cette route.');
        return true;
      }
    //const { currentUser } = context.switchToHttp().getRequest();
    //const currentUser = request.currentUser;

    if (!currentUser || !Array.isArray(currentUser.roles)) {
        console.warn('Utilisateur non authentifié ou rôles non définis.');
        return false;
      }
    return requiredRoles.some(role => currentUser.roles?.includes(role));
  }
}
