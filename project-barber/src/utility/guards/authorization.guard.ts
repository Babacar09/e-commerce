import { CanActivate, ExecutionContext, Injectable, mixin, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";



// @Injectable()
// export class AuthorizeGuard implements CanActivate{
//     constructor(private reflector:Reflector){}
//     canActivate(context: ExecutionContext): boolean {
//         const allowedRoles= this.reflector.get<string[]>('roles', context.getHandler())
//         const request = context.switchToHttp().getRequest()
//         const result = request?.currentUser?.roles.map((role:string)=>allowedRoles.includes(role)).find((val:boolean)=>val===true);
//         if(result) return true
//         throw new UnauthorizedException('sorry, you are not authoriezd')
//     }
// }

// export const AuthorizeGuard=(Roles:string[])=>{
//     class RolesGuardMixin implements CanActivate{
//         canActivate(context: ExecutionContext): boolean {
//             const request = context.switchToHttp().getRequest()
//             const result= request?.currentUser?.roles.map((role:string)=>Roles.includes(role)).
//             find((val:boolean)=>val === true)
//             if(result) return true
//             throw new UnauthorizedException('sorry you are not authorized')
//         }
//     }
//     const guard = mixin(RolesGuardMixin)
//     return guard
// }


//import { CanActivate, ExecutionContext, UnauthorizedException, mixin } from '@nestjs/common';

export const AuthorizeGuard = (Roles: string[]) => {
  class RolesGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const currentUser = request.currentUser;

      console.log('AuthorizeGuard - currentUser:', currentUser);

      if (!currentUser || !Array.isArray(currentUser.roles)) {
        console.warn('AuthorizeGuard - Utilisateur non authentifié ou rôles absents');
        throw new UnauthorizedException('sorry you are not authorized');
      }

      // Conversion en minuscules pour éviter les problèmes de casse
      const userRoles = currentUser.roles.map(role => role.toLowerCase());
      const allowedRoles = Roles.map(role => role.toLowerCase());

      const hasRole = userRoles.some(role => allowedRoles.includes(role));

      console.log('AuthorizeGuard - roles utilisateur:', userRoles);
      console.log('AuthorizeGuard - roles autorisés:', allowedRoles);
      console.log('AuthorizeGuard - accès autorisé ?', hasRole);

      if (!hasRole) {
        throw new UnauthorizedException('sorry you are not authorized');
      }
      return true;
    }
  }
  return mixin(RolesGuardMixin);
};
