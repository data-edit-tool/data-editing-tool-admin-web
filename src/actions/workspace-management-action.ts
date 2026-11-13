import { AxiosResponse } from 'axios';
import qs from 'qs';
import { useSetRecoilState } from 'recoil';
import { workspaceAssignManagementAtom } from 'state/workspace-assign-management';
import { workspaceAvailableManagementAtom } from 'state/workspace-available-management';
import { workspaceManagementAtom, workspaceManagementDetailSelector } from 'state/workspace-management';
import { IApi } from 'types/interface';
import { IUserManagement } from 'types/user-management-interface';
import { IWorkspaceManagement, IWorkspaceManagementDetail } from 'types/workspace-management-interface';
import axios from 'utils/axios';

interface IAddForm {
  name: string;
  desc?: string;
  manager: string;
  startDate: string | null;
  endDate: string | null;
  guides?: File[];
}

interface IEditForm {
  name: string;
  desc?: string;
  manager: string;
  startDate: string | null;
  endDate: string | null;
  newGuides: File[];
  deleteGuides: string[];
  id: string;
}

function useWorkspaceManagementActions() {
  const setWorkspaceManagement = useSetRecoilState(workspaceManagementAtom);
  const setWorkspaceManagementDetail = useSetRecoilState(workspaceManagementDetailSelector);
  const setWorkspaceAvailableManagement = useSetRecoilState(workspaceAvailableManagementAtom);
  const setWorkspaceAssignManagement = useSetRecoilState(workspaceAssignManagementAtom);

  // 관리자 > 워크스페이스 관리 > 워크스페이스 목록
  async function list({
    page = 1,
    status,
    filter,
    query,
    startDate,
    endDate,
  }: {
    page: number;
    status?: string | number;
    filter?: string | number;
    query?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const queryData = {} as {
      status?: string | number;
      filter?: string | number;
      query?: string;
      start_date?: string;
      end_date?: string;
    };
    if (status) {
      queryData.status = status;
    }
    if (filter) {
      queryData.filter = filter;
    }
    if (query) {
      queryData.query = query;
    }
    if (startDate) {
      queryData.start_date = startDate;
    }
    if (endDate) {
      queryData.end_date = endDate;
    }
    const queryParing = qs.stringify(queryData) || '';
    const url = `/admin/workspace/list/${page}${queryParing ? `?${queryParing}` : ''}`;

    try {
      const {
        data: { result, code, message, data },
      }: AxiosResponse<IApi<IWorkspaceManagement>> = await axios.get(url);
      if (result && code === 'F000') {
        setWorkspaceManagement({
          detail: null,
          isLoading: false,
          list: data.workspaces,
          totalPage: data.total_page,
          resultCount: data.result_count,
          workSpaceCount: data.workspace_count,
        });
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  // 관리자 > 워크스페이스 관리 > 워크스페이스 추가
  async function add({ name, desc, manager, startDate, endDate, guides }: IAddForm) {
    const formData = {
      name,
      manager,
      start_date: startDate,
      end_date: endDate,
    } as {
      name: string;
      desc?: string;
      manager: string;
      start_date: string;
      end_date: string;
      guides?: File[];
    };
    if (desc) {
      formData.desc = desc;
    }
    if (guides) {
      formData.guides = guides;
    }
    const url = '/admin/workspace';
    try {
      const {
        data: { result, code, message, data },
      }: AxiosResponse<IApi<string>> = await axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (result && code === 'F000') {
        return data;
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  // 관리자 > 워크스페이스 관리 > 워크스페이스 수정
  async function edit({ name, desc, manager, startDate, endDate, newGuides, deleteGuides, id }: IEditForm) {
    const formData = {
      name,
      manager,
      start_date: startDate,
      end_date: endDate,
    } as {
      name: string;
      desc?: string;
      manager: string;
      start_date: string;
      end_date: string;
      deleted_guides?: string;
      new_guides?: File[];
    };
    if (desc) {
      formData.desc = desc;
    }
    if (newGuides.length > 0) {
      formData.new_guides = newGuides;
    }
    if (deleteGuides.length > 0) {
      formData.deleted_guides = deleteGuides.join(',');
    }

    const url = `/admin/workspace/update/${id}`;
    try {
      const {
        data: { result, code, message },
      }: AxiosResponse<IApi<IWorkspaceManagement>> = await axios.put(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (!result || code !== 'F000') {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  // 관리자 > 워크스페이스 관리 > 워크스페이스 상세
  async function detail(id: string) {
    const url = `/admin/workspace/${id}`;
    try {
      const {
        data: { result, code, message, data },
      }: AxiosResponse<IApi<IWorkspaceManagementDetail>> = await axios.get(url);
      if (result && code === 'F000') {
        setWorkspaceManagementDetail(data);
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  // 관리자 > 워크스페이스 관리 > 워크스페이스 삭제
  async function workspaceDelete(workspaceIds: string[]) {
    const formData = {
      workspace_ids: workspaceIds,
    };
    const url = '/admin/workspace/delete';
    try {
      const {
        data: { result, code, message },
      }: AxiosResponse<IApi> = await axios.post(url, formData);
      if (result && code === 'F000') {
        setWorkspaceManagement((prev) => {
          const newList = prev.list.filter((item) => !workspaceIds.includes(item.workspace_id));
          return {
            ...prev,
            list: newList,
            workSpaceCount: prev.workSpaceCount ? prev.workSpaceCount - workspaceIds.length : 0,
            resultCount: prev.resultCount ? prev.resultCount - workspaceIds.length : 0,
          };
        });
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  // 관리자 > 워크스페이스 관리 > 작업자 목록 조회
  async function workspaceUserList({ workspaceId, page, query }: { workspaceId: string; page: number; query?: string }) {
    const queryParing = query ? `?${qs.stringify({ query })}` : '';
    const url = `/admin/user/list/available/${workspaceId}/${page}${queryParing}`;
    try {
      const {
        data: { result, code, message, data },
      }: AxiosResponse<IApi<IUserManagement>> = await axios.get(url);
      if (result && code === 'F000') {
        setWorkspaceAvailableManagement({
          isLoading: false,
          list: data.users,
          totalPage: data.total_page,
          workerCount: 0,
          resultCount: data.result_count,
        });
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  // 관리자 > 워크스페이스 관리 > 작업자 목록 조회
  async function workspaceWorkerList({ workspaceId, page, type, query }: { workspaceId: string; page: number; type: string; query?: string }) {
    const queryData = {
      type,
    } as {
      query?: string;
    };
    if (query) {
      queryData.query = query;
    }
    const queryParing = qs.stringify(queryData);
    const url = `/admin/user/list/assign/${workspaceId}/${page}?${queryParing}`;
    try {
      const {
        data: { result, code, message, data },
      }: AxiosResponse<IApi<IUserManagement>> = await axios.get(url);
      if (result && code === 'F000') {
        setWorkspaceAssignManagement({
          isLoading: false,
          list: data.users,
          totalPage: data.total_page,
          workerCount: 0,
          resultCount: data.result_count,
        });
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  // 관리자 > 워크스페이스 관리 > 작업자 등록
  async function workspaceWorkerRegister({ type, userIds, workspaceId }: { type: string; userIds: string[]; workspaceId: string }) {
    const formData = {
      type,
      user_ids: userIds,
    };
    const url = `/admin/workspace/assign/${workspaceId}`;
    try {
      const {
        data: { result, code, message },
      }: AxiosResponse<IApi> = await axios.post(url, formData);
      if (!result || code !== 'F000') {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  // 워크스페이스 삭제
  async function workspaceWorkerDelete({ userIds, workspaceId }: { userIds: string[]; workspaceId: string }) {
    const formData = {
      user_ids: userIds,
    };
    const url = `/admin/workspace/unassign/${workspaceId}`;
    try {
      const {
        data: { result, code, message },
      }: AxiosResponse<IApi> = await axios.post(url, formData);
      if (!result || code !== 'F000') {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  function workspaceDetailReset() {
    setWorkspaceManagementDetail(null);
  }

  return {
    list,
    add,
    edit,
    detail,
    workspaceDelete,
    workspaceUserList,
    workspaceWorkerList,
    workspaceWorkerRegister,
    workspaceWorkerDelete,
    workspaceDetailReset,
  };
}

export { useWorkspaceManagementActions };
