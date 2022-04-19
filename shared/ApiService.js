import { localStorageService } from "./LocalStorageService.js";
import { pubSub } from "./PubSub.js";

class ApiService {
  apiUrl = "http://localhost:8000";
  requestHeaders = {
    headers: {
      "content-type": "application/json",
    },
  };

  constructor() {}

  async postImage(endpoint, body) {
    const url = this.apiUrl + endpoint;
    const requestOptions = {
      method: "POST",
      headers: {},
      body: body,
    };

    const jwt = localStorageService.get(localStorageService.KEYS.AUTH_TOKEN);

    if (jwt) {
      requestOptions.headers.Authorization = `Bearer ${jwt}`;
    }

    return await this.httpRequest(url, requestOptions);
  }

  async post(endpoint, body) {
    const url = this.apiUrl + endpoint;
    const requestOptions = {
      method: "POST",
      ...this.requestHeaders,
      body: JSON.stringify(body),
    };

    const jwt = localStorageService.get(localStorageService.KEYS.AUTH_TOKEN);

    if (jwt) {
      requestOptions.headers.Authorization = `Bearer ${jwt}`;
    }

    return await this.httpRequest(url, requestOptions);
  }

  async get(endpoint) {
    const url = this.apiUrl + endpoint;
    const requestOptions = {
      method: "GET",
      ...this.requestHeaders,
    };

    return await this.httpRequest(url, requestOptions);
  }

  async delete(endpoint) {
    const url = this.apiUrl + endpoint;
    const requestOptions = {
      method: "DELETE",
      ...this.requestHeaders,
    };

    const jwt = localStorageService.get(localStorageService.KEYS.AUTH_TOKEN);

    if (jwt) {
      requestOptions.headers.Authorization = `Bearer ${jwt}`;
    }

    return await this.httpRequest(url, requestOptions);
  }

  async httpRequest(url, requestOptions = null) {
    try {
      pubSub.publish(pubSub.TOPICS.SHOW_SPINNER);
      const httpResponse = await fetch(url, requestOptions);
      const data = await httpResponse.json();

      if (httpResponse.ok) {
        return data;
      } else {
        throw new Error(httpResponse.statusText);
      }
    } catch (error) {
      throw error;
    } finally {
      pubSub.publish(pubSub.TOPICS.HIDE_SPINNER);
    }
  }
}

export const apiService = new ApiService();
