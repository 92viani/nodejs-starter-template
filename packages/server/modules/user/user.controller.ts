import { Body, Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import Identify from '@/server/common/identify.decorator';
import { UserDTO } from '@/server/modules/user/user.dto';
import { UserService } from '@/server/modules/user/user.service';

@Controller('user')
export class UserController {
	private userService: UserService;
	constructor() {}

	@Put()
	updateCurrentUser(
		@Body() data: UserDTO,
		@Identify() email: string,
	): Promise<any> {
		return this.userService.updateCurrentUser(data, email);
	}

	@Get('profile')
	getProfile(@Request() req: any) {
		return req.user;
	}
}
