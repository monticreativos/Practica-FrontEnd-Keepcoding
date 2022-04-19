import { pubSub } from "../shared/PubSub.js";
import { productService } from "../shared/ProductService.js";

export class CreateProductFormController {
  formSubmitButtonElement = null;

  constructor(createProductFormElement) {
    this.createProductFormElement = createProductFormElement;
    this.formSubmitButtonElement =
      createProductFormElement.querySelector("button");

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.addInputListeners();
    this.addSubmitFormListener();
  }

  addInputListeners() {
    const createProductFormInputElements =
      this.createProductFormElement.querySelectorAll("input");
    const createProductFormTextAreaElement =
      this.createProductFormElement.querySelector("textarea");
    const createProductFormSelectElement =
      this.createProductFormElement.querySelector("select");

    createProductFormTextAreaElement.addEventListener(
      "input",
      this.onAnyInputChange.bind(this)
    );

    createProductFormInputElements.forEach((createProductFormInputElement) => {
      createProductFormInputElement.addEventListener(
        "input",
        this.onAnyInputChange.bind(this)
      );
    });

    createProductFormSelectElement.addEventListener(
      "change",
      this.onAnyInputChange.bind(this)
    );
  }

  addSubmitFormListener() {
    this.createProductFormElement.addEventListener(
      "submit",
      this.onSubmitForm.bind(this)
    );
  }

  onAnyInputChange() {
    const isFormValid = this.createProductFormElement.checkValidity();

    if (isFormValid) {
      this.formSubmitButtonElement.removeAttribute("disabled");
    } else {
      this.formSubmitButtonElement.setAttribute("disabled", "");
    }
  }

  onSubmitForm(event) {
    event.preventDefault();

    const isFormValid = this.createProductFormElement.checkValidity();

    if (isFormValid) {
      this.createProduct();
    } else {
      this.createProductFormElement.reportValidity();
    }
  }

  async createProduct() {
    const createProductFormData = new FormData(this.createProductFormElement);

    const title = createProductFormData.get("title");
    const description = createProductFormData.get("description");
    const price = createProductFormData.get("price");
    const image = createProductFormData.get("image");
    const type = createProductFormData.get("type");
    const category = createProductFormData.get("categories");

    const product = {
      title,
      description,
      price,
      type,
      category,
    };

    try {
      await productService.createProduct(product, image);

      pubSub.publish(
        pubSub.TOPICS.SHOW_SUCCESS_NOTIFICATION,
        "Producto creado correctamente"
      );

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }
}
