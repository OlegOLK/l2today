export interface Rate {
  type: string;
  amount: number;
}

export enum Premium {
  none,
  vip,
  vip_pinned,
  vip_banner,
}

export enum ServerResponseErrorType {
  RESPONSE_ERROR = 1,
  USER_NOT_FOUND = 2,
  USERNAME_EMPTY = 3,
  USER_HAS_NO_REPO = 4,
  GITHUB_RATE_LIMIT = 5,
}

export interface Server {
  name: string;
  rates: Rate[];
  chronicles: string;
  openDate: string;
  features: string[];
  premium: Premium;
  uri: string;
  id: string;
}

export interface UserServer {
  id: string;
  chronicles: string;
  openDate: string;
  name: string;
  platform: string;
  rates: Rate[];
  type: string;
  uri: string;
  premium: number;
  approved: boolean;
  isDirty: boolean;
  questions: UserServerQuestion[];
}

export interface UserServerQuestion {
  id: string;
  answer: string;
  question: string;
}

export interface NewServer {
  Chronicles: string;
  OpenDate: string;
  Name: string;
  Platform: string;
  Uri: string;
  Type: string;
  Rates: Rate[];
}

export interface ServersList {
  label: string;
  panel: number;
  servers: Server[];
  sortOrder: number;
}

export interface ServersDataState {
  jsonData: Server[];
  serversList: ServersList[];
  rawServerList: ServersList[];
  loading: boolean;
  error?: ServerResponseErrorType | null;
  serverFilter?: string | null;
  dataWasInitialized: boolean;
}
