export interface IWorkspaceManagement {
  workspace_count: number;
  total_page: number;
  result_count: number;
  workspaces: IWorkspaceManagementList[];
}

export interface IWorkspaceManagementList {
  workspace_id: string;
  name: string;
  desc: string;
  project_count: number;
  worker_count: number;
  checker_count: number;
  viewer_count: number;
  manager: string;
  start_date: string;
  end_date: string;
  status: string;
}

export interface IWorkspaceManagementDetail {
  workspace_id: string;
  name: string;
  desc: string;
  manager: string;
  start_date: string;
  end_date: string;
  guides: IWorkspaceManagementDetailGuide[];
}

export interface IWorkspaceManagementDetailGuide {
  file_name: string;
  file_size: number;
  file_url: string;
  guide_id: string;
}
