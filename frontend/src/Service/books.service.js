import axios from "axios";
const URL = process.env.REACT_APP_APIURL;

export function saveBooks(rowdata) {
  return axios.post(`${URL}/bookinfo`, rowdata);
}

export function saveWishList(rowdata) {
  return axios.post(`${URL}/favorite/${rowdata}`);
}

export function getBooks() {
  return axios.get(`${URL}/booksget`);
}

export function sendRequest(reqData) {
  return axios.post(`${URL}/inbox`, reqData);
}

export function deleteRequest(loginid) {
  return axios.delete(`${URL}/inbox/${loginid}`);
}

export function getUserBooks(userid) {
  return axios.get(`${URL}/userbooks/${userid}`);
}
