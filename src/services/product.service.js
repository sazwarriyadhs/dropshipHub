import axios from "axios";
import authHeader from "../utils/auth-header";

const API_URL = "http://localhost:8080/api/products/";

class ProductService {
  getAll() {
    // For the landing page, we don't need an auth header
    return axios.get(API_URL);
  }

  get(id) {
    return axios.get(API_URL + id, { headers: authHeader() });
  }

  create(data) {
    return axios.post(API_URL, data, { headers: authHeader() });
  }

  update(id, data) {
    return axios.put(API_URL + id, data, { headers: authHeader() });
  }

  remove(id) {
    return axios.delete(API_URL + id, { headers: authHeader() });
  }
}

export default new ProductService();
