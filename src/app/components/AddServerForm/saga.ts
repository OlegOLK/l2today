import { call, takeLatest, put, select } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from './slice';
import { selectToken } from '../RegisterDialog/selectors';

import { UserServer } from 'types/Server';

export function* createServer(server) {
  const requestUrl = `${
    process.env.REACT_APP_SERVERURL || 'https://l2newfrontserver.herokuapp.com'
  }/api/server`;
  try {
    const token = yield select(selectToken);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);

    const data = yield call(request, requestUrl, {
      method: 'POST',
      body: JSON.stringify(server.payload),
      mode: 'cors',
      cache: 'default',
      headers: headers,
    });
    yield put(actions.setCreatedServerId(data.id));
  } catch (err) {
    yield catchError(err);
  } finally {
    yield put(actions.finishLoad());
  }
}

export function* getServers() {
  const requestUrl = `${
    process.env.REACT_APP_SERVERURL || 'https://l2newfrontserver.herokuapp.com'
  }/api/server`;
  try {
    const token = yield select(selectToken);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);
    const data: UserServer[] = yield call(request, requestUrl, {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: headers,
    });
    yield put(actions.setServersState(data));
  } catch (err) {
    yield catchError(err);
  } finally {
    yield put(actions.finishLoad());
  }
}

export function* updateServerFromState(server) {
  const requestUrl = `${
    process.env.REACT_APP_SERVERURL || 'https://l2newfrontserver.herokuapp.com'
  }/api/server`;
  try {
    const token = yield select(selectToken);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);

    const data = yield call(request, requestUrl, {
      method: 'PUT',
      body: JSON.stringify(server.payload),
      mode: 'cors',
      cache: 'default',
      headers: headers,
    });

    yield put(actions.setCreatedServerId(data.id));
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
export function* serversFromSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.createServer.type, createServer);
  yield takeLatest(actions.getServers.type, getServers);
  yield takeLatest(actions.updateServerFromState.type, updateServerFromState);
}
