import { AxiosResponse } from 'axios';
import qs from 'qs';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userManagementAtom, userManagementListSelector } from 'state/user-management';
import { workspaceCodeUserCategoryListSelector } from 'state/workspace-code';
import { IApi } from 'types/interface';
import { IUserManagement } from 'types/user-management-interface';
import axios from 'utils/axios';

function useUserManagementActions() {
  const setUserManagement = useSetRecoilState(userManagementAtom);
  const [userManagementList, setUserManagementList] = useRecoilState(userManagementListSelector);
  const setUserCategoryCode = useSetRecoilState(workspaceCodeUserCategoryListSelector);

  // 관리자 > 사용자 관리 > 사용자 목록
  async function list({ page, filter, query, startDate, endDate }: { page: number; filter?: string; query?: string; startDate?: string; endDate?: string }) {
    const queryData = {
      filter,
    } as {
      filter: string;
      query?: string;
      start_date?: string;
      end_date?: string;
    };

    if (query) {
      queryData.query = query;
    }
    if (startDate) {
      queryData.start_date = startDate;
    }
    if (endDate) {
      queryData.end_date = endDate;
    }

    const url = `/admin/user/list/${page}?${qs.stringify(queryData)}`;

    setUserManagement((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      const {
        data: { result, code, message, data },
      }: AxiosResponse<IApi<IUserManagement>> = await axios.get(url);
      if (result && code === 'F000') {
        setUserManagement({
          isLoading: false,
          list: data.users,
          totalPage: data.total_page,
          memberCount: data.member_count,
          resultCount: data.result_count,
        });
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  // 관리자 > 사용자 관리 > 비밀번호 초기화
  async function passwordReset(userId: string) {
    const url = `/admin/user/password/init/${userId}`;
    try {
      const {
        data: { result, code, message },
      }: AxiosResponse<IApi> = await axios.post(url);
      if (result && code === 'F000') {
        const newUserManagementList = [...userManagementList];
        const index = newUserManagementList.findIndex((user) => user.user_id === userId);
        const newUser = { ...newUserManagementList[index], is_pw_changed: false };
        setUserManagementList([...newUserManagementList.slice(0, index), newUser, ...newUserManagementList.slice(index + 1)]);
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  // 관리자 > 사용자 관리 > 사용자 삭제
  async function userDelete(userIds: string[]) {
    const formData = {
      user_ids: userIds,
    };
    const url = '/admin/user/delete';
    try {
      const {
        data: { result, code, message },
      }: AxiosResponse<IApi> = await axios.post(url, formData);
      if (result && code === 'F000') {
        setUserManagement((prev) => {
          const newList = prev.list.filter((item) => !userIds.includes(item.user_id));
          return {
            ...prev,
            list: newList,
            memberCount: prev.memberCount ? prev.memberCount - userIds.length : 0,
          };
        });
      } else {
        throw { code, message };
      }
    } catch (err) {
      throw err;
    }
  }

  // 관리자 > 사용자 관리 > 사용자 등록
  async function userRegister({ account, desc }: { account: string; desc?: string }) {
    const formData = {
      account,
    } as {
      account: string;
      desc?: string;
    };
    if (desc) {
      formData.desc = desc;
    }
    const url = '/admin/user';
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

  // 사용자 초기화 (다른페이지 이동시)
  async function userReset() {
    setUserManagement({
      list: [],
      isLoading: true,
      totalPage: 0,
      memberCount: 0,
      resultCount: 0,
    });
  }

  // 검색 카테고리 조회
  async function userSearchCategory() {
    try {
      setUserCategoryCode([
        {
          name: '사용자 ID',
          value: 'FILTER_US_CATEGORY_ID',
        },
        {
          name: '사용자 설명',
          value: 'FILTER_US_CATEGORY_DESC',
        },
      ]);
      // const url = `/code?code=FILTER_US_CATEGORY`;
      // const {
      //   data: { result, code, message, data },
      // }: AxiosResponse<IApi<ICode[]>> = await axios.get(url);
      // if (result || code === 'F000') {
      //   setUserCategoryCode(data.map((item) => ({ value: item.code, name: item.name })));
      // } else {
      //   throw { code, message };
      // }
    } catch (err) {
      throw err;
    }
  }

  return { list, passwordReset, userDelete, userRegister, userReset, userSearchCategory };
}

export { useUserManagementActions };
