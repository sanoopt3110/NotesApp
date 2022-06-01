const fs = require("fs");

// users in JSON file for simplicity, store in a db for production applications
let users = require("data/users.json");

export const usersRepo = {
  getById: (id) => users.find((x) => x.id.toString() === id.toString()),
  find: (x) => users.find(x),
};
