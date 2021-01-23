import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { validadorInputs } from "./_Validaciones";

//Renderiza un botón que se le pasa por las props.button(es una props render y se le pasa una función ) que permite que se muestre el modal básico de los formulario
//Se le pasa por las props.onSubmit una función para el procesamiento de los inputs del formulario
const Formulario = (props) => {
  const [show, setShow] = useState(false);

  //Permite que se muestre el modal (se pasa por parámetro en la render props)
  function handleShow(e) {
    setShow(true);
  }

  //Permite que se esconda el modal
  function handleClose() {
    setShow(false);
  }

  //Permite el envió de los input del  formulario a la función de que se le pasa por las props.onSubmit y cierra el modal cuando este se enviá
  //Permite la validación de los inputs y no enviá el formulario si estos no son validos
  function handleSubmit(e) {
    e.preventDefault();
    let inputs = Array.from(e.target).filter(
      (i) =>
        i.tagName === "INPUT" ||
        i.tagName === "TEXTAREA" ||
        i.tagName === "SELECT"
    );
    if (validadorInputs(inputs)) {
      props.onSubmit(inputs);
      handleClose();
    }
  }

  return (
    <>
      {props.button(handleShow)}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.header}</Modal.Title>
        </Modal.Header>
        <Form autoComplete="off" onSubmit={handleSubmit} id="formulario">
          <Modal.Body>{props.children}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              <i className="icon-cross"></i>
            </Button>
            <Button variant="success" type="submit">
              <i className="icon-floppy-disk"></i>
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
export default Formulario;
