import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const Formulario = (props) => {
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
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
          <Modal.Title>Añadir</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <i className="icon-cross"></i>
          </Button>
          <Button variant="success">
            <i className="icon-floppy-disk"></i>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Formulario;
