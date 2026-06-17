import axios from "axios";

const API = axios.create({
  baseURL: "https://library-management-adpk.onrender.com/api",
});

export default API;