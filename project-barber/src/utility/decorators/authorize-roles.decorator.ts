import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY= 'roles'
export const AuthorRoles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);