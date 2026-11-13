import { ICode, IPage } from './interface';

export interface IWorkspaceProjectAssignmentList {
  id: string;
  work_status: ICode;
  name: string;
  worker: IWorkspaceProjectAssignmentUserList | null;
  checker: IWorkspaceProjectAssignmentUserList | null;
}

export interface IWorkspaceProjectAssignmentUserList {
  id: string;
  account: string;
  description: string;
}

export interface IWorkspaceProjectAssignmentWorkForm {
  workspace_id: string;
  project_id: string;
  user_type: string;
  user_id?: string | null;
}

export interface IWorkspaceProjectAssignmentWorkerAndCheckerList {
  list: IWorkspaceProjectAssignmentUserList[];
  page: IPage;
}

export interface IWorkspaceProjectAssignmentWorkerAndCheckerQuery {
  workspace_id: string;
  user_type: string;
  page?: number;
  size?: number;
  search?: string;
}
