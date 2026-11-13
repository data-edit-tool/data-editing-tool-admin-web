import { atom, DefaultValue, selector } from 'recoil';
import { IUserManagementUser } from 'types/user-management-interface';

interface IUserManagementState {
  isLoading: boolean;
  list: IUserManagementUser[];
  totalPage: number | null;
  memberCount: number | null;
  resultCount: number | null;
}

const userManagementAtom = atom<IUserManagementState>({
  key: 'userManagementState',
  default: {
    isLoading: true,
    list: [],
    totalPage: null,
    memberCount: null,
    resultCount: null,
  },
});

// 사용자 목록
const userManagementListSelector = selector<IUserManagementUser[]>({
  key: 'userManagementListSelector',
  get: ({ get }) => {
    const { list } = get(userManagementAtom);
    return list;
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(userManagementAtom, (prevState) => ({ ...prevState, list: newValue }));
  },
});

export { userManagementAtom, userManagementListSelector };
