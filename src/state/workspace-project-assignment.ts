import { atom, DefaultValue, selector } from 'recoil';
import { IWorkspaceProjectAssignmentList } from 'types/workspace-project-assignment-interface';

interface IWorkspaceProjectAssignmentState {
  isLoading: boolean;
  list: IWorkspaceProjectAssignmentList[];
}

const workspaceProjectAssignmentAtom = atom<IWorkspaceProjectAssignmentState>({
  key: 'workspaceProjectAssignmentState',
  default: {
    isLoading: true,
    list: [],
  },
});

const workspaceProjectAssignmentListSelector = selector<IWorkspaceProjectAssignmentList[]>({
  key: 'workspaceProjectAssignmentListSelector',
  get: ({ get }) => {
    const { list } = get(workspaceProjectAssignmentAtom);
    return list;
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(workspaceProjectAssignmentAtom, (prevState) => ({ ...prevState, list: newValue }));
  },
});

export { workspaceProjectAssignmentAtom, workspaceProjectAssignmentListSelector };
