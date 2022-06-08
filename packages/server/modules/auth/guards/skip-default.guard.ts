import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_ROUTE = 'isPublicRoute';
export const SkipDefaultGuard = () => SetMetadata(IS_PUBLIC_ROUTE, true);
