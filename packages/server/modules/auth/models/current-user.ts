interface ICurrentUser {
	userId?: string;
	username?: string;
	fullName?: string;
	email?: string;
	avatar?: Buffer;
}

export class CurrentUser implements ICurrentUser {
	userId: string;
	fullName: string;
	email: string;
	username: string;
	avatar: Buffer;
	constructor(defualt: ICurrentUser = {}) {
		Object.assign(this, defualt);
	}
}
