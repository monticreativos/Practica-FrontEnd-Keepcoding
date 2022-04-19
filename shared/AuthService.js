import { apiService } from "./ApiService.js";
import { localStorageService } from "./LocalStorageService.js";

class AuthService {
  endpoint = "/auth";

  async registerUser(username, password) {
    await apiService.post(`${this.endpoint}/register`, { username, password });
  }

  async loginUser(username, password) {
    const data = await apiService.post(`${this.endpoint}/login`, {
      username,
      password,
    });

    localStorageService.set(
      localStorageService.KEYS.AUTH_TOKEN,
      data.accessToken
    );
  }

  isUserAuthenticated() {
    return !!localStorageService.get(localStorageService.KEYS.AUTH_TOKEN);
  }
}

export const authService = new AuthService();
