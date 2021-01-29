import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { UserServerDataState } from 'types/UserServer';
import { NewServer, UserServer } from 'types/Server';

export const initialState: UserServerDataState = {
  createdServerId: '',
  loading: false,
  userServersLoading: false,
  error: [],
  servers: [],
};

const userServerDataSlice = createSlice({
  name: 'userServerDataState',
  initialState,
  reducers: {
    createServer(state, action: PayloadAction<NewServer>) {
      state.loading = true;
    },
    getServers(state, action: PayloadAction) {
      state.userServersLoading = true;
    },
    setServersState(state, action: PayloadAction<UserServer[]>) {
      state.userServersLoading = false;
      state.servers = action.payload;
    },
    updateServerFromState(state, action: PayloadAction<UserServer>) {
      state.userServersLoading = true;
      // state.servers = action.payload;
    },
    setCreatedServerId(state, action: PayloadAction<string>) {
      state.createdServerId = action.payload;
    },
    setError(state, action: PayloadAction<string[]>) {
      state.error = action.payload;
      state.loading = false;
    },
    prune(state) {
      state.error = [];
      state.loading = false;
    },
    finishLoad(state) {
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = userServerDataSlice;
