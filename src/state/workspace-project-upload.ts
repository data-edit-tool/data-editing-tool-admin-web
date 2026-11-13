import { atom, DefaultValue, selector } from 'recoil';
import { IWorkspaceProjectCompleteUploadFile, IWorkspaceProjectUploadFileList, IWorkspaceProjectUploadList } from 'types/workspace-project-upload-interface';

interface IWorkspaceProjectUploadState {
  isLoading: boolean;
  totalCount: string;
  successCount: string;
  errorCount: string;
  totalPage: number | null;
  projectName: string;
  list: IWorkspaceProjectUploadList[];
  uploadFileList: {
    title: string;
    workspaceId: string;
    projectId: string[];
    list: IWorkspaceProjectUploadFileList[];
  };
  completeUploadFile: IWorkspaceProjectCompleteUploadFile | null;
  fileSuccessCount: number;
  uploadStatus: boolean;
}

// 업로드 구조
const workspaceProjectUploadAtom = atom<IWorkspaceProjectUploadState>({
  key: 'workspaceProjectUploadState',
  default: {
    isLoading: true,
    totalCount: '',
    successCount: '',
    errorCount: '',
    totalPage: null,
    projectName: '',
    list: [],
    uploadFileList: {
      title: '',
      workspaceId: '',
      projectId: [],
      list: [],
    },
    completeUploadFile: null,
    fileSuccessCount: 0,
    uploadStatus: false,
  },
});

const workspaceProjectUploadListSelector = selector<IWorkspaceProjectUploadList[]>({
  key: 'workspaceProjectUploadListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(workspaceProjectUploadAtom, (prevState) => ({ ...prevState, list: newValue }));
  },
  get: ({ get }) => {
    const { list } = get(workspaceProjectUploadAtom);
    return list;
  },
});

const workspaceProjectUploadFileListSelector = selector<{
  title: string;
  list: IWorkspaceProjectUploadFileList[];
  workspaceId: string;
  projectId: string[];
}>({
  key: 'workspaceProjectUploadFileListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(workspaceProjectUploadAtom, (prevState) => ({ ...prevState, uploadFileList: newValue }));
  },
  get: ({ get }) => {
    const { uploadFileList } = get(workspaceProjectUploadAtom);
    return uploadFileList;
  },
});

const workspaceProjectUploadCompleteFileSelector = selector<IWorkspaceProjectCompleteUploadFile | null>({
  key: 'workspaceProjectUploadCompleteFileSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(workspaceProjectUploadAtom, (prevState) => ({ ...prevState, completeUploadFile: newValue }));
  },
  get: ({ get }) => {
    const { completeUploadFile } = get(workspaceProjectUploadAtom);
    return completeUploadFile;
  },
});

const workspaceProjectUploadFileSuccessCountSelector = selector<number>({
  key: 'workspaceProjectUploadFileSuccessCountSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(workspaceProjectUploadAtom, (prevState) => ({ ...prevState, fileSuccessCount: newValue }));
  },
  get: ({ get }) => {
    const { fileSuccessCount } = get(workspaceProjectUploadAtom);
    return fileSuccessCount;
  },
});

const workspaceProjectUploadStatusSelector = selector<boolean>({
  key: 'workspaceProjectUploadStatusSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(workspaceProjectUploadAtom, (prevState) => ({ ...prevState, uploadStatus: newValue }));
  },
  get: ({ get }) => {
    const { uploadStatus } = get(workspaceProjectUploadAtom);
    return uploadStatus;
  },
});

export {
  workspaceProjectUploadAtom,
  workspaceProjectUploadListSelector,
  workspaceProjectUploadFileListSelector,
  workspaceProjectUploadCompleteFileSelector,
  workspaceProjectUploadFileSuccessCountSelector,
  workspaceProjectUploadStatusSelector,
};
