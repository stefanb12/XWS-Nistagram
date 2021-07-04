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

  generateToken(agentUsername) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + this.getUserToken() },
    };

    return fetch(
      API_URL + "auth/apiTokenForCampaigns/" + agentUsername,
      requestOptions
    );
  }

  registerUser(fullName, username, email, password, gender, isAgent, website) {
    let userRole;
    var requestOptions;
    if (isAgent) {
      userRole = 1;
      requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          email,
          password,
          gender,
          userRole,
          website,
        }),
      };
    } else {
      userRole = 0;
      requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          email,
          password,
          gender,
          userRole,
        }),
      };
    }

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
    return localStorage.getItem("userToken");
  }
}

export default new AuthService();
