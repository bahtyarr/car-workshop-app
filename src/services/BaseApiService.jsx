import axios from "axios";
import { BASE_API_URL } from "../config";

export default class BaseApiService {
  constructor() {
    this.baseURL = BASE_API_URL;
  }

  get token() {
    return localStorage.getItem("token");
  }

  async Get(url) {
    try {
      const response = await axios.get(`${this.baseURL}${url}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error fetching data from the API:", error);
    }
  }

  async Post(url, data) {
    try {
      const response = await axios.post(`${this.baseURL}${url}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error("Error posting data to the API:", error);
    }
  }

  async Put(url, data) {
    try {
      const response = await axios.put(`${this.baseURL}${url}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error("Error posting data to the API:", error);
    }
  }

  async Delete(url) {
    try {
      const response = await axios.delete(`${this.baseURL}${url}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error fetching data from the API:", error);
    }
  }
}
