import axios from "axios";
import axiosRetry from 'axios-retry';

const customAxios = axios.create();
customAxios.defaults.withCredentials = true
axiosRetry(customAxios, { retries: 0 });


export default customAxios