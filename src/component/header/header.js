import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { setFilteredSearchNote } from "../feature/slice";
import "./header.css";

const Header = () => {
  const [search, setSearch] = useState();
  const state = useSelector((state) => state.noteReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    handleSearchNote();
  }, [search]);

  const handleSearchNote = () => {
    const newNote = state.notes.filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    );

    if (!search == "") {
      dispatch(setFilteredSearchNote(newNote));
    } else {
      dispatch(setFilteredSearchNote(state.notes));
    }
  };
  const handleOnchange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <header className="header">
      <div className="search-note">
        <form>
          <input
            value={search}
            placeholder="Search notes..."
            className="input-search-note"
            onChange={(e) => handleOnchange(e)}
          />
          <button
            onClick={(e) => e.preventDefault()}
            className="btn-search-note"
          >
            <AiOutlineSearch />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
