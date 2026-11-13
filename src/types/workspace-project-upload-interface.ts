export interface IWorkspaceProjectUpload {
  total_count: string;
  success_count: string;
  error_count: string;
  total_page: number;
  project_name: string;
  upload_infos: IWorkspaceProjectUploadList[];
}

export interface IWorkspaceProjectUploadList {
  file_id: string;
  file_name: string;
  file_status: string;
  file_size: string;
  file_type: string;
  file_progress?: number;
}

export interface IWorkspaceProjectUploadFileList {
  workspace_id: string;
  project_id: string;
  file: File;
}

export interface IWorkspaceProjectCompleteUploadFile {
  workspace_id: string;
  workspace_name: string;
}
