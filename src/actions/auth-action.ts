import { AxiosResponse } from 'axios';
import crypto from 'crypto-js';
import { useSetRecoilState } from 'recoil';
import { authAtom, authInitLoadingSelector, IAuthState } from 'state/auth';
import { ILogin, IRecoveryCodeVerify, ISignupForm } from 'types/auth-interface';
import { IApi } from 'types/interface';
import axios, { setToken } from 'utils/axios';

function useUserActions() {
  const setAuth = useSetRecoilState(authAtom);
  const setAuthInitLoading = useSetRecoilState(authInitLoadingSelector);

  // 로그인
  async function login({ id, password }: { id: string; password: string }): Promise<{ code: string; message: string } | undefined> {
    const url = '/admin/login';

    // 암호화
    const formData = {
      account: id,
      password: crypto.SHA512(password).toString(crypto.enc.Hex),
    };
    try {
      const {
        data: { result, data, code, message },
      }: AxiosResponse<IApi<ILogin>> = await axios.post(url, formData);
      if (result && code === 'F000') {
        const userData = {
          user: {
            id,
            token: data.access_token,
          },
          initLoading: false,
        };
        setAuth(userData);
        setToken(data.access_token);
        window.localStorage.setItem('user', JSON.stringify(userData));
      } else {
        return { code, message: message || '아이디 및 비밀번호를 확인해주세요' };
      }
    } catch (err) {
      throw err;
    }
  }

  async function passwordReset({ account, password, changePassword }: { account: string; password: string; changePassword: string }) {
    const url = '/user/initPassword';

    const formData = {
      account,
      password: crypto.SHA512(password).toString(crypto.enc.Hex),
      change_password: crypto.SHA512(changePassword).toString(crypto.enc.Hex),
      change_password_ck: crypto.SHA512(changePassword).toString(crypto.enc.Hex),
    };
    try {
      const {
        data: { result, code, message },
      }: AxiosResponse<IApi<ILogin>> = await axios.put(url, formData);
      if (result && code === 'F000') {
        return;
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  // 로그인 유지 (토큰 체크)
  async function me() {
    try {
      const localAuth = window.localStorage.getItem('user');
      if (localAuth) {
        const setLocalUser = JSON.parse(localAuth) as IAuthState;
        if (setLocalUser.user?.token) {
          setToken(setLocalUser.user.token);
        }
        const {
          data: { result, code, message },
        }: AxiosResponse<IApi> = await axios.get('/user/token/check');
        if (result && code === 'F000') {
          setAuth(setLocalUser);
        } else {
          throw { code, message };
        }
      }
      setAuthInitLoading(false);
    } catch (err) {
      window.localStorage.removeItem('user');
      setAuthInitLoading(false);
      throw err;
    }
  }

  // 회원가입
  async function signup(form: ISignupForm) {
    const url = '/admin';
    const formData = {
      name: form.name,
      account: form.adminId,
      password: crypto.SHA512(form.password).toString(crypto.enc.Hex),
      recovery_code: form.recoveryCode,
    };
    try {
      const {
        data: { result, code, message, data },
      }: AxiosResponse<IApi<string>> = await axios.post(url, formData);
      if (result && (code === 'F000' || code === 'U001')) {
        return { code, data, message };
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  // 관리자 계정 체크
  async function checkAdminAccount() {
    const url = '/admin/exist';
    try {
      const {
        data: { result, code, message, data },
      }: AxiosResponse<IApi<boolean>> = await axios.get(url);
      if (result && code === 'F000') {
        return data;
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  async function recoveryCodeCheck({ recoveryCode }: { recoveryCode: string }) {
    const url = '/admin/recovery-code/verify';
    const formData = {
      recovery_code: recoveryCode,
    };
    try {
      const {
        data: { result, code, message, data },
      }: AxiosResponse<IApi<IRecoveryCodeVerify>> = await axios.get(url, { params: formData });
      if (result && code === 'F000') {
        return data;
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  async function passwordRecovery({ recoveryCode, password }: { recoveryCode: string; password: string }) {
    const url = '/admin/password';
    const formData = {
      recovery_code: recoveryCode,
      password: crypto.SHA512(password).toString(crypto.enc.Hex),
    };
    try {
      const {
        data: { result, code, message },
      }: AxiosResponse<IApi> = await axios.put(url, formData);
      if (result && code === 'F000') {
        return;
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  async function existAdminAccount() {
    const url = '/admin/exist';
    try {
      const {
        data: { result, code, message, data },
      }: AxiosResponse<IApi<boolean>> = await axios.get(url);
      if (result && code === 'F000') {
        return data;
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  return { login, me, passwordReset, signup, checkAdminAccount, recoveryCodeCheck, passwordRecovery, existAdminAccount };
}

export { useUserActions };
