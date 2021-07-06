const API_URL = "http://localhost:58809/gateway/";

class PostService {
  saveImage(imageSrc) {
    const formData = new FormData();

    formData.append("imageSrc", imageSrc);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    return fetch(API_URL + "post/saveImage", requestOptions);
  }
}

export default new PostService();
