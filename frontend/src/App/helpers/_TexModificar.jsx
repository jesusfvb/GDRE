import React, { useState } from "react";

const TextModificar = (props) => {
  const [update, setUpdate] = useState(false);

  function handleUpdate(e) {
    e.preventDefault();
    setUpdate(true);
  }

  function handleCancel(e) {
    e.preventDefault();
    setUpdate(false);
  }

  function handleOk(e) {
    e.preventDefault();
    if (e.target.previousSibling.value !== update) {
      if (props.update !== undefined) {
        props.update(e.target.previousSibling, setUpdate);
      }
    }
  }

  function handleBlur(e) {
    e.preventDefault();
    if (e.target.classList.contains("is-invalidM")) {
      e.target.classList.remove("is-invalidM");
    }
  }

  if (update) {
    return (
      <>
        <textarea
          rows="1"
          cols="25"
          className="textAreaModificar"
          defaultValue={props.children}
          onClick={handleBlur}
        ></textarea>
        <i
          className="icon-checkmark2 ml-2 iconoOkModificar"
          onClick={handleOk}
        ></i>
        <i
          className="icon-cross ml-3 shadow-sm iconoCancelModificar"
          onClick={handleCancel}
        ></i>
      </>
    );
  } else {
    return (
      <>
        {props.children}
        <i className="icon-edit2 ml-2 iconoEdit" onClick={handleUpdate}></i>
      </>
    );
  }
};
export default TextModificar;
