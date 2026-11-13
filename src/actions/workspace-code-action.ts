import { AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';
import { workspaceCodeAtom, workspaceCodeCategoryCodeListSelector, workspaceCodeStatusCodeListSelector } from 'state/workspace-code';
import { IApi, ICategoryClient, ICode } from 'types/interface';
import axios from 'utils/axios';
import { FILTER_PJ_CODE, FILTER_WS } from 'utils/code';

function useWorkspaceCodeActions() {
  const setWorkspaceCode = useSetRecoilState(workspaceCodeAtom);
  const setWorkspaceStatusList = useSetRecoilState(workspaceCodeStatusCodeListSelector);
  const setWorkspaceCategoryList = useSetRecoilState(workspaceCodeCategoryCodeListSelector);

  // 워크스페이스 목록 조회
  async function list(code: string) {
    // const url = `/code?code=${code}`;
    try {
      const codeList = getFilterOptionsSafe(code);
      if (codeList && codeList.length > 0) {
        setWorkspaceCode((prev) => ({
          ...prev,
          list: codeList,
        }));
      }
      // const {
      //   data: { result, code, message, data },
      // }: AxiosResponse<IApi<ICode[]>> = await axios.get(url);
      // if (result && code === 'F000') {
      //   setWorkspaceCode((prev) => ({
      //     ...prev,
      //     list: data,
      //   }));
      // } else {
      //   throw { code, message };
      // }
    } catch (err) {
      throw err;
    }
  }

  // 워크스페이스 가공유형 조회
  async function manufacturingList(code: string) {
    // const url = `/code?code=${code}`;
    try {
      const codeList = getFilterOptionsSafe(code);
      if (codeList && codeList.length > 0) {
        setWorkspaceCode((prev) => ({
          ...prev,
          manufacturingList: codeList,
        }));
      }
      // const {
      //   data: { result, code, message, data },
      // }: AxiosResponse<IApi<ICode[]>> = await axios.get(url);
      // if (result && code === 'F000') {
      //   setWorkspaceCode((prev) => ({
      //     ...prev,
      //     manufacturingList: data,
      //   }));
      // } else {
      //   throw { code, message };
      // }
    } catch (err) {
      throw err;
    }
  }

  function getFilterOptionsSafe(key: string): ICode[] {
    return FILTER_PJ_CODE[key] ?? [];
  }

  // 워크스페이스 카테고리 조회
  async function categoryClientList(code: string): Promise<ICategoryClient[]> {
    const url = `/admin/category/client?tool_type_code=${code}`;
    try {
      const {
        data: { result, code, message, data },
      }: AxiosResponse<IApi<ICategoryClient[]>> = await axios.get(url);
      if (result && code === 'F000') {
        setWorkspaceCode((prev) => ({
          ...prev,
          categoryClientList: data,
        }));
        return data;
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  // 검색 필터 (상태값 조회)
  async function workspaceStatusList() {
    // const url = `/code?code=FILTER_WS_ST`;
    try {
      setWorkspaceStatusList(FILTER_WS.FILTER_WS_ST);
      // const {
      //   data: { result, code, message, data },
      // }: AxiosResponse<IApi<ICode[]>> = await axios.get(url);
      // if (result && code === 'F000') {
      //   setWorkspaceStatusList(data.map((item) => ({ name: item.name, value: item.code })));
      // } else {
      //   throw { code, message };
      // }
    } catch (err) {
      throw err;
    }
  }

  // 검색 카테고리 목록 조회
  async function workspaceCategoryList() {
    // const url = `/code?code=FILTER_WS_CATEGORY`;
    try {
      setWorkspaceCategoryList(FILTER_WS.FILTER_WS_CATEGORY);
      // const {
      //   data: { result, code, message, data },
      // }: AxiosResponse<IApi<ICode[]>> = await axios.get(url);
      // if (result && code === 'F000') {
      //   setWorkspaceCategoryList(data.map((item) => ({ name: item.name, value: item.code })));
      // } else {
      //   throw { code, message };
      // }
    } catch (err) {
      throw err;
    }
  }

  return { list, manufacturingList, categoryClientList, workspaceStatusList, workspaceCategoryList };
}

export { useWorkspaceCodeActions };
