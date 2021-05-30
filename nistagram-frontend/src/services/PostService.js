const API_URL = "http://localhost:58809/gateway/";

class PostService {
  insert(
    imageFiles,
    location,
    address,
    city,
    country,
    tags,
    description,
    publisher
  ) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageFiles,
        location,
        address,
        city,
        country,
        tags,
        description,
        publisher,
      }),
    };

    return fetch(API_URL + "post", requestOptions);
  }
}

export default new PostService();
