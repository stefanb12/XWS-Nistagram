import AuthService from "./AuthService";

const API_URL = "http://localhost:37424/api/";

class ShoppingCartService {
  sendOrder(created, total, itemsToPurchase, userId) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
      body: JSON.stringify({ created, total, itemsToPurchase, userId }),
    };

    return fetch(API_URL + "shoppingCart", requestOptions);
  }
}

export default new ShoppingCartService();
