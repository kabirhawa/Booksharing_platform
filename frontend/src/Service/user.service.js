import axios from "axios";
const URL = process.env.REACT_APP_APIURL;

export function register(rowdata) {
  return axios.post(`${URL}/register`, rowdata); // Adjust the HTTP method and parameters as needed
}

export function login(rowdata) {
  return axios.post(`${URL}/login`, rowdata); // Adjust the HTTP method and parameters as needed
}

export function getUser() {
  return axios.get(`${URL}/home`); // Adjust the HTTP method and parameters as needed
}
