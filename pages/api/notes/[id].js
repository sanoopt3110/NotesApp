import { apiHandler } from "helpers/api";
import { notesRepo, omit } from "helpers/api";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete
});

function getById(req, res) {
  const note = notesRepo.getById(req.query.id);

  if (!note) throw "note Not Found";

  return res.status(200).json(omit(note, "hash"));
}

function update(req, res) {
  const note = notesRepo.getById(req.query.id);

  if (!note) throw "Note Not Found";

  const { ...params } = req.body;

  // validate
  if (note.title !== params.title && notesRepo.find((x) => x.title === params.title))
    throw `Note with the title "${params.title}" already exists`;

  notesRepo.update(req.query.id, params);
  return res.status(200).json({});
}

function _delete(req, res) {
  notesRepo.delete(req.query.id);
  return res.status(200).json({});
}
