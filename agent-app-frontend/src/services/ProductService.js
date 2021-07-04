import AuthService from "./AuthService";

const API_URL = "http://localhost:37424/api/";

class ProductService {
  getAllProducts() {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(API_URL + "product", requestOptions);
  }

  getProduct(id) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(API_URL + "product/getProduct/" + id, requestOptions);
  }
}

export default new ProductService();
