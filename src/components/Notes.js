import React, { useContext, useEffect, useRef, useState } from "react";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import NoteContext from "../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNote, editNote } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNote();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });
  const updateNote = (currentNote) => {
    ref.current.click();
    // ref.toggle()
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    console.log("updating the note..", note);
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("success", "updated successfully");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your note</h2>
        <div className="container mx-2">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem
              note={note}
              updateNote={updateNote}
              showAlert={props.showAlert}
              key={note._id}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;

// <button
// ref={ref}
// type="button"
// className="btn btn-primary d-none"
// data-toggle="modal"
// data-target="#exampleModalLong"
// >
// Launch demo modal
// </button>
// <div
// className="modal fade"
// id="exampleModalLong"
// tabIndex="-1"
// role="dialog"
// aria-labelledby="exampleModalLongTitle"
// aria-hidden="true"
// >
// <div className="modal-dialog">
//   <div className="modal-content">
//     <div className="modal-header">
//       <h5 className="modal-title" id="exampleModalLongTitle">
//         Edit Note
//       </h5>
//       <button
//         type="button"
//         className="close"
//         data-dismiss="modal"
//         aria-label="Close"
//       >
//         <span aria-hidden="true">&times;</span>
//       </button>
//     </div>
//     <div className="modal-body">
//       <form className="my-3">
//         <div className="mb-3">
//           <label htmlFor="etitle" className="form-label">
//             Title
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="etitle"
//             name="etitle"
//             aria-describedby="emailHelp"
//             value={note.etitle}
//             onChange={onChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="edescription" className="form-label">
//             Description
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="edescription"
//             name="edescription"
//             value={note.edescription}
//             onChange={onChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="etag" className="form-label">
//             Tag
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="etag"
//             name="etag"
//             value={note.etag}
//             onChange={onChange}
//           />
//         </div>
//       </form>
//     </div>
//     <div className="modal-footer">
//       <button
//         type="button"
//         className="btn btn-secondary"
//         data-dismiss="modal"
//       >
//         Close
//       </button>
//       <button
//         type="button"
//         className="btn btn-primary"
//         onClick={handleClick}
//       >
//         Update Note
//       </button>
//     </div>
//   </div>
// </div>
// </div>
