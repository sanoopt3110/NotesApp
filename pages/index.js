import { useState, useEffect } from "react";
import { AddEdit } from "components/notes";
import { useDispatch, useSelector } from "react-redux";
import { getAll, deleteNote, notesSelector } from "store/slice";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState(null);
  const { notesList } = useSelector(notesSelector) || [];
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    dispatch(getAll()).then(({ payload }) => {
      setSelectedNote(payload[0]);
    });
  }, []);

  useEffect(() => {
    if (notesList?.length) {
      setNotes(notesList);
    }
  }, [notesList]);

  const deleteExNote = (id) => {
    dispatch(deleteNote(id)).then(() => {
      setNotes((notes) => notes?.filter((x) => x.id !== id));
      setSelectedNote(notes?.filter((x) => x.id !== id)[0]);
      toast.success("Note deleted successfully");
    });
  };

  return (
    <div className="p-4">
      <div className="container shadow-lg p-3 mb-5 bg-body rounded">
        <nav className="navbar bg-light mb-3 rounded">
          <div className="container-fluid">
            <div className="navbar-brand mx-2">Notes</div>
          </div>
        </nav>
        <div className="row">
          <div className="col">
            <div className="d-flex flex-row-reverse">
              <button type="button" className="btn btn-light border" onClick={() => setSelectedNote(null)}>
                <b>+</b> Add Note
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <ul className="list-group">
              {notes?.length &&
                notes?.map((note) => (
                  <li
                    key={note.id}
                    className={`list-group-item ${note.id === selectedNote?.id ? "active" : ""}`}
                    onClick={() => setSelectedNote(note)}
                  >
                    <h6>{note.title}</h6>
                    <button
                      type="button"
                      className="btn-close position-absolute top-0 end-0 mt-2 me-2"
                      aria-label="Close"
                      onClick={() => deleteExNote(note.id)}
                      style={{ fontSize: ".6rem" }}
                    ></button>
                    <span style={{ fontSize: ".825rem" }} className="text-break">
                      {note.body}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-8">
            <AddEdit note={selectedNote} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
