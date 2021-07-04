import AuthService from "./AuthService";

const API_URL = "http://localhost:58809/gateway/";

class CommercialService {
  sendCommercial(WebsiteLink, ImageSrc, APIToken) {
    const formData = new FormData();

    formData.append("WebsiteLink", WebsiteLink);
    formData.append("ImageSrc", ImageSrc);
    formData.append("APIToken", APIToken);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    return fetch(API_URL + "commercial", requestOptions);
  }
}
export default new CommercialService();
