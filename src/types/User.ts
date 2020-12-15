export interface User {
  name: string;
  email: string;
  token: string;
  authenticated: boolean;
}

export interface GoogleAuthResponse {
  accessToken: string;
}

export interface UserDataState {
  user: User;
}
