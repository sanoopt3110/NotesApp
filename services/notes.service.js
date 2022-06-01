import getConfig from "next/config";
import { fetchWrapper } from "helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/notes`;

export const notesService = {
  register,
  getAll,
  getById,
  update,
  delete: _delete
};

function register(note) {
  return fetchWrapper.post(`${baseUrl}/register`, note);
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params).then((res) => {
    return res;
  });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}
