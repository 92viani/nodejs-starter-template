interface IResponseModel {
  status?: 'success' | 'error' | 'info' | 'warning';
  message?: string;
  data?: object;
  error?: any;
}

export class ResponseModel implements IResponseModel {
  message;
  data;
  error;
  status;

  constructor(
    defualt: IResponseModel = {
      status: 'success',
      message: null,
      data: {},
    },
  ) {
    Object.assign(this, defualt);
    if (this.status === 'success' && !!this.message) this.message = 'عملیات با موفقیت به پایان رسید';
    if (this.status === 'error' && !!this.message) this.message = 'خطا در انجام عملیات';
  }
}
