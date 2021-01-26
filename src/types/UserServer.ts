import { UserServer } from './Server';

export interface UserServerDataState {
  createdServerId: string;
  loading: boolean;
  error: string[];
  servers: UserServer[];
}
