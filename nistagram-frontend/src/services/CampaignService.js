import AuthService from "./AuthService";

const API_URL = "http://localhost:58809/gateway/";

class CampaignService {
  insertCampaign(
    isSingleCampaign,
    isPost,
    commercials,
    agentId,
    postId,
    storyId,
    broadcastTime,
    startDate,
    endDate,
    numberOfRepeats
  ) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
      body: JSON.stringify({
        isSingleCampaign,
        isPost,
        commercials,
        agentId,
        postId,
        storyId,
        broadcastTime,
        startDate,
        endDate,
        numberOfRepeats,
      }),
    };

    return fetch(API_URL + "campaign", requestOptions);
  }

  getSingleCampaignsForAgent(agentId) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(API_URL + "campaign/single/agent/" + agentId, requestOptions);
  }

  getRepeatableCampaignsForAgent(agentId) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(
      API_URL + "campaign/repeatable/agent/" + agentId,
      requestOptions
    );
  }
}
export default new CampaignService();
