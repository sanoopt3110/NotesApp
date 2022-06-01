const fs = require("fs");

// notes in JSON file for simplicity, store in a db for production applications
let notes = require("data/notes.json");

export const notesRepo = {
  getAll: () => notes,
  getById: (id) => notes.find((x) => x.id.toString() === id.toString()),
  find: (x) => notes.find(x),
  create,
  update,
  delete: _delete,
};

function create(note) {
  // generate new note id
  note.id = notes.length ? Math.max(...notes.map((x) => x.id)) + 1 : 1;

  // set date created and updated
  note.dateCreated = new Date().toISOString();
  note.dateUpdated = new Date().toISOString();

  // add and save note
  notes.push(note);
  saveData();
}

function update(id, params) {
  const note = notes.find((x) => x.id.toString() === id.toString());

  // set date updated
  note.dateUpdated = new Date().toISOString();

  // update and save
  Object.assign(note, params);
  saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
  // filter out deleted note and save
  notes = notes.filter((x) => x.id.toString() !== id.toString());
  saveData();
}

// private helper functions

function saveData() {
  fs.writeFileSync("data/notes.json", JSON.stringify(notes, null, 4));
}
