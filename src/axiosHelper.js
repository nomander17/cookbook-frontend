import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8090/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default request;