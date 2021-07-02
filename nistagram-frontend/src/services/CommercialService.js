import AuthService from "./AuthService";

const API_URL = "http://localhost:58809/gateway/";

class CommercialService {
  getCommercialsForAgent(agentId) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(API_URL + "commercial/agent/" + agentId, requestOptions);
  }
}
export default new CommercialService();
