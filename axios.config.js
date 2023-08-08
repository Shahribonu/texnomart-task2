import axios from "axios";

const baseUrl = "https://dummyjson.com/"

const http = axios.create({
    baseURL: baseUrl,
  });

  export default http