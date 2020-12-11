import React, { useState } from "react";

//Permite que se modifique un texto en la tabla, se le pasa el texto como hijo y una función por las props.update
//Retorna un texto y un icono de modificar y cuando esta en modificación retorna un textarea y los iconos de cancelar y aceptar
const TextModificar = (props) => {
  const [update, setUpdate] = useState(false);

  //Realiza el cambio del texto normal a el textarea para modificar
  function handleUpdate(e) {
    e.preventDefault();
    setUpdate(true);
  }

  //Cancela el textarea para modificar y deja el texto como estaba
  function handleCancel(e) {
    e.preventDefault();
    setUpdate(false);
  }

  //Ase vigente el cambio solo si se a modificado el texto ejecutando una función que se le pasa por las props.update
  function handleOk(e) {
    e.preventDefault();
    if (e.target.previousSibling.value !== update) {
      if (props.update !== undefined) {
        props.update(e.target.previousSibling, setUpdate);
      }
    }
  }

  //Le quita la clase "is-invalidM" al textarea cuando es invalido
  function handleBlur(e) {
    e.preventDefault();
    if (e.target.classList.contains("is-invalidM")) {
      e.target.classList.remove("is-invalidM");
    }
  }

  //Renderiza el textarea o el texto según corresponda
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
        {props.isUpdate !== undefined && props.isUpdate === false ? null : (
          <i className="icon-edit2 ml-2 iconoEdit" onClick={handleUpdate}></i>
        )}
      </>
    );
  }
};
export default TextModificar;
