import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

export const Permissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);

/** Restrict a route/controller to users whose assigned apps include one of these. */
export const RequireApp = (...apps: string[]) => SetMetadata('requiredApps', apps);

export const Public = () => SetMetadata('isPublic', true);
