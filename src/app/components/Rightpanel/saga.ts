import { call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from './slice';
import { selectFilter, selectRawServersList } from './selectors';
import {
  ServerResponseErrorType,
  Server,
  ServersList,
  Premium,
  Rate,
} from 'types/Server';

import { ComplexFilter, Rates } from 'types/ComplexFilter';
import * as dfn from 'date-fns';

/**
 * Server list request/response handler
 */
export function* getRepos() {
  const filter: string = yield select(selectFilter);

  const requestURL = `${
    process.env.REACT_APP_SERVERSFILE ||
    'https://raw.githubusercontent.com/firebricks/tempdata/main/data/l2new.2.17.2021.3'
  }`;
  try {
    // Call our request helper (see 'utils/request')
    // let serversList: ServersList[] = yield select(selectRawServersList);

    const rawServerList: ServersList[] = yield select(selectRawServersList);
    let servers: Server[] = [];
    // if local state is empty
    if (rawServerList.length === 0) {
      // fetch full servers list
      servers = yield call(request, requestURL);
      yield put(actions.dataLoaded(servers));

      if (servers?.length > 0) {
        //if fetched list is not empty sort it and store as raw
        yield put(actions.rawDataLoaded(sort(servers, 'n=n')));
      } else {
        // if fetched list is empty put error
        yield put(actions.repoError(ServerResponseErrorType.USER_HAS_NO_REPO));
        return;
      }
    }
    const raw = yield select(selectRawServersList);
    // filter raw list to a serversList so that all filters cannot harm original data
    yield put(actions.serversLoaded(selectFromSorted(raw, filter)));
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
function getFilterFromLocalStorage(filterName): ComplexFilter | null {
  const jsonFilter = localStorage.getItem('filter');
  let filter;

  if (!jsonFilter) {
    return null;
  }
  filter = JSON.parse(jsonFilter);
  const complexFitlers: ComplexFilter[] = filter.userFilters;
  const complexFilter = complexFitlers.find(
    x => x.name.toLowerCase() === filterName.toLowerCase(),
  );
  return complexFilter ? complexFilter : null;
}

function complexFilter(
  s: Server,
  type: string,
  lowerVal: string,
  complexFilters: ComplexFilter | null,
) {
  switch (type) {
    case 'chronicles':
      return s.chronicles.toLowerCase() === lowerVal;
    case 'types': {
      return (
        s.features.some(x => x.toLowerCase() === lowerVal) ||
        s.type.toLowerCase() === lowerVal.toLowerCase()
      );
    }
    case 'rates': {
      return s.rates.some(
        x =>
          x.type.toLowerCase() === 'xp' &&
          x.amount === Number.parseInt(lowerVal),
      );
    }
    case 'date': {
      return (
        dfn.compareAsc(
          dfn.parseISO(s.openDate),
          dfn.parse(lowerVal, 'dd.MM.yyyy', new Date()),
        ) === 0
      );
    }
    case 'custom': {
      var com = complex(s, complexFilters);
      return com;
    }
    default:
      return true;
  }
}

function predicate(r: Rate, f: Rates) {
  return (
    f.name.toLowerCase() === r.type.toLowerCase() &&
    f.max >= r.amount &&
    f.min <= r.amount
  );
}

function complex(s: Server, f: ComplexFilter | null) {
  if (!f) {
    return true;
  }

  let ok: boolean = true;
  if (f.chronicles.length !== 0) {
    ok = f.chronicles.some(
      x => x.selected === true && x.label === s.chronicles,
    );
  }
  if (!ok) {
    return ok;
  }
  if (f.rates.length !== 0) {
    ok = s.rates.some(x =>
      f.rates.some(frate => {
        return predicate(x, frate);
      }),
    );
  }

  return ok;
}

function selectFromSorted(
  servers: ServersList[],
  filter: string,
): ServersList[] {
  const type = filter.split('=');
  const lowerVal = type[1].toLowerCase();
  const filters = getFilterFromLocalStorage(lowerVal);
  const filtered = servers.flatMap(s => {
    const filteredServers = s.servers.filter(x =>
      complexFilter(x, type[0], lowerVal, filters),
    );
    return {
      label: s.label,
      panel: s.panel,
      servers: filteredServers,
      sortOrder: s.sortOrder,
    };
  });

  return filtered;
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
  const lowerVal = type[1].toLowerCase();
  const filters = getFilterFromLocalStorage(lowerVal);
  let sortedServers = [...servers];
  // sortedServers = sortedServers.sort((first, second) => {
  //   try {
  //     let a = dfn.compareDesc(dfn.parseISO(first.openDate), dfn.parseISO(second.openDate));
  //     return a;
  //   } catch (err) {
  //     console.log(first, second);
  //     throw new Error("pizdec");
  //   }
  //   // if(a == NaN){
  //   // console.log(first.openDate, second.openDate);
  //   // }
  //   // console.log(a);

  // });

  if (filter !== 'n=n') {
    sortedServers = sortedServers.filter(x =>
      complexFilter(x, type[0], lowerVal, filters),
    );
  }
  sortedServers.map(s => {
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
    return s;
  });

  soon = soon.sort((first, second) => {
    return dfn.compareAsc(
      dfn.parseISO(first.openDate),
      dfn.parseISO(second.openDate),
    );
  });
  already = already.sort((first, second) => {
    return dfn.compareDesc(
      dfn.parseISO(first.openDate),
      dfn.parseISO(second.openDate),
    );
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

  var yesterday = already.filter(x => {
    var open = dfn.parseISO(x.openDate);
    return dfn.isYesterday(open);
  });

  const tomorrow = soon.filter(x => {
    var open = dfn.parseISO(x.openDate);
    return dfn.isTomorrow(open);
  });

  const soon7Days: Server[] = [];
  const soonMore7Days: Server[] = [];
  soon.forEach(x => {
    if (tomorrow.some(s => s.name === x.name)) {
      return;
    }
    var compare = dfn.compareAsc(dfn.parseISO(x.openDate), sevenPlus);
    if (compare === -1 || compare === 0) {
      soon7Days.push(x);
    } else {
      soonMore7Days.push(x);
    }
  });

  groupped.push({
    servers: yesterday,
    sortOrder: 3,
    label: 'ВЧЕРА',
    panel: 1,
  });

  groupped.push({
    servers: tomorrow,
    sortOrder: 4,
    label: 'ЗАВТРА',
    panel: 0,
  });

  groupped.push({
    servers: soon7Days,
    sortOrder: 5,
    label: 'БЛИЖАЙШИЕ 7 ДНЕЙ',
    panel: 0,
  });

  groupped.push({
    servers: already.filter(x => {
      if (yesterday.some(s => s.id === x.id)) {
        return false;
      }
      var open = dfn.parseISO(x.openDate);
      const compare = dfn.compareAsc(open, sevenMinus);
      return compare === 1 || compare === 0;
      // if (dfn.compareAsc(open, sevenMinus) === -1) {
      //   return x;
      // }
    }),
    sortOrder: 6,
    label: 'ПРЕДЫДУЩИЕ 7 ДНЕЙ',
    panel: 1,
  });

  groupped.push({
    servers: already.filter(x => {
      var open = dfn.parseISO(x.openDate);
      return dfn.compareAsc(open, sevenMinus) === -1;
      // if (dfn.compareAsc(open, sevenMinus) === 1) {
      //   return x;
      // }
    }),
    sortOrder: 8,
    label: 'НЕДЕЛЮ НАЗАД И БОЛЕЕ',
    panel: 1,
  });

  groupped.push({
    servers: soonMore7Days,
    // already.filter(x => {
    //   var open = dfn.parseISO(x.openDate);
    //   return dfn.compareAsc(open, sevenPlus) === 1;

    //   // if (dfn.compareAsc(open, sevenPlus) === 1) {
    //   //   return x;
    //   // }
    // }),
    sortOrder: 7,
    label: 'ЧЕРЕЗ НЕДЕЛЮ И БОЛЕЕ',
    panel: 0,
  });

  return groupped;
}
