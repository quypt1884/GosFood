import axios from "axios";

import { SERVICE_API } from "constants/configs";

const request = axios.create({
  baseURL: SERVICE_API,
  headers: {
    "Content-Type": "application/json",
  }
});

export default request;
