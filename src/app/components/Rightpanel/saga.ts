import { call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from './slice';
import { selectFilter } from './selectors';
import {
  ServerResponseErrorType,
  Server,
  ServersList,
  Premium,
} from 'types/Server';
import * as dfn from 'date-fns';

/**
 * Server list request/response handler
 */
export function* getRepos() {
  const filter: string = yield select(selectFilter);
  // const requestURL = `https://localhost:44372/api/search?${filter}`;
  const requestURL =
    'https://raw.githubusercontent.com/OlegOLK/l2today/master/servers.json';
  try {
    // Call our request helper (see 'utils/request')
    const serversList: Server[] = yield call(request, requestURL); //yield test(); //.flatMap(d => d);

    //yield call(request, requestURL);
    if (serversList?.length > 0) {
      yield put(actions.serversLoaded(sort(serversList, filter)));
    } else {
      yield put(actions.repoError(ServerResponseErrorType.USER_HAS_NO_REPO));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.repoError(ServerResponseErrorType.USER_NOT_FOUND));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.repoError(ServerResponseErrorType.USER_NOT_FOUND));
      yield put(actions.repoError(ServerResponseErrorType.GITHUB_RATE_LIMIT));
    } else {
      yield put(actions.repoError(ServerResponseErrorType.RESPONSE_ERROR));
    }
  }
}

export function test() {
  fetch('/data/servers.json', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(x => x.json());
}

/**
 * Root saga manages watcher lifecycle
 */
export function* serversListFormSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadServers.type, getRepos);
}

function complexFilter(s: Server, type: string, value: string) {
  const lowerVal = value.toLowerCase();
  switch (type) {
    case 'chronicles':
      return s.chronicles.toLowerCase() === lowerVal;
    case 'types': {
      return s.features.includes(lowerVal);
    }
    case 'rates': {
      return s.rates.some(x => x.amount.toLowerCase() === lowerVal);
    }
    default:
      return true;
  }
}

function sort(servers: Server[], filter: string) {
  let soon: Server[] = [];
  let already: Server[] = [];
  let today: Server[] = [];
  let groupped: ServersList[] = [];
  const todayDate = new Date();
  const sevenMinus = dfn.addDays(todayDate, -7);
  const sevenPlus = dfn.addDays(todayDate, 7);
  const type = filter.split('='); //${filterType}=${value}
  servers = servers.filter(x => complexFilter(x, type[0], type[1]));
  servers.map(s => {
    let res = dfn.compareAsc(dfn.parseISO(s.openDate), todayDate);
    switch (res) {
      case 0: {
        today.push(s);
        break;
      }
      case 1: {
        soon.push(s);
        break;
      }
      case -1: {
        already.push(s);
        break;
      }
    }
  });

  groupped.push({
    label: 'soonVip',
    servers: soon.filter(x => x.premium === Premium.vip_pinned),
    panel: 0,
    sortOrder: 0,
  });

  groupped.push({
    servers: already.filter(x => x.premium === Premium.vip_pinned),
    sortOrder: 1,
    label: 'alreadyVip',
    panel: 1,
  });

  groupped.push({
    servers: today,
    sortOrder: 2,
    label: 'ОТКРЫТИЕ СЕГОДНЯ',
    panel: 0,
  });

  groupped.push({
    servers: already.filter(x => {
      var open = dfn.parseISO(x.openDate);
      return dfn.isYesterday(open);
      // if (dfn.compareAsc(open, dfn.addDays(todayDate, -1)) == 0) {
      //   return x;
      // }
    }),
    sortOrder: 3,
    label: 'ВЧЕРА',
    panel: 1,
  });

  groupped.push({
    servers: soon.filter(x => {
      var open = dfn.parseISO(x.openDate);
      if (dfn.compareAsc(open, sevenPlus) === -1) {
        return x;
      }
    }),
    sortOrder: 4,
    label: 'БЛИЖАЙШИЕ 7 ДНЕЙ',
    panel: 0,
  });

  groupped.push({
    servers: already.filter(x => {
      var open = dfn.parseISO(x.openDate);
      if (dfn.compareAsc(open, sevenMinus) === -1) {
        return x;
      }
    }),
    sortOrder: 5,
    label: 'ПРЕДЫДУЩИЕ 7 ДНЕЙ',
    panel: 1,
  });

  groupped.push({
    servers: already.filter(x => {
      var open = dfn.parseISO(x.openDate);
      if (dfn.compareAsc(open, sevenMinus) === 1) {
        return x;
      }
    }),
    sortOrder: 7,
    label: 'НЕДЕЛЮ НАЗАД И БОЛЕЕ',
    panel: 1,
  });

  groupped.push({
    servers: already.filter(x => {
      var open = dfn.parseISO(x.openDate);
      if (dfn.compareAsc(open, sevenPlus) === 1) {
        return x;
      }
    }),
    sortOrder: 6,
    label: 'ЧЕРЕЗ НЕДЕЛЮ И БОЛЕЕ',
    panel: 0,
  });

  return groupped;
}
