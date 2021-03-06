import { call, takeLatest, put } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from './slice';

export function* loginGoogle(response) {
  const requestURL = `${
    process.env.REACT_APP_SERVERURL || 'https://l2newfrontserver.herokuapp.com'
  }/user/google/login`; //'https://l2newfrontserver.herokuapp.com/user/google/login'; //
  try {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ token: response.payload.accessToken }),
      mode: 'cors',
      cache: 'default',
      headers: headers,
    });

    yield put(
      actions.setUser({
        authenticated: true,
        token: data.token,
        email: data.email,
        name: data.userName,
      }),
    );
  } catch (err) {
    yield catchError(err);
  } finally {
    yield put(actions.finishLoad());
  }
}

export function* login(response) {
  const requestURL = `${
    process.env.REACT_APP_SERVERURL || 'https://l2newfrontserver.herokuapp.com'
  }/user/login`; //'https://l2newfrontserver.herokuapp.com/user/login'; //'https://localhost:44362/user/login';
  try {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({
        Email: response.payload.email,
        Password: response.payload.password,
      }),
      mode: 'cors',
      cache: 'default',
      headers: headers,
    });

    yield put(
      actions.setUser({
        authenticated: true,
        token: data.token,
        email: data.email,
        name: data.userName,
      }),
    );
  } catch (err) {
    yield catchError(err);
  } finally {
    yield put(actions.finishLoad());
  }
}

export function* register(reg) {
  const { email, password } = reg.payload;
  const requestURL = `${
    process.env.REACT_APP_SERVERURL || 'https://l2newfrontserver.herokuapp.com'
  }/user/register`; //'https://l2newfrontserver.herokuapp.com/user/register'; //'https://localhost:44362/user/register';
  try {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({
        Email: email,
        Password: password,
        ConfirmPassword: password,
      }),
      mode: 'cors',
      cache: 'default',
      headers: headers,
    });

    yield put(
      actions.setUser({
        authenticated: true,
        token: data.token,
        email: data.email,
        name: data.email,
      }),
    );
  } catch (err) {
    yield catchError(err);
  } finally {
    yield put(actions.finishLoad());
  }
}

export function* catchError(err) {
  if (err.response?.status === 401) {
    yield put(actions.setError(['Bad credentials']));
  } else if (err.message === 'Failed to fetch') {
    yield put(actions.setError(['Server is unavailable.']));
  } else {
    yield put(actions.setError(JSON.parse(err.message)));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* userFromSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.login.type, login);
  yield takeLatest(actions.loginGoogle.type, loginGoogle);
  yield takeLatest(actions.register.type, register);
}
