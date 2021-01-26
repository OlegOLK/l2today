import { ServersList } from 'types/Server';
import { User } from 'types/User';
import { isToday, format } from 'date-fns';

interface ILocalPersistor {
  setServers(data: ServersList[]);
  setUser(user: User);
  getUser(): User;
  getServers(): ServersList[];
}

export class LocalPersistor implements ILocalPersistor {
  private storagePrefix: string = '_l2new_root_';
  private userStore: string = `${this.storagePrefix}user`;
  private serverStore: string = `${this.storagePrefix}server`;
  private persistStamp: string = `${this.storagePrefix}stamp`;
  private static currentStamp: string = '';
  private static _instance: LocalPersistor;

  public static getInstance(): LocalPersistor {
    if (!LocalPersistor._instance) {
      LocalPersistor._instance = new LocalPersistor();
    }
    return LocalPersistor._instance;
  }

  setServers(data: ServersList[]) {
    localStorage.setItem(this.serverStore, JSON.stringify(data));
    this.setStamp();
  }
  setUser(user: User) {
    localStorage.setItem(this.userStore, JSON.stringify(user));
  }
  getUser(): User {
    const userData = localStorage.getItem(this.userStore);
    if (!userData) {
      return { authenticated: false, email: '', name: '', token: '' };
    }
    return JSON.parse(userData);
  }
  getServers(): ServersList[] {
    if (!this.isStateValid()) {
      this.setServers([]);
      return [];
    }
    const serverData = localStorage.getItem(this.serverStore);
    if (!serverData) {
      return [];
    }
    return JSON.parse(serverData);
  }
  private setStamp() {
    const stamp: string = format(Date.now(), 'MM/dd/yyyy');
    localStorage.setItem(this.persistStamp, stamp);
    LocalPersistor.currentStamp = stamp;
  }
  private isStateValid() {
    const localStorageStamp = localStorage.getItem(this.persistStamp);
    if (LocalPersistor.currentStamp === '' && localStorageStamp === null) {
      LocalPersistor.currentStamp = format(Date.now(), 'MM/dd/yyyy');
      localStorage.setItem(this.persistStamp, LocalPersistor.currentStamp);
      return true;
    } else if (
      LocalPersistor.currentStamp !== localStorageStamp &&
      localStorageStamp !== null
    ) {
      LocalPersistor.currentStamp = localStorageStamp;
    }

    if (!isToday(new Date(LocalPersistor.currentStamp))) {
      console.log('not today');
      return false;
    }
    return true;
  }
}
