import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectData = (state: RootState) => state.userDataState || initialState;

export const selectName = createSelector(
  [selectData],
  userDataState => userDataState.user.name,
);

export const selectIsAuthenticated = createSelector(
  [selectData],
  userDataState => userDataState.user.authenticated,
);

export const selectToken = createSelector(
  [selectData],
  userDataState => userDataState.user.token,
);

export const selectEmail = createSelector(
  [selectData],
  userDataState => userDataState.user.email,
);
