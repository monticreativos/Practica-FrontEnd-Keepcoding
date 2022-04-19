import { pubSub } from "../PubSub.js";
import { errorMessageView, successMessageView } from "./notificationView.js";

export class NotificationController {
  node = null;

  constructor(node) {
    this.node = node;

    this.subscribeToEvents();
  }

  subscribeToEvents() {
    pubSub.subscribe(
      pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
      this.showError.bind(this)
    );

    pubSub.subscribe(
      pubSub.TOPICS.SHOW_SUCCESS_NOTIFICATION,
      this.showSuccess.bind(this)
    );
  }

  showError(error) {
    this.node.innerHTML = errorMessageView(error);
    this.addListenerToCloseNotification();
  }

  showSuccess(message) {
    this.node.innerHTML = successMessageView(message);
    this.addListenerToCloseNotification();
  }

  addListenerToCloseNotification() {
    const buttonElement = this.node.querySelector("button");
    buttonElement.addEventListener("click", () => {
      this.hideNotification();
    });
  }

  hideNotification() {
    this.node.innerHTML = "";
  }
}
