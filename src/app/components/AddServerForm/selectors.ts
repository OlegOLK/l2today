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
