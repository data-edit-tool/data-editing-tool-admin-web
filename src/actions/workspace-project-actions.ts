import { AxiosResponse } from 'axios';
import qs from 'qs';
import { useSetRecoilState } from 'recoil';
import {
  workspaceCodeProjectPostCodeListSelector,
  workspaceCodeProjectStatusCodeListSelector,
  workspaceCodeProjectToolTypeCodeListSelector,
  workspaceCodeProjectUploadCodeListSelector,
} from 'state/workspace-code';
import { workspaceProjectManagementAtom } from 'state/workspace-project-management';
import { IApi } from 'types/interface';
import { IWorkspaceProjectManagement } from 'types/workspace-project-management-interface';
import axios from 'utils/axios';
import { FILTER_PJ_CODE } from 'utils/code';

function useWorkspaceProjectActions() {
  const setWorkspaceProjectManagement = useSetRecoilState(workspaceProjectManagementAtom);
  const setWorkspaceProjectToolType = useSetRecoilState(workspaceCodeProjectToolTypeCodeListSelector);
  const setWorkspaceProjectUploadStatus = useSetRecoilState(workspaceCodeProjectUploadCodeListSelector);
  const setWorkspaceProjectStatus = useSetRecoilState(workspaceCodeProjectStatusCodeListSelector);
  const setWorkspaceProjectPostStatus = useSetRecoilState(workspaceCodeProjectPostCodeListSelector);

  // 프로젝트 리스트 조회
  async function list({
    workspaceId,
    page = 1,
    toolType,
    uploadStatus,
    projectStatus,
    postStatus,
    query,
    startDate,
    endDate,
  }: {
    workspaceId: string;
    page?: number;
    toolType: string | number;
    uploadStatus: string | number;
    projectStatus: string | number;
    postStatus: string | number;
    query: string;
    startDate: string | null;
    endDate: string | null;
  }) {
    const queryData = {} as {
      tool_type?: string | number;
      upload_status?: string | number;
      project_status?: string | number;
      post_status?: string | number;
      query?: string;
      start_date?: string;
      end_date?: string;
    };
    if (toolType) {
      queryData.tool_type = toolType;
    }
    if (uploadStatus) {
      queryData.upload_status = uploadStatus;
    }
    if (projectStatus) {
      queryData.project_status = projectStatus;
    }
    if (postStatus) {
      queryData.post_status = postStatus;
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
    const url = `/admin/project/list/${workspaceId}/${page}${queryParing ? `?${queryParing}` : ''}`;
    try {
      const {
        data: { result, code, message, data },
      }: AxiosResponse<IApi<IWorkspaceProjectManagement>> = await axios.get(url);
      if (result && code === 'F000') {
        setWorkspaceProjectManagement({
          isLoading: false,
          list: data.projects,
          totalPage: data.total_page,
          projectCount: data.project_count,
          resultCount: data.result_count,
        });
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  // 프로젝트 게시중, 일시정지 처리
  async function projectPost({ workspaceId, projectIds, postStatus }: { workspaceId: string; projectIds: string[]; postStatus: string }) {
    const url = `/admin/project/post-status/${workspaceId}`;
    const formData = {
      post_status: postStatus,
      project_ids: projectIds,
    };
    try {
      const {
        data: { result, code, message },
      }: AxiosResponse<IApi> = await axios.post(url, formData);
      if (!result || code !== 'F000') {
        throw { code, message };
      }
      if (postStatus === 'PJ_POST_ST_ON') {
        setWorkspaceProjectManagement((prev) => {
          const newList = prev.list.map((item) => {
            if (projectIds.includes(item.project_id)) {
              return { ...item, post_status: '게시중' };
            }
            return item;
          });
          return { ...prev, list: newList };
        });
      } else if (postStatus === 'PJ_POST_ST_OFF') {
        setWorkspaceProjectManagement((prev) => {
          const newList = prev.list.map((item) => {
            if (projectIds.includes(item.project_id)) {
              return { ...item, post_status: '일시정지' };
            }
            return item;
          });
          return { ...prev, list: newList };
        });
      }
    } catch (err) {
      throw err;
    }
  }

  // 프로젝트 삭제
  async function projectDelete({ workspaceId, projectIds }: { workspaceId: string; projectIds: string[] }) {
    const url = `/admin/project/delete/${workspaceId}`;
    const formData = {
      project_ids: projectIds,
    };
    try {
      const {
        data: { result, code, message },
      }: AxiosResponse<IApi> = await axios.post(url, formData);
      if (!result || code !== 'F000') {
        throw { code, message };
      }
      setWorkspaceProjectManagement((prev) => {
        const newList = prev.list.filter((item) => !projectIds.includes(item.project_id));
        return {
          ...prev,
          list: newList,
          projectCount: prev.projectCount ? prev.projectCount - projectIds.length : prev.projectCount,
          resultCount: prev.resultCount ? prev.resultCount - projectIds.length : prev.resultCount,
        };
      });
    } catch (err) {
      throw err;
    }
  }

  // 프로젝트 검색 필터 리스트 조회
  async function projectToolTypeCodeList() {
    try {
      setWorkspaceProjectToolType(FILTER_PJ_CODE['FILTER_PJ_TOOL_TYPE'].map((item) => ({ name: item.name, value: item.code })));

      // const url = `/code?code=FILTER_PJ_TOOL_TYPE`;
      // const {
      //   data: { result, code, message, data },
      // }: AxiosResponse<IApi<ICode[]>> = await axios.get(url);
      // if (result && code === 'F000') {
      //   setWorkspaceProjectToolType(data.map((item) => ({ name: item.name, value: item.code })));
      // } else {
      //   throw { code, message };
      // }
    } catch (err) {
      throw err;
    }
  }

  // 프로젝트 검색 필터 리스트 조회
  async function projectUploadCodeList() {
    try {
      setWorkspaceProjectUploadStatus(FILTER_PJ_CODE['FILTER_PJ_UPLOAD_STATUS'].map((item) => ({ name: item.name, value: item.code })));

      // const url = `/code?code=FILTER_PJ_UPLOAD_STATUS`;
      // const {
      //   data: { result, code, message, data },
      // }: AxiosResponse<IApi<ICode[]>> = await axios.get(url);
      // if (result && code === 'F000') {
      //   setWorkspaceProjectUploadStatus(data.map((item) => ({ name: item.name, value: item.code })));
      // } else {
      //   throw { code, message };
      // }
    } catch (err) {
      throw err;
    }
  }

  // 프로젝트 검색 필터 리스트 조회
  async function projectStatusCodeList() {
    try {
      setWorkspaceProjectStatus(FILTER_PJ_CODE['FILTER_PJ_PROJECT_STATUS'].map((item) => ({ name: item.name, value: item.code })));

      // const url = `/code?code=FILTER_PJ_PROJECT_STATUS`;
      // const {
      //   data: { result, code, message, data },
      // }: AxiosResponse<IApi<ICode[]>> = await axios.get(url);
      // if (result && code === 'F000') {
      //   setWorkspaceProjectStatus(data.map((item) => ({ name: item.name, value: item.code })));
      // } else {
      //   throw { code, message };
      // }
    } catch (err) {
      throw err;
    }
  }

  // 프로젝트 검색 필터 리스트 조회
  async function projectPostCodeCodeList() {
    try {
      setWorkspaceProjectPostStatus(FILTER_PJ_CODE['FILTER_PJ_POST_STATUS'].map((item) => ({ name: item.name, value: item.code })));

      // const url = `/code?code=FILTER_PJ_POST_STATUS`;
      // const {
      //   data: { result, code, message, data },
      // }: AxiosResponse<IApi<ICode[]>> = await axios.get(url);
      // if (result && code === 'F000') {
      //   setWorkspaceProjectPostStatus(data.map((item) => ({ name: item.name, value: item.code })));
      // } else {
      //   throw { code, message };
      // }
    } catch (err) {
      throw err;
    }
  }

  return { list, projectPost, projectDelete, projectToolTypeCodeList, projectUploadCodeList, projectStatusCodeList, projectPostCodeCodeList };
}

export { useWorkspaceProjectActions };
