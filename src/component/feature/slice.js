import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  filteredNotes: [],
  cat: [
    { value: "all", label: "all" },
    { value: "home", label: "home" },
    { value: "work", label: "work" },
    { value: "personal", label: "personal" },
  ],
  showModal: false,
  updateNote: false,
  countRead: 0,
  idUpdateNote: null,
  active: 0,
  _title: "",
  _textArea: "",
  _cat: "",
};

export const noteSlice = createSlice({
  name: "noteSlice",
  initialState,
  reducers: {
    setIdUpdateNote: (state, action) => {
      state.idUpdateNote = action.payload;
    },
    setTitle: (state, action) => {
      state._title = action.payload;
    },
    setTextArea: (state, action) => {
      state._textArea = action.payload;
    },
    setCat: (state, action) => {
      state._cat = action.payload;
    },

    resetForm: (state) => {
      state._title = "";
      state._textArea = "";
      state._cat = "";
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setFilteredSearchNote: (state, action) => {
      state.filteredNotes = [...action.payload];
    },
    handleShowModal: (state) => {
      state.showModal = !state.showModal;
    },
    setUpdateNote: (state, action) => {
      state.updateNote = action.payload;
    },
    handleAddingNote: (state, action) => {
      if (state.notes.length > 0) {
        state.notes = [...state.notes, action.payload];
        state.filteredNotes = [...state.notes];
      } else {
        state.notes = [action.payload];
        state.filteredNotes = [...state.notes];
      }
    },
    handleCategory: (state, action) => {
      if (action.payload === "all") {
        state.filteredNotes = [...state.notes];
      } else {
        const newNotes = state.notes.filter(
          (item) => item.category === action.payload
        );
        state.filteredNotes = [...newNotes];
      }
    },
    handleReadNote: (state, action) => {
      for (const item of state.filteredNotes) {
        if (item.id === action.payload.id) {
          item.read = action.payload.isCheck;
          break;
        }
      }
      for (const item of state.notes) {
        if (item.id === action.payload.id) {
          item.read = action.payload.isCheck;
          break;
        }
      }
    },
    handleCheckRead: (state) => {
      const newArr = state.notes.filter((item) => item.read === true);
      state.countRead = newArr.length;
    },

    handleRemoveNote: (state, action) => {
      const newArr = state.notes.filter((item) => item.id !== action.payload);
      state.notes = [...newArr];
      const newAr = state.filteredNotes.filter(
        (item) => item.id !== action.payload
      );
      state.filteredNotes = [...newAr];
    },

    handleSetUpdatedNote: (state, action) => {
      for (const item of state.filteredNotes) {
        if (item.id === action.payload.id) {
          item.title = action.payload.title;
          item.text = action.payload.text;
          item.category = action.payload.category;
          break;
        }
      }
      for (const item of state.notes) {
        if (item.id === action.payload.id) {
          item.title = action.payload.title;
          item.text = action.payload.text;
          item.category = action.payload.category;
          break;
        }
      }
    },
    handleCheckActiveCategory: (state, action) => {
      if (state.notes.length > 0) {
        console.log(action.payload);
        state.active = state.cat.indexOf(action.payload);
      }
    },
  },
});

export const {
  handleShowModal,
  handleAddingNote,
  handleCategory,
  handleReadNote,
  handleCheckRead,
  handleRemoveNote,
  handleUpdateNote,
  handleSetUpdatedNote,
  handleCategoryActiveIndex,
  setFilteredSearchNote,
  setActive,
  handleCheckActiveCategory,
  setCat,
  setTextArea,
  setTitle,
  resetForm,
  setUpdateNote,
  setIdUpdateNote,
} = noteSlice.actions;
export default noteSlice.reducer;
