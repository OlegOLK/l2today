import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectData = (state: RootState) => state.serversData || initialState;

export const selectServersData = createSelector(
  [selectData],
  serversDataState => serversDataState.serversList,
);

export const selectJsonData = createSelector(
  [selectData],
  serversDataState => serversDataState.jsonData,
);

export const selectLoading = createSelector(
  [selectData],
  serversDataState => serversDataState.loading,
);

export const selectError = createSelector(
  [selectData],
  serversDataState => serversDataState.error,
);

export const selectFilter = createSelector(
  [selectData],
  serversDataState => serversDataState.serverFilter,
);

export const selectDataInitialized = createSelector(
  [selectData],
  serversDataState => serversDataState.dataWasInitialized,
);
