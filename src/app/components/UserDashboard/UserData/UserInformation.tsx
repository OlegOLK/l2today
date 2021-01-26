import React, { FunctionComponent } from 'react';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { userFromSaga } from 'app/components/RegisterDialog/saga';
import { sliceKey, reducer } from 'app/components/RegisterDialog/slice';
import { selectUser } from 'app/components/RegisterDialog/selectors';
import { useSelector } from 'react-redux';

export const UserInformation: FunctionComponent = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: userFromSaga });
  const user = useSelector(selectUser);
  return (
    <div>
      User info
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>balance</p>
      <p>quizes</p>
      <p>change password etc.</p>
    </div>
  );
};
