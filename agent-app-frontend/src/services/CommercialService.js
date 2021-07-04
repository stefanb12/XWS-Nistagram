import AuthService from "./AuthService";

const API_URL = "http://localhost:58809/gateway/";

class CommercialService {
  sendCommercial(WebsiteLink, ImageSrc, APIToken) {
    const formData = new FormData();

    formData.append("websiteLink", WebsiteLink);
    formData.append("imageSrc", ImageSrc);
    formData.append("aPIToken", APIToken);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    return fetch(API_URL + "commercial", requestOptions);
  }
}
export default new CommercialService();
