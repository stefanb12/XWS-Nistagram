import AuthService from "./AuthService";

const API_URL = "http://localhost:37424/api/";

class ProductService {
  insert(name, price, description, availableBalance, imageFiles) {
    const formData = new FormData();

    for (var i = 0; i < imageFiles.length; i++) {
      formData.append("imageFiles", imageFiles[i]);
    }

    formData.append("name", name);
    formData.append("price", price.toString().split(".")[0]);
    formData.append("description", description);
    formData.append("availableBalance", availableBalance);

    const requestOptions = {
      method: "POST",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
      body: formData,
    };

    return fetch(API_URL + "product", requestOptions);
  }

  getAllProducts() {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(API_URL + "product", requestOptions);
  }

  getAllIncludingDeletedProducts() {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(API_URL + "product/includingDeleted", requestOptions);
  }

  deleteProduct(productId) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
    };

    return fetch(API_URL + "product/delete/" + productId, requestOptions);
  }

  update(id, name, price, description, availableBalance, imageFiles) {
    const formData = new FormData();

    for (var i = 0; i < imageFiles.length; i++) {
      formData.append("imageFiles", imageFiles[i]);
    }

    formData.append("id", id);
    formData.append("name", name);
    formData.append("price", price.toString().split(".")[0]);
    formData.append("description", description);
    formData.append("availableBalance", availableBalance);

    const requestOptions = {
      method: "PUT",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
      body: formData,
    };

    return fetch(API_URL + "product", requestOptions);
  }
}

export default new ProductService();
