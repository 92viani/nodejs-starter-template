import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const Identify = createParamDecorator(async (_, ctx: ExecutionContext) => {
	const req = ctx.switchToHttp().getRequest();
	return req?.user?.id;
});

export default Identify;
