const API_URL = "http://localhost:37424/api/";

class AuthService {
  login(username, password) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    return fetch(API_URL + "auth/login", requestOptions);
  }

  registerUser(fullName, username, email, password) {
    let userRole = 0;
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        username,
        email,
        password,
        userRole,
      }),
    };

    return fetch(API_URL + "user/registration", requestOptions);
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
    return localStorage.getItem("userToken");
  }
}

export default new AuthService();
