import { buildHeaderView } from "./headerView.js";
import { decodeJwtToken } from "../../utils/decodeJwtToken.js";
import { localStorageService } from "../LocalStorageService.js";
import { pubSub } from "../PubSub.js";

export class HeaderController {
  debouncing = false;

  constructor(headerElement, config) {
    this.headerElement = headerElement;
    this.config = config;

    this.render();
  }

  render() {
    const headerTemplate = buildHeaderView();

    this.headerElement.innerHTML = headerTemplate;

    if (this.config.hasSearch) {
      this.handleSearchInput();
    }

    const jwt = localStorageService.get(localStorageService.KEYS.AUTH_TOKEN);

    if (!jwt) {
      this.handleAuthButtons();
    }

    if (jwt) {
      this.handleUserInfo(jwt);
    }
  }

  handleSearchInput() {
    const searchProductsWrapperElement = this.headerElement.querySelector(
      ".search-products-wrapper"
    );
    const inputSearchElement = this.headerElement.querySelector("input");
    const selectCategoryElement = this.headerElement.querySelector("select");

    searchProductsWrapperElement.style.display = "block";

    inputSearchElement.addEventListener(
      "input",
      this.onInputSearchChange.bind(this)
    );
    selectCategoryElement.addEventListener(
      "change",
      this.onSelectCategoryChange.bind(this)
    );
  }

  onInputSearchChange(event) {
    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      pubSub.publish(pubSub.TOPICS.SEARCH_PRODUCTS_BY_TEXT, event.target.value);
      clearTimeout(this.searchTimeout);
    }, 500);
  }

  onSelectCategoryChange(event) {
    pubSub.publish(
      pubSub.TOPICS.SEARCH_PRODUCTS_BY_CATEGORY,
      event.target.value
    );
  }

  handleAuthButtons() {
    const headerButtonElements = this.headerElement.querySelectorAll(
      ".auth-buttons-wrapper button"
    );

    const authButtonsWrapperElement = this.headerElement.querySelector(
      ".auth-buttons-wrapper"
    );

    authButtonsWrapperElement.style.display = "flex";

    this.enableHeaderButtons(headerButtonElements);
  }

  handleUserInfo(jwt) {
    const decodedToken = decodeJwtToken(jwt);
    const username = decodedToken.username;

    const userOptionsWrapperElement = this.headerElement.querySelector(
      ".user-options-wrapper"
    );

    userOptionsWrapperElement.style.display = "flex";

    const spanElement = this.headerElement.querySelector("span");
    spanElement.textContent = `Hola, ${username}!`;

    const createButtonElement = this.headerElement.querySelector(
      ".user-options-wrapper #createProductButton"
    );

    const logoutButtonElement = this.headerElement.querySelector(
      ".user-options-wrapper #logoutButton"
    );

    logoutButtonElement.addEventListener("click", this.logoutUser.bind(this));

    this.enableHeaderButtons([createButtonElement]);
  }

  logoutUser() {
    localStorageService.remove(localStorageService.KEYS.AUTH_TOKEN);

    pubSub.publish(
      pubSub.TOPICS.SHOW_SUCCESS_NOTIFICATION,
      "Sesión cerrada correctamente"
    );

    this.searchTimeout = setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }

  enableHeaderButtons(headerButtonElements) {
    headerButtonElements.forEach((buttonElement) => {
      const destiny = buttonElement.getAttribute("data-destiny");

      if (destiny !== window.location.pathname) {
        buttonElement.style.display = "block";

        buttonElement.addEventListener("click", (event) => {
          window.location.href = `${destiny}`;
        });
      }
    });
  }
}
