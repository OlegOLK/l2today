import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, reducer } from '../../components/RegisterDialog/slice';
import { selectIsAuthenticated } from '../../components/RegisterDialog/selectors';
import { userFromSaga } from '../../components/RegisterDialog/saga';

import { Grid } from '@material-ui/core';

import { AddServerForm } from '../../components/AddServerForm/index';

export function AddServerPage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: userFromSaga });
  const history = useHistory();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const useEffectOnAuthenticated = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, [isAuthenticated]);
  };

  useEffectOnAuthenticated(() => {
    if (!isAuthenticated) {
      history.push('/');
    }
  });

  return (
    <Grid container direction="row" justify="space-between" spacing={2}>
      <AddServerForm />
    </Grid>
  );
}
