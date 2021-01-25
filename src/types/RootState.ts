// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
import { ServersDataState } from './Server';
import { UserDataState } from './User';
import { UserServerDataState } from './UserServer';
export interface RootState {
  serversData?: ServersDataState;
  userDataState?: UserDataState;
  userServerDataState?: UserServerDataState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
