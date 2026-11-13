import { ICustomError } from 'types/interface';

// 서버에러인지 클라이언트에러인지 체크
export const isCustomError = (error: any): error is ICustomError => {
  return typeof error === 'object' && 'code' in error && 'message' in error;
};
