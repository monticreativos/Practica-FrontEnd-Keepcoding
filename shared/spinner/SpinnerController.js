import { pubSub } from "../PubSub.js";
import { buildSpinnerView } from "./spinnerView.js";

export class SpinnerController {
  constructor(spinnerElement) {
    this.spinnerElement = spinnerElement;

    this.render();
    this.subscribeToEvents();
  }

  render() {
    const spinnerTemplate = buildSpinnerView();

    this.spinnerElement.innerHTML = spinnerTemplate;
  }

  subscribeToEvents() {
    pubSub.subscribe(pubSub.TOPICS.SHOW_SPINNER, this.show.bind(this));
    pubSub.subscribe(pubSub.TOPICS.HIDE_SPINNER, this.hide.bind(this));
  }

  toggle() {
    this.spinnerElement
      .querySelector(".spinner-wrapper")
      .classList.toggle("hidden");
  }

  show() {
    this.spinnerElement
      .querySelector(".spinner-wrapper")
      .classList.remove("hidden");
  }

  hide() {
    this.spinnerElement
      .querySelector(".spinner-wrapper")
      .classList.add("hidden");
  }
}
