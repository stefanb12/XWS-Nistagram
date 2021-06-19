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

  registerUser(fullName, username, email, password, gender) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, username, email, password, gender }),
    };

    return fetch(API_URL + "profile/registration", requestOptions);
  }

  logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }

  getUserToken() {
    // var user = JSON.parse(localStorage.getItem("currentUser"));
    // return user.token;
    return localStorage.getItem("userToken");
  }
}

export default new AuthService();
