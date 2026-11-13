import { atom, DefaultValue, selector } from 'recoil';
import { IUserManagementUser } from 'types/user-management-interface';

interface IWorkspaceAssignManagementState {
  isLoading: boolean;
  list: IUserManagementUser[];
  totalPage: number | null;
  workerCount: number | null;
  resultCount: number | null;
}

const workspaceAssignManagementAtom = atom<IWorkspaceAssignManagementState>({
  key: 'workspaceAssignManagementState',
  default: {
    isLoading: true,
    list: [],
    totalPage: null,
    workerCount: null,
    resultCount: null,
  },
});

const workspaceAssignManagementListSelector = selector<IUserManagementUser[]>({
  key: 'workspaceAssignManagementListSelector',
  get: ({ get }) => {
    const { list } = get(workspaceAssignManagementAtom);
    return list;
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(workspaceAssignManagementAtom, (prevState) => ({ ...prevState, list: newValue }));
  },
});

const workspaceAssignManagementResultCountSelector = selector<number | null>({
  key: 'workspaceAssignManagementResultCountSelector',
  get: ({ get }) => {
    const { resultCount } = get(workspaceAssignManagementAtom);
    return resultCount;
  },
});

export { workspaceAssignManagementAtom, workspaceAssignManagementListSelector, workspaceAssignManagementResultCountSelector };
