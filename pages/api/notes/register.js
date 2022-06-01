const bcrypt = require("bcryptjs");

import { apiHandler, notesRepo } from "helpers/api";

export default apiHandler({
  post: register
});

function register(req, res) {
  const { ...note } = req.body;
  notesRepo.create(note);
  return res.status(200).json({});
}
