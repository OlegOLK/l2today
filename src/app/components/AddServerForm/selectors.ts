import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectData = (state: RootState) =>
  state.userServerDataState || initialState;

export const selectIsLoading = createSelector(
  [selectData],
  userDataState => userDataState.loading,
);

export const selectError = createSelector(
  [selectData],
  userDataState => userDataState.error,
);

export const selectCreatedServerId = createSelector(
  [selectData],
  userDataState => userDataState.createdServerId,
);

export const selectServers = createSelector(
  [selectData],
  userDataState => userDataState.servers,
);

export const selectServerById = (id: string) =>
  createSelector([selectData], userDataState =>
    userDataState.servers.find(x => x.id === id),
  );
