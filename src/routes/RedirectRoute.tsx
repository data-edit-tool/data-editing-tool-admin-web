/* eslint-disable indent */
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { PATH_ADMIN_LIST } from 'utils/path';

const RedirectRoute: React.FC = () => {
  const [user, initLoading] = useAuth();

  // 로그인 체크
  if (initLoading) {
    return null;
  }

  if (!initLoading && !user) {
    return <Navigate to={PATH_ADMIN_LIST.LOGIN} replace />;
  }

  // 로그인 체크 후 페이지 이동
  return <Navigate to={PATH_ADMIN_LIST.USER_MANAGEMENT} replace />;
};

export default RedirectRoute;
