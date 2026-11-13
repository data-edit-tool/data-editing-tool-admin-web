import { AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';
import { workspaceProjectAssignmentAtom } from 'state/workspace-project-assignment';
import { IApi } from 'types/interface';
import {
  IWorkspaceProjectAssignmentList,
  IWorkspaceProjectAssignmentWorkerAndCheckerList,
  IWorkspaceProjectAssignmentWorkerAndCheckerQuery,
  IWorkspaceProjectAssignmentWorkForm,
} from 'types/workspace-project-assignment-interface';
import axios from 'utils/axios';

function useWorkspaceProjectAssignmentActions() {
  const setWorkspaceProjectAssignment = useSetRecoilState(workspaceProjectAssignmentAtom);

  async function list({ projectId }: { projectId: string }) {
    const url = `/admin/jobs?project_id=${projectId}`;

    try {
      const {
        data: { result, code, message, data },
      }: AxiosResponse<IApi<IWorkspaceProjectAssignmentList[]>> = await axios.get(url);

      if (result && code === 'F000') {
        setWorkspaceProjectAssignment((prev) => ({
          ...prev,
          list: data,
          isLoading: false,
        }));
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  async function workStatus(jobId: string, form: IWorkspaceProjectAssignmentWorkForm) {
    const url = `/admin/jobs/${jobId}/worker`;
    try {
      const {
        data: { result, code, message },
      }: AxiosResponse<IApi> = await axios.post(url, form);
      if (!result || code !== 'F000') {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  async function workerAndCheckerList(query: IWorkspaceProjectAssignmentWorkerAndCheckerQuery) {
    const url = `/admin/jobs/assignable-users`;
    try {
      const {
        data: { result, code, message, data },
      }: AxiosResponse<IApi<IWorkspaceProjectAssignmentWorkerAndCheckerList>> = await axios.get(url, { params: query });
      if (!result || code !== 'F000') {
        throw { code, message };
      }
      return data;
    } catch (err) {
      throw err;
    }
  }

  return {
    list,
    workStatus,
    workerAndCheckerList,
  };
}

export default useWorkspaceProjectAssignmentActions;
