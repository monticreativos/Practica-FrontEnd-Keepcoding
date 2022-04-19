class LocalStorageService {
  KEYS = {
    AUTH_TOKEN: "AUTH_TOKEN",
  };

  constructor() {}

  get(key) {
    return localStorage.getItem(key);
  }

  set(key, value) {
    localStorage.setItem(key, value);
  }

  remove(key) {
    localStorage.removeItem(key);
  }
}

export const localStorageService = new LocalStorageService();
