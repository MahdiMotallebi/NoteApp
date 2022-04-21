import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleCategory, setActive } from "../feature/slice";

const Category = ({ name, id, index, bgStyle, setbgStyle }) => {
  const state = useSelector((state) => state.noteReducer);
  const dispatch = useDispatch();
  const colors = ["#69bcff", "#ff9100", "#5c6bc0", "#66bb6a"];
  const categories = document.querySelectorAll(".categories");
  useEffect(() => {
    setbgStyle(colors[state.active]);
  }, [state.active]);
  const handleCat = (name) => {
    dispatch(setActive(index));
    categories.forEach((item, i) => {
      if (item.classList.contains("active") && index !== i) {
        item.classList.remove("active");
      }
    });

    dispatch(handleCategory(name));
  };
  return (
    <span
      onClick={() => {
        if (state.notes.length > 0) {
          handleCat(name);
        }
      }}
      id={id}
      key={id}
      style={{
        backgroundColor: state.active === index ? bgStyle : "",
      }}
      className={`categories ${name} ${
        state.active === index ? "active" : ""
      } `}
    >
      {name}
    </span>
  );
};

export default Category;
