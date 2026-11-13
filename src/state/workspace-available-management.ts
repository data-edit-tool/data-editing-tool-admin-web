import { atom, DefaultValue, selector } from 'recoil';
import { IUserManagementUser } from 'types/user-management-interface';

interface IWorkspaceAvailableManagementState {
  isLoading: boolean;
  list: IUserManagementUser[];
  totalPage: number | null;
  workerCount: number | null;
  resultCount: number | null;
}

const workspaceAvailableManagementAtom = atom<IWorkspaceAvailableManagementState>({
  key: 'workspaceAvailableManagementState',
  default: {
    isLoading: true,
    list: [],
    totalPage: null,
    workerCount: null,
    resultCount: null,
  },
});

// 작업 가능한 사용자 목록
const workspaceAvailableManagementListSelector = selector<IUserManagementUser[]>({
  key: 'workspaceAvailableManagementListSelector',
  get: ({ get }) => {
    const { list } = get(workspaceAvailableManagementAtom);
    return list;
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(workspaceAvailableManagementAtom, (prevState) => ({ ...prevState, list: newValue }));
  },
});

// 작업 가능한 사용자 수
const workspaceAvailableManagementResultCountSelector = selector<number | null>({
  key: 'workspaceAvailableManagementResultCountSelector',
  get: ({ get }) => {
    const { resultCount } = get(workspaceAvailableManagementAtom);
    return resultCount;
  },
});

export { workspaceAvailableManagementAtom, workspaceAvailableManagementListSelector, workspaceAvailableManagementResultCountSelector };
