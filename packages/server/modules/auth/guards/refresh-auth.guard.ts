import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshAuthGuard extends AuthGuard('refresh') {}

export const UseRefreshGuard = () => UseGuards(RefreshAuthGuard);
