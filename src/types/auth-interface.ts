/**
 * 회원 관련
 */
export interface ILogin {
  access_token: string;
  refresh_token: string;
}

export interface IUser {
  id: string;
  token: string;
}

export interface ISignupForm {
  name: string;
  adminId: string;
  password: string;
  recoveryCode: string;
}

export interface IRecoveryCodeVerify {
  is_valid: boolean;
  account: string;
}
