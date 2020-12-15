import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import {
  ServersDataState,
  ServersList,
  ServerResponseErrorType,
  Server,
} from 'types/Server';
// import { Repo } from 'types/Repo';

// The initial state of the GithubRepoForm container
export const initialState: ServersDataState = {
  jsonData: [],
  serversList: [],
  loading: true,
  error: null,
  serverFilter: 'all',
  dataWasInitialized: false,
};

const serversDataSlice = createSlice({
  name: 'serversData',
  initialState,
  reducers: {
    changeServerFilters(state, action: PayloadAction<string>) {
      state.serverFilter = action.payload;
    },
    loadServers(state) {
      state.loading = true;
      state.error = null;
      state.serversList = [];
    },
    dataLoaded(state, action: PayloadAction<Server[]>) {
      state.jsonData = action.payload;
    },
    serversLoaded(state, action: PayloadAction<ServersList[]>) {
      const servers = action.payload;
      state.serversList = servers;
      state.loading = false;
      if (!state.dataWasInitialized) {
        state.dataWasInitialized = true;
      }
    },
    repoError(state, action: PayloadAction<ServerResponseErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = serversDataSlice;
