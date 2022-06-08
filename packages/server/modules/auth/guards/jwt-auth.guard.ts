import {
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_ROUTE } from './skip-default.guard';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super();
	}

	canActivate(context: ExecutionContext) {
		// Add your custom authentication logic here
		// check public routes
		const isPublicRoute = this.reflector.getAllAndOverride<boolean>(
			IS_PUBLIC_ROUTE,
			[context.getHandler(), context.getClass()],
		);

		if (isPublicRoute) {
			return true;
		}

		// for example, call super.logIn(request) to establish a session.
		return super.canActivate(context);
	}

	handleRequest(err: any, user: any, info: any) {
		// You can throw an exception based on either "info" or "err" arguments
		if (err || !user) {
			throw err || new UnauthorizedException();
		}
		return user;
	}
}
