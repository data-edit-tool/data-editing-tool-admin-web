// 어드민 페이지 경로
export const PATH_ADMIN_LIST = Object.freeze({
  MAIN: '/',
  LOGIN: '/admin/login',
  USER_MANAGEMENT: '/admin/user/management',
  USER_MANAGEMENT_REGISTER: '/admin/user/management/register',
  WORKSPACE_MANAGEMENT: '/admin/workspace/management',
  WORKSPACE_MANAGEMENT_REGISTER: '/admin/workspace/management/register',
  WORKSPACE_MANAGEMENT_DETAIL: '/admin/workspace/management/:id',
  WORKSPACE_MANAGEMENT_WORKER: '/admin/workspace/management/worker/:id',
  WORKSPACE_MANAGEMENT_PROJECT: '/admin/workspace/management/:id/project',
  WORKSPACE_MANAGEMENT_PROJECT_UPLOAD: '/admin/workspace/management/:id/project/:projectId/upload',
  WORKSPACE_MANAGEMENT_PROJECT_ASSIGNMENT: '/admin/workspace/management/:id/project/:projectId/assignment',
  WORKSPACE_MANAGEMENT_PROJECT_REGISTER: '/admin/workspace/management/:id/project/register',
});

// 사이드바에서 체크하기 위한 경로
export const PATH_USER_MANAGEMENT_LIST: string[] = [PATH_ADMIN_LIST.USER_MANAGEMENT, PATH_ADMIN_LIST.USER_MANAGEMENT_REGISTER];
export const PATH_WORKSPACE_MANAGEMENT_LIST: string[] = [PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT, PATH_ADMIN_LIST.WORKSPACE_MANAGEMENT_REGISTER];
