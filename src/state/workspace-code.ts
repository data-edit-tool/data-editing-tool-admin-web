import { atom, DefaultValue, selector } from 'recoil';
import { ICategoryClient, ICode, IOption } from 'types/interface';

interface IWorkspaceCodeState {
  list: ICode[];
  manufacturingList: ICode[];
  categoryClientList: ICategoryClient[];
  userCategory: IOption[];
  workspaceStatusCode: IOption[];
  workspaceCategoryCode: IOption[];
  projectToolTypeCode: IOption[];
  projectUploadCode: IOption[];
  projectStatusCode: IOption[];
  projectPostCode: IOption[];
}

// 검색 코드 모음
const workspaceCodeAtom = atom<IWorkspaceCodeState>({
  key: 'workspaceCodeState',
  default: {
    list: [],
    manufacturingList: [],
    categoryClientList: [],
    userCategory: [],
    workspaceStatusCode: [],
    workspaceCategoryCode: [],
    projectToolTypeCode: [],
    projectUploadCode: [],
    projectStatusCode: [],
    projectPostCode: [],
  },
});

const workspaceCodeListSelector = selector<ICode[]>({
  key: 'workspaceCodeListSelector',
  get: ({ get }) => {
    const { list } = get(workspaceCodeAtom);
    return list;
  },
});

const workspaceCodeManufacturingListSelector = selector<ICode[]>({
  key: 'workspaceCodeManufacturingListSelector',
  get: ({ get }) => {
    const { manufacturingList } = get(workspaceCodeAtom);
    return manufacturingList;
  },
});

const workspaceCodeCategoryClientListSelector = selector<ICategoryClient[]>({
  key: 'workspaceCodeCategoryClientListSelector',
  get: ({ get }) => {
    const { categoryClientList } = get(workspaceCodeAtom);
    return categoryClientList;
  },
});

const workspaceCodeUserCategoryListSelector = selector<IOption[]>({
  key: 'workspaceCodeUserCategoryListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(workspaceCodeAtom, (prevState) => ({ ...prevState, userCategory: newValue }));
  },
  get: ({ get }) => {
    const { userCategory } = get(workspaceCodeAtom);
    return userCategory;
  },
});

const workspaceCodeStatusCodeListSelector = selector<IOption[]>({
  key: 'workspaceCodeStatusCodeListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(workspaceCodeAtom, (prevState) => ({ ...prevState, workspaceStatusCode: newValue }));
  },
  get: ({ get }) => {
    const { workspaceStatusCode } = get(workspaceCodeAtom);
    return workspaceStatusCode;
  },
});

const workspaceCodeCategoryCodeListSelector = selector<IOption[]>({
  key: 'workspaceCodeCategoryCodeListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(workspaceCodeAtom, (prevState) => ({ ...prevState, workspaceCategoryCode: newValue }));
  },
  get: ({ get }) => {
    const { workspaceCategoryCode } = get(workspaceCodeAtom);
    return workspaceCategoryCode;
  },
});

const workspaceCodeProjectToolTypeCodeListSelector = selector<IOption[]>({
  key: 'workspaceCodeProjectToolTypeCodeListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(workspaceCodeAtom, (prevState) => ({ ...prevState, projectToolTypeCode: newValue }));
  },
  get: ({ get }) => {
    const { projectToolTypeCode } = get(workspaceCodeAtom);
    return projectToolTypeCode;
  },
});

const workspaceCodeProjectUploadCodeListSelector = selector<IOption[]>({
  key: 'workspaceCodeProjectUploadCodeListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(workspaceCodeAtom, (prevState) => ({ ...prevState, projectUploadCode: newValue }));
  },
  get: ({ get }) => {
    const { projectUploadCode } = get(workspaceCodeAtom);
    return projectUploadCode;
  },
});

const workspaceCodeProjectStatusCodeListSelector = selector<IOption[]>({
  key: 'workspaceCodeProjectStatusCodeListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(workspaceCodeAtom, (prevState) => ({ ...prevState, projectStatusCode: newValue }));
  },
  get: ({ get }) => {
    const { projectStatusCode } = get(workspaceCodeAtom);
    return projectStatusCode;
  },
});

const workspaceCodeProjectPostCodeListSelector = selector<IOption[]>({
  key: 'workspaceCodeProjectPostCodeListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(workspaceCodeAtom, (prevState) => ({ ...prevState, projectPostCode: newValue }));
  },
  get: ({ get }) => {
    const { projectPostCode } = get(workspaceCodeAtom);
    return projectPostCode;
  },
});

export {
  workspaceCodeAtom,
  workspaceCodeListSelector,
  workspaceCodeManufacturingListSelector,
  workspaceCodeCategoryClientListSelector,
  workspaceCodeUserCategoryListSelector,
  workspaceCodeStatusCodeListSelector,
  workspaceCodeCategoryCodeListSelector,
  workspaceCodeProjectToolTypeCodeListSelector,
  workspaceCodeProjectUploadCodeListSelector,
  workspaceCodeProjectStatusCodeListSelector,
  workspaceCodeProjectPostCodeListSelector,
};
