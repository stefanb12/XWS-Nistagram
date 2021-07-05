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

  sendCampaignRequest(campaignId, influencerId) {
    console.log(campaignId);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
      body: JSON.stringify({
        campaignId,
        influencerId,
      }),
    };

    return fetch(API_URL + "campaign/sendCampaignRequest", requestOptions);
  }

  getCampaignRequestForCampaign(campaignId) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(
      API_URL + "campaign/getCampaignRequestForCampaign/" + campaignId,
      requestOptions
    );
  }

  acceptCampaignRequest(campaignId, influencerId) {
    const requestOptions = {
      method: "PUT",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(
      API_URL +
        "campaign/acceptCampaignRequest/" +
        campaignId +
        "/" +
        influencerId,
      requestOptions
    );
  }

  rejectCampaignRequest(campaignId, influencerId) {
    const requestOptions = {
      method: "PUT",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(
      API_URL +
        "campaign/rejectCampaignRequest/" +
        campaignId +
        "/" +
        influencerId,
      requestOptions
    );
  }

  deleteCampaign(id, isSingleCampaign) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthService.getUserToken(),
      },
      body: JSON.stringify({
        id,
        isSingleCampaign
      }),
    };

    return fetch(API_URL + "campaign/deleteCampaign", requestOptions);
  }

  getCampaign(campaignId) {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + AuthService.getUserToken() },
    };

    return fetch(API_URL + "campaign/" + campaignId, requestOptions);
  }
}
export default new CampaignService();
