import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLogin from 'pages/Admin/Login';
import ManagementUser from 'pages/Admin/Management/User';
import ManagementUserRegister from 'pages/Admin/Management/User/Register';
import ManagementWorkspace from 'pages/Admin/Management/Workspace';
import ManagementWorkspaceProject from 'pages/Admin/Management/Workspace/Project';
import ManagementWorkspaceProjectAssignment from 'pages/Admin/Management/Workspace/Project/Assignment';
import ManagementWorkspaceProjectRegister from 'pages/Admin/Management/Workspace/Project/Register';
import ManagementWorkspaceProjectUpload from 'pages/Admin/Management/Workspace/Project/Upload';
import ManagementWorkspaceRegister from 'pages/Admin/Management/Workspace/Register';
import ManagementWorkspaceWorker from 'pages/Admin/Management/Workspace/Worker';
import { PATH_ADMIN_LIST } from 'utils/path';

import ProtectedRoute from './ProtectedRoute';
import RedirectRoute from './RedirectRoute';

const PageRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<RedirectRoute />} />
    <Route path={PATH_ADMIN_LIST.LOGIN} element={<AdminLogin />} />
    <Route element={<ProtectedRoute />}>
      <Route path={PATH_ADMIN_LIST.USER_MANAGEMENT} element={<ManagementUser />} />
      <Route path={PATH_ADMIN_LIST.USER_MANAGEMENT_REGISTER} element={<ManagementUserRegister />} />
      <Route path={PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT} element={<ManagementWorkspace />} />
      <Route path={PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_REGISTER} element={<ManagementWorkspaceRegister />} />
      <Route path={PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_DETAIL} element={<ManagementWorkspaceRegister />} />
      <Route path={PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_WORKER} element={<ManagementWorkspaceWorker />} />
      <Route path={PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_PROJECT} element={<ManagementWorkspaceProject />} />
      <Route path={PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_PROJECT_UPLOAD} element={<ManagementWorkspaceProjectUpload />} />
      <Route path={PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_PROJECT_ASSIGNMENT} element={<ManagementWorkspaceProjectAssignment />} />
      <Route path={PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_PROJECT_REGISTER} element={<ManagementWorkspaceProjectRegister />} />
    </Route>
  </Routes>
);

export default PageRoutes;
