import React from 'react';
import { Navigate, useOutlet } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { PATH_ADMIN_LIST } from 'utils/path';

const ProtectedRoute: React.FC = () => {
  const [user, initLoading] = useAuth();
  const outlet = useOutlet();
  // 로그인 체크 전
  if (initLoading) {
    return null;
  }

  if (!initLoading && !user) {
    return <Navigate to={PATH_ADMIN_LIST.LOGIN} replace />;
  }

  return outlet;
};

export default ProtectedRoute;
