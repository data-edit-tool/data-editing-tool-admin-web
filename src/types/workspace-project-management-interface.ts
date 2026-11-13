export interface IWorkspaceProjectManagement {
  project_count: number;
  total_page: number;
  result_count: number;
  projects: IWorkspaceProjectList[];
}

export interface IWorkspaceProjectList {
  project_id: string;
  name: string;
  data_type: string;
  tool_type: string;
  category_type: string;
  first_progress: string;
  second_progress: string;
  completed_progress: string;
  upload_status: string;
  project_status: string;
  post_status: string;
  created: string;
}
