const API_URL = "http://localhost:58809/gateway/";

class PostService {
  insert(imageFiles, address, city, country, tags, description, publisher) {
    const formData = new FormData();

    for (var i = 0; i < imageFiles.length; i++) {
      formData.append("imageFiles", imageFiles[i]);
    }

    formData.append("description", description);
    tags.forEach((item) => {
      formData.append("tags", item);
    });
    formData.append("location[address]", address);
    formData.append("location[city]", city);
    formData.append("location[country]", country);
    formData.append("publisher[id]", publisher.id);
    formData.append("publisher[username]", publisher.username);

    const requestOptions = {
      method: "POST",
      // headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    };

    return fetch(API_URL + "post", requestOptions);
  }
}

export default new PostService();
