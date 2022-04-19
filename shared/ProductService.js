import { apiService } from "./ApiService.js";

class ProductService {
  endpoint = "/api/products";
  notFoundImage =
    "https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg";

  async uploadImage(formData) {
    const endpoint = "/upload";

    return await apiService.postImage(endpoint, formData);
  }

  async createProduct(product, image = null) {
    if (product.title.length > 40) {
      throw new Error("título muy largo");
    }

    if (product.description.length > 200) {
      throw new Error("descripción muy larga");
    }

    let uploadedImage = null;

    if (!!image.size && !!image.name) {
      const bodyFormData = new FormData();
      bodyFormData.append("file", image);

      uploadedImage = await this.uploadImage(bodyFormData);

      product.image = uploadedImage.path;
    }

    await apiService.post(this.endpoint, product);
  }

  async getProductList(page = 1, limit = 10, text = null, category = null) {
    let endpoint = `${this.endpoint}?_expand=user&_page=${page}&_limit=${limit}&_sort=updatedAt&_order=desc`;

    if (text) {
      endpoint += `&q=${text}`;
    }

    if (category && category !== "*") {
      endpoint += `&category=${category}`;
    }

    const products = await apiService.get(endpoint);

    return this.transformProducts(products);
  }

  async getProductById(productId) {
    const endpoint = `${this.endpoint}/${productId}?_expand=user`;
    const product = await apiService.get(endpoint);

    const transformedProducts = this.transformProducts([product]);

    return transformedProducts[0];
  }

  async deleteProduct(productId) {
    await apiService.delete(`${this.endpoint}/${productId}`);
  }

  transformProducts(products) {
    const transformedProducts = products.map((product) => {
      const transformedProduct = {
        description: product.description,
        id: product.id,
        price: `${product.price} €`,
        title: product.title,
        type: product.type,
        updatedAt: new Date(product.updatedAt),
        image: product.image || this.notFoundImage,
        isSell: product.type === "sell",
      };

      if (product.user) {
        transformedProduct.user = {
          id: product.user.id || null,
          name: product.user.username || null,
        };
      }

      return transformedProduct;
    });

    return transformedProducts;
  }
}

export const productService = new ProductService();
