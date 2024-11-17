import axios from "axios";

axios.interceptors.request.use((config) => {
  const authorizisationToken = "WILL BE TOKEN";

  config.headers.Authorization = authorizisationToken;

  return config;
});

export default axios;
