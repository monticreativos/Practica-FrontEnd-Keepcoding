import { HeaderController } from "./header/HeaderController.js";
import { localStorageService } from "./LocalStorageService.js";
import { NotificationController } from "./notification/NotificationController.js";
import { pubSub } from "./PubSub.js";
import { SpinnerController } from "./spinner/SpinnerController.js";

export class PageController {
  constructor(bodyElement, pageConfig) {
    this.pageConfig = pageConfig;
    this.bodyElement = bodyElement;

    this.attachSubcontrollers();
    this.handlePrivatePage();
  }

  handlePrivatePage() {
    if (this.pageConfig.isPrivate) {
      const jwt = localStorageService.get(localStorageService.KEYS.AUTH_TOKEN);

      if (!jwt) {
        pubSub.publish(
          pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
          "Debes hacer login para acceder a esta página"
        );
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    }
  }

  attachSubcontrollers() {
    this.createHeader();

    if (this.pageConfig.spinner) {
      this.createSpinnerElement();
    }

    if (this.pageConfig.notification) {
      this.createNotificationElement();
    }
  }

  createHeader() {
    const headerElement = document.createElement("header");
    this.bodyElement.prepend(headerElement);

    new HeaderController(headerElement, this.pageConfig.header);
  }

  createSpinnerElement() {
    const spinnerElement = document.createElement("div");
    this.bodyElement.appendChild(spinnerElement);

    new SpinnerController(spinnerElement);
  }

  createNotificationElement() {
    const notificationElement = document.createElement("div");
    notificationElement.classList.add("notification-wrapper");
    this.bodyElement.appendChild(notificationElement);

    new NotificationController(notificationElement);
  }
}
