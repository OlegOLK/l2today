import { call, takeLatest, put } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from './slice';

/**
 * Server list request/response handler
 */
export function* login(response) {
  const requestURL = 'https://localhost:44362/user/google/login';
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

    console.log(data, 'DATA');
    yield put(
      actions.setUser({
        authenticated: true,
        token: data.token,
        email: data.email,
        name: data.userName,
      }),
    );
  } catch (err) {
    console.log(err);
  } finally {
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
}
