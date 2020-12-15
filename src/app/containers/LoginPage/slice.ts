import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { User, UserDataState, GoogleAuthResponse } from 'types/User';

export const initialState: UserDataState = {
  user: {
    authenticated: false,
    email: '',
    name: '',
    token: '',
  },
};

const userDataSlice = createSlice({
  name: 'userDataState',
  initialState,
  reducers: {
    login(state, action: PayloadAction<GoogleAuthResponse>) {
      state.user.authenticated = false;
      // state.user = action.payload;
      // state.user.authenticated = true;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.user.authenticated = true;
    },
    logout(state, action: PayloadAction) {
      state.user.token = '';
      state.user.authenticated = false;
      state.user.email = '';
      state.user.name = '';
    },
  },
});

export const { actions, reducer, name: sliceKey } = userDataSlice;
