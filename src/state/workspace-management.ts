import { atom, DefaultValue, selector } from 'recoil';
import { IWorkspaceManagementDetail, IWorkspaceManagementList } from 'types/workspace-management-interface';

interface IWorkspaceManagementState {
  isLoading: boolean;
  list: IWorkspaceManagementList[];
  totalPage: number | null;
  workSpaceCount: number | null;
  resultCount: number | null;
  detail: IWorkspaceManagementDetail | null;
}

const workspaceManagementAtom = atom<IWorkspaceManagementState>({
  key: 'workspaceManagementState',
  default: {
    isLoading: true,
    list: [],
    totalPage: null,
    resultCount: null,
    workSpaceCount: null,
    detail: null,
  },
});

const workspaceManagementDetailSelector = selector<IWorkspaceManagementDetail | null>({
  key: 'workspaceManagementDetailSelector',
  get: ({ get }) => {
    const { detail } = get(workspaceManagementAtom);
    return detail;
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(workspaceManagementAtom, (prevState) => ({ ...prevState, detail: newValue }));
  },
});

const workspaceManagementListSelector = selector<IWorkspaceManagementList[]>({
  key: 'workspaceManagementListSelector',
  get: ({ get }) => {
    const { list } = get(workspaceManagementAtom);
    return list;
  },
});

export { workspaceManagementAtom, workspaceManagementDetailSelector, workspaceManagementListSelector };
