import axios from "axios";
const URL = process.env.REACT_APP_APIURL;

export function saveBooks(rowdata) {
  return axios.post(`${URL}/bookinfo`, rowdata);
}

export function editBooks(id, rowdata) {
  return axios.put(`${URL}/bookupdate/${id}`, rowdata);
}

export function deleteBooks(id) {
  return axios.delete(`${URL}/bookdelete/${id}`);
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

export function searchBooks(search) {
  return axios.get(`${URL}/search/${search}`);
}

export function acceptRequest(id) {
  return axios.post(`${URL}/request/${id}`);
}

export function removeRequest(id) {
  return axios.delete(`${URL}/inbox/${id}`);
}