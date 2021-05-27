const API_URL = "http://localhost:58809/gateway/";

class AuthService {
  login(username, password) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    return fetch(API_URL + "auth/login", requestOptions);
  }

  logout() {
    localStorage.removeItem("currentUser");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }

  getUserToken() {
    var user = JSON.parse(localStorage.getItem("currentUser"));
    return user.token;
  }
}

export default new AuthService();
