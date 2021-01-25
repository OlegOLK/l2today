import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { UserServerDataState } from 'types/UserServer';
import { NewServer } from 'types/Server';

export const initialState: UserServerDataState = {
  createdServerId: '',
  loading: false,
  error: [],
};

const userServerDataSlice = createSlice({
  name: 'userServerDataState',
  initialState,
  reducers: {
    createServer(state, action: PayloadAction<NewServer>) {
      state.loading = true;
    },
    setCreatedServerId(state, action: PayloadAction<string>) {
      state.createdServerId = action.payload;
    },
    setError(state, action: PayloadAction<string[]>) {
      state.error = action.payload;
      state.loading = false;
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

export const { actions, reducer, name: sliceKey } = userServerDataSlice;
