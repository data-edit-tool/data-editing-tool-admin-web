import { atom, selector } from 'recoil';
import { IWorkspaceProjectList } from 'types/workspace-project-management-interface';

interface IWorkspaceProjectManagementState {
  isLoading: boolean;
  list: IWorkspaceProjectList[];
  totalPage: number | null;
  projectCount: number | null;
  resultCount: number | null;
}

const workspaceProjectManagementAtom = atom<IWorkspaceProjectManagementState>({
  key: 'workspaceProjectManagementState',
  default: {
    isLoading: true,
    list: [],
    totalPage: null,
    projectCount: null,
    resultCount: null,
  },
});

const workspaceProjectManagementListSelector = selector<IWorkspaceProjectList[]>({
  key: 'workspaceProjectManagementListSelector',
  get: ({ get }) => {
    const { list } = get(workspaceProjectManagementAtom);
    return list;
  },
});

export { workspaceProjectManagementAtom, workspaceProjectManagementListSelector };
