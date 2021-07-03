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
}
export default new CampaignService();
