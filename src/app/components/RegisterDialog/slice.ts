import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import {
  User,
  UserDataState,
  GoogleAuthResponse,
  PasswordAuth,
} from 'types/User';
import { LocalPersistor } from 'store/persist';

export const initialState: UserDataState = {
  user: LocalPersistor.getInstance().getUser(),
  loading: false,
  error: [],
};
const EMPTY: User = { authenticated: false, email: '', name: '', token: '' };
const userDataSlice = createSlice({
  name: 'userDataState',
  initialState,
  reducers: {
    login(state, action: PayloadAction<PasswordAuth>) {
      state.user = EMPTY;
      state.loading = true;
    },
    loginGoogle(state, action: PayloadAction<GoogleAuthResponse>) {
      state.user = EMPTY;
      state.loading = true;
    },
    register(state, action: PayloadAction<PasswordAuth>) {
      state.user = EMPTY;
      state.loading = true;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loading = false;
      LocalPersistor.getInstance().setUser(state.user);
    },
    logout(state, action: PayloadAction) {
      state.user = EMPTY;
      state.loading = false;
      LocalPersistor.getInstance().setUser(state.user);
    },
    setError(state, action: PayloadAction<string[]>) {
      state.error = action.payload;
      state.loading = false;
      state.user = EMPTY;
    },
    prune(state, action: PayloadAction) {
      state.error = [];
      state.loading = false;
    },
    finishLoad(state, action: PayloadAction) {
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = userDataSlice;
