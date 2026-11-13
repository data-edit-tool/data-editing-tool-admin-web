import { atom, DefaultValue, selector } from 'recoil';
import { IUser } from 'types/auth-interface';

export interface IAuthState {
  user: IUser | null;
  initLoading: boolean;
}

const authAtom = atom<IAuthState>({
  key: 'authState',
  default: {
    user: null,
    initLoading: true,
  },
});

const authInitLoadingSelector = selector<boolean>({
  key: 'authInitLoading',
  get: ({ get }) => {
    const { initLoading } = get(authAtom);
    return initLoading;
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(authAtom, (prevState) => ({ ...prevState, initLoading: newValue }));
  },
});

const authUserSelector = selector<IUser | null>({
  key: 'userSelector',
  get: ({ get }) => {
    const { user } = get(authAtom);
    return user;
  },
});

export { authAtom, authInitLoadingSelector, authUserSelector };
