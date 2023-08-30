import axios from "axios";
const URL = process.env.REACT_APP_APIURL;

export function register(rowdata) {
  return axios.post(`${URL}/register`, rowdata);
}

export function login(rowdata) {
  return axios.post(`${URL}/login`, rowdata);
}

export function getUser() {
  return axios.get(`${URL}/home`);
}

export function updateUsers(userid, reqData) {
  return axios.put(`${URL}/updateusers/${userid}`, reqData);
}

export function addToWishlist( reqData) {
  return axios.put(`${URL}/favorite`, reqData);
}

export function allUser() {
  return axios.get(`${URL}/getusers`); // Adjust the HTTP method and parameters as needed
}
