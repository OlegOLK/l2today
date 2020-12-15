import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { sliceKey, reducer, actions } from './slice';
import { userFromSaga } from './saga';
import { selectEmail, selectIsAuthenticated } from './selectors';

export function LoginPage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: userFromSaga });
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const email = useSelector(selectEmail);

  const googleResponse = response => {
    console.log(response);
    dispatch(
      actions.login({ accessToken: response.getAuthResponse().id_token }),
    );
  };

  const logout = () => {};

  let content = !!isAuthenticated ? (
    <div>
      <p>Authenticated</p>
      <div>{email}</div>
      <div>
        <button onClick={logout} className="button">
          Log out
        </button>
      </div>
    </div>
  ) : (
    <div>
      <GoogleLogin
        clientId="519365439057-oi91pp77935c4pam7uka6a2qqs7k401j.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={googleResponse}
        onFailure={googleResponse}
      />
    </div>
  );

  return <div className="App">{content}</div>;
}
