import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import Category from "../category/category";
import Modal from "react-modal";
import Note from "../note/note";
import "./showNotes.css";
import notNotes from "../../Img/notNotes.svg";
import searchImage from "../../Img/search-image.svg";
import { v4 as uuidv4 } from "uuid";
import { handleShowModal, resetForm } from "../feature/slice";
import FormNote from "../FormNote/FormNote";
const ShowNotes = React.memo(() => {
  console.log("show notes");

  const state = useSelector((state) => state.noteReducer);
  const dispatch = useDispatch();
  const [bgStyle, setbgStyle] = useState();

  useEffect(() => {
    EditProgressBar();
  }, [state.notes.length, state.filteredNotes.length]);

  const handleCancelNote = () => {
    dispatch(handleShowModal());
  };
  const handleShowAddNote = () => {
    dispatch(resetForm());
    dispatch(handleShowModal());
  };

  const EditProgressBar = () => {
    var w = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--width-ProgressBar"
      )
    );
    if (w > 0 && state.notes.length !== 0) {
      let i = 100 / state.notes.length;
      w = i * state.countRead;
      document.documentElement.style.setProperty(
        "--width-ProgressBar",
        `${w}%`
      );
    }
  };
  return (
    <div className="show-notes-container">
      <div className="header-category">
        <div className="category">
          {state.cat.map((item, index) => {
            return (
              <Category
                index={index}
                name={item.value}
                id={uuidv4()}
                setbgStyle={setbgStyle}
                bgStyle={bgStyle}
              />
            );
          })}
        </div>
        <div className="addNote-container">
          <button onClick={handleShowAddNote} className=" add-note">
            <AiOutlinePlus className="icon-plus" /> add note
          </button>
        </div>

        {state.showModal && (
          <Modal
            className="modal"
            overlayClassName="overlay"
            isOpen={true}
            onRequestClose={handleCancelNote}
            ariaHideApp={false}
          >
            <FormNote />
          </Modal>
        )}
      </div>
      {state.notes.length > 0 && (
        <div className="progress-note">
          <p>
            you have <span className="start">{state.countRead}</span>/
            <span className="end">{state.notes.length}</span> notes completed
          </p>
          <div className="progress-bar">
            <div className="fill-bg"></div>
          </div>
        </div>
      )}
      <main className="show-notes">
        {state.filteredNotes.length > 0 && (
          <div className="notes">
            {state.filteredNotes.map((note) => {
              return <Note note={note} />;
            })}
          </div>
        )}

        {state.filteredNotes.length === 0 &&
          state.notes.length !== 0 &&
          state.cat !== "all" && (
            <div className="not-notes">
              <p className="title-not-notes">couldn't find any notes.</p>
              <img src={searchImage} alt={notNotes} className="img-note" />
            </div>
          )}
        {state.filteredNotes.length === 0 && state.notes.length === 0 && (
          <div className="not-notes">
            <p className="title-not-notes">you don't have any notes.</p>
            <img src={notNotes} alt={notNotes} className="img-note" />
          </div>
        )}
      </main>
    </div>
  );
});

export default ShowNotes;
