import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./note.css";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import Modal from "react-modal";
import FormNote from "../FormNote/FormNote";

import {
  handleCheckRead,
  handleReadNote,
  handleRemoveNote,
  setTitle,
  setTextArea,
  setCat,
  resetForm,
  handleShowModal,
  setUpdateNote,
  setIdUpdateNote,
} from "../feature/slice";

const Note = React.memo(({ note }) => {
  console.log("notes");

  const state = useSelector((state) => state.noteReducer);
  const dispatch = useDispatch();
  const { id, title, text, category, date, read } = note;
  const [modalUpdate, setMoadalUpdate] = useState(false);
  const [showBoxDel, setShowBoxDel] = useState(false);

  const handleCheckbox = (e, id) => {
    const isCheck = e.target.checked;
    dispatch(handleReadNote({ id, isCheck }));
    dispatch(handleCheckRead());
    handleProgressBar(isCheck);
  };

  const handleProgressBar = (isCheck) => {
    var w = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--width-ProgressBar"
      )
    );
    console.log(w);
    let c = 100;
    let count = c / state.notes.length;
    if (isCheck) {
      w += count;
    } else {
      w -= count;
    }
    document.documentElement.style.setProperty("--width-ProgressBar", `${w}%`);
  };

  const handleCloseBoxDel = () => {
    setShowBoxDel(false);
  };
  const handleShowBoxDel = () => {
    setShowBoxDel(true);
  };
  const handleRemove = (id) => {
    dispatch(handleRemoveNote(id));
    dispatch(handleCheckRead());
    setShowBoxDel(false);
  };

  const handleUpdate = () => {
    dispatch(setTextArea(text));
    dispatch(setCat(category));
    dispatch(setTitle(title));
    dispatch(setIdUpdateNote(id));
    dispatch(setUpdateNote(true));
    dispatch(handleShowModal());
  };

  const handleCancelNote = () => {
    dispatch(resetForm());
    setMoadalUpdate(false);
  };
  const colors = ["#69bcff", "#ff9100", "#5c6bc0", "#66bb6a"];
  const handleBgNote = () => {
    const index = state.cat.findIndex((cat) => cat.value === category);
    // state.cat.map((cat) => {
    //   if ( cat.value === category ) {
    //     return cat.indexOf
    //   };
    // });
    return colors[index];
  };

  return (
    <>
      <div
        className={`note-container ${read && "checkActive"}`}
        style={{
          background: !read && handleBgNote(),
        }}
        key={id}
      >
        <div>
          <div className="top-note">
            <div className="left">
              <form>
                <input
                  checked={
                    read
                      ? read
                      : (e) => {
                          handleProgressBar(e.target.checked);
                        }
                  }
                  type="checkbox"
                  className="checkbox"
                  onChange={(e) => {
                    handleCheckbox(e, id);
                  }}
                />
              </form>
              <h4 className="caption-note">{title}</h4>
            </div>
            <div className="right">
              <div className="edit" onClick={handleUpdate}>
                <MdEdit />
              </div>
              <div className="trash" onClick={handleShowBoxDel}>
                <IoMdTrash />
              </div>
              {showBoxDel && (
                <div className="box-del-note">
                  delete note?
                  <div className="btns">
                    <button className="btn" onClick={handleCloseBoxDel}>
                      cancel
                    </button>
                    <button className="btn" onClick={() => handleRemove(id)}>
                      delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="textarea-note">{text}</div>
        </div>
        <div className="date-note">{date}</div>
        {/* {modalUpdate && (
          <Modal
            isOpen={true}
            onRequestClose={handleCancelNote}
            ariaHideApp={false}
            className="modal"
            overlayClassName="overlay"
          >
            <FormNote
              id={id}
              modalUpdate={modalUpdate}
              setMoadalUpdate={setMoadalUpdate}
            />
          </Modal>
        )} */}
      </div>
    </>
  );
});

export default Note;
