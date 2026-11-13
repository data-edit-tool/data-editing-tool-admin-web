import { useEffect } from 'react';
import { useUserActions } from 'actions/auth-action';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authInitLoadingSelector, authUserSelector } from 'state/auth';
import { setToken } from 'utils/axios';

// 회원 인증 로직
const useAuth = () => {
  const { me } = useUserActions();
  const [initLoading, setInitLoading] = useRecoilState(authInitLoadingSelector);
  const user = useRecoilValue(authUserSelector);
  useEffect(() => {
    const fetchMe = async () => {
      try {
        // 내 정보 불러오기
        await me();
      } catch (err) {
        // 실패시 로그아웃 처리
        setToken('');
        setInitLoading(false);
      }
    };
    fetchMe();
  }, []);

  return [user, initLoading];
};

export default useAuth;
