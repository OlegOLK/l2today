// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
import { ServersDataState } from './Server';
import { UserDataState } from './User';
export interface RootState {
  serversData?: ServersDataState;
  userDataState?: UserDataState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
