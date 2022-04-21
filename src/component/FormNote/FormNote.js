import React, { useRef, useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { withFormik, Formik } from "formik";
import Select from "react-select";
import * as yup from "yup";
import {
  handleAddingNote,
  handleSetUpdatedNote,
  handleShowModal,
  handleCheckActiveCategory,
  handleCategory,
  setTitle,
  setTextArea,
  setCat,
  resetForm,
  setUpdateNote,
} from "../feature/slice";
import { v4 as uuidv4 } from "uuid";
import "./formNote.css";

const FormNote = React.memo(() => {
  const state = useSelector((state) => state.noteReducer);
  console.log("form notes");
  const dispatch = useDispatch();
  const [showCat, setShowCat] = useState(false);
  const dropDownCategory = useRef();

  const handleShowCategory = () => {
    if (!showCat) {
      dropDownCategory.current.style.display = "flex";
      setShowCat(true);
    } else {
      dropDownCategory.current.style.display = "none";
      setShowCat(false);
    }
  };
  const handleHideCategory = () => {
    dropDownCategory.current.style.display = "none";
    setShowCat(false);
  };

  const handleAddNote = () => {
    const note = {
      id: uuidv4(),
      title: state._title,
      text: state._textArea,
      category: state._cat,
      date: new Date().toDateString().slice(4),
      read: false,
    };
    dispatch(handleAddingNote(note));
    if (state.active !== 0) {
      dispatch(handleCheckActiveCategory(state._cat));
      dispatch(handleCategory(state._cat));
    }

    handleCancelNote();
  };

  const handleCancelNote = () => {
    dispatch(resetForm());
    dispatch(handleShowModal());
    dispatch(setUpdateNote(false));
  };
  const handleUpdateNote = () => {
    const updated = {
      id: state.idUpdateNote,
      title: state._title,
      text: state._textArea,
      category: state._cat,
    };

    dispatch(handleSetUpdatedNote(updated));
    if (state.active !== 0) {
      dispatch(handleCheckActiveCategory(state._cat));
      dispatch(handleCategory(state._cat));
    }
    handleCancelNote();
  };

  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : null;
  };
  const onSubmit = (values) => {
    if (state.updateNote) {
      handleUpdateNote();
    } else {
      handleAddNote();
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#f5f5f5",
      border: "none",
      padding: ".3em",
      cursor: "pointer",
      outline: "none",
    }),

    option: (provided, state) => ({
      ...provided,
      background: state.isFocused ? "#f5f5f5" : "#fff",
      color: "#000",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      opacity: 0.7,
      letterSpacing: ".5px",
    }),
  };
  return (
    <div className="modal-container">
      <h4 className="modal-title">
        {state.updateNote ? "update note" : "add note"}
      </h4>

      <Formik
        initialValues={{
          _title: state._title,
          _textArea: state._textArea,
          _category: state._cat,
        }}
        validationSchema={yup.object().shape({
          _title: yup.string().required(),
          _textArea: yup.string().required(),
          _category: yup.string().ensure().required(),
        })}
        onSubmit={onSubmit}
        enableReinitialize="true"
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
          setFieldTouched,
          setFieldValue,
        }) => (
          <form id="my-form" className="modal-note" onSubmit={handleSubmit}>
            <div className="text-note">
              <div className="control-input height-input">
                <input
                  value={state._title}
                  type="text"
                  name="_title"
                  placeholder="Add title..."
                  className="input-note-title"
                  onChange={(e) => dispatch(setTitle(e.target.value))}
                  onBlur={handleBlur}
                  autoComplete="off"
                />
                {errors._title && touched._title ? (
                  <span className="required">required</span>
                ) : null}
              </div>
              <div className="control-input height-textarea">
                <textarea
                  value={state._textArea}
                  cols="30"
                  rows="10"
                  className="text-area"
                  name="_textArea"
                  placeholder="Add description..."
                  onChange={(e) => dispatch(setTextArea(e.target.value))}
                  onBlur={handleBlur}
                ></textarea>
                {errors._textArea && touched._textArea ? (
                  <span className="required">required</span>
                ) : null}
              </div>
            </div>
            <div className="modal-category-container">
              <Select
                styles={customStyles}
                // closeMenuOnScroll="false"
                menuPlacement="auto"
                // menuShouldScrollIntoView="true"
                name="_category"
                options={state.cat.slice(1)}
                value={defaultValue(state.cat.slice(1), state._cat)}
                onBlur={() => setFieldTouched("_category", true)}
                onChange={(e) => dispatch(setCat(e.value))}
                placeholder="gategory"
              />
              {errors._category && touched._category ? (
                <span className="required">required</span>
              ) : null}
            </div>
          </form>
        )}
      </Formik>
      <div className="modal-btn">
        {state.showModal && (
          <>
            <button
              type="button"
              className="btn cancel"
              onClick={handleCancelNote}
            >
              cancel
            </button>

            <button form="my-form" type="submit" className="btn add">
              {state.updateNote ? "update" : "add"}
            </button>
          </>
        )}
      </div>
    </div>
  );
});

export default FormNote;

// const formik = withFormik({
//   mapPropsToValues: () => ({
//     _title: "",
//     _category: "",
//     _textArea: "",
//   }),
//   validationSchema: yup.object().shape({
//     _title: yup.string().required(),
//   }),

//   handleSubmit: (values) => {
//     handleSubmition();
//   },
// })(FormNote);

// const mapStateToProps = (state) => {
//   return { state: state };
// };

// const mapDispatchToProps = (dispatch) => ({
//   setTitle: (title) => {
//     dispatch(setTitle(title));
//   },
//   dispatch,
// });

{
  /* <button
                type="button"
                onClick={handleShowCategory}
                className="category-btn"
              >
                <span className="btn-category-name">{state._cat}</span>
                <span className="arrow"></span>
              </button>
              <div className="drop-down" ref={dropDownCategory}>
                {state.cat.map((item, i) => {
                  if (i !== 0)
                    return (
                      <>
                        <input
                          type="radio"
                          value={item}
                          name="_category"
                          className={`option ${
                            errors._cat && touched._cat
                              ? "red-border"
                              : "border"
                          }`}
                          onChange={(e) => dispatch(setCat(e.target.value))}
                          onBlur={handleBlur}
                          id={item}
                        />
                        <label
                          onClick={handleHideCategory}
                          name="_category"
                          for={item}
                        >
                          {item}
                        </label>
                      </>
                    );
                })}
              </div> */
}
{
  /* <select
                value={state._cat}
                onChange={(e) => dispatch(setCat(e.target.value))}
                className="select-modal-category"
                onBlur={handleBlur}
              >
                <option value="" selected disabled hidden>
                  select gategory
                </option>
                {state.cat.map((item, i) => {
                  if (i !== 0) return <option value={item}>{item}</option>;
                })}
              </select> */
}
