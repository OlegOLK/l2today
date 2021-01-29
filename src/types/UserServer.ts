import { UserServer } from './Server';

export interface UserServerDataState {
  createdServerId: string;
  userServersLoading: boolean;
  loading: boolean;
  error: string[];
  servers: UserServer[];
}
