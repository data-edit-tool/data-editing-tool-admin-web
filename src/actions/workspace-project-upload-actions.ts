import { AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';
import { workspaceProjectUploadAtom, workspaceProjectUploadCompleteFileSelector } from 'state/workspace-project-upload';
import { IApi } from 'types/interface';
import { IWorkspaceProjectCompleteUploadFile, IWorkspaceProjectUpload } from 'types/workspace-project-upload-interface';
import axios from 'utils/axios';

function useWorkspaceProjectUploadActions() {
  const setWorkspaceProjectUpload = useSetRecoilState(workspaceProjectUploadAtom);
  const setWorkspaceProjectCompleteFile = useSetRecoilState(workspaceProjectUploadCompleteFileSelector);

  // 프로젝트 업로드 상세 리스트 조회
  async function list({ workspaceId, projectId, page = 1 }: { workspaceId: string; projectId: string; page?: number }) {
    const url = `/admin/project/file/list/${workspaceId}/${projectId}/${page}`;
    try {
      const {
        data: { result, code, message, data },
      }: AxiosResponse<IApi<IWorkspaceProjectUpload>> = await axios.get(url);
      if (result && code === 'F000') {
        const newUploadList = [...data.upload_infos];
        setWorkspaceProjectUpload((prev) => ({
          ...prev,
          isLoading: false,
          totalCount: data.total_count,
          successCount: data.success_count,
          errorCount: data.error_count,
          totalPage: data.total_page,
          projectName: data.project_name,
          list: newUploadList,
        }));
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  // 최근 업로드 조회
  async function currentUpload() {
    const url = '/admin/workspace/upload/latest';
    try {
      const {
        data: { result, code, message, data },
      }: AxiosResponse<IApi<IWorkspaceProjectCompleteUploadFile>> = await axios.get(url);
      if (result && code === 'F000') {
        if (data) {
          setWorkspaceProjectCompleteFile(data);
        }
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  return { list, currentUpload };
}

export { useWorkspaceProjectUploadActions };
