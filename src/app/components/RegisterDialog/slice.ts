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

const userDataSlice = createSlice({
  name: 'userDataState',
  initialState,
  reducers: {
    login(state, action: PayloadAction<PasswordAuth>) {
      state.user.authenticated = false;
      state.loading = true;
    },
    loginGoogle(state, action: PayloadAction<GoogleAuthResponse>) {
      state.user.authenticated = false;
      state.loading = true;
    },
    register(state, action: PayloadAction<PasswordAuth>) {
      state.user.authenticated = false;
      state.loading = true;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.user.authenticated = true;
      state.loading = false;
      LocalPersistor.getInstance().setUser(state.user);
    },
    logout(state, action: PayloadAction) {
      state.user.token = '';
      state.user.authenticated = false;
      state.user.email = '';
      state.user.name = '';
      state.loading = false;
      LocalPersistor.getInstance().setUser(state.user);
    },
    setError(state, action: PayloadAction<string[]>) {
      state.error = action.payload;
      state.loading = false;
      state.user.authenticated = false;
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