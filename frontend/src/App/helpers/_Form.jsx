import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { validadorInputs } from "./_Validaciones";

const Formulario = (props) => {
  const [show, setShow] = useState(false);

  function handleShow(e) {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let inputs = Array.from(e.target).filter((i) => i.tagName === "INPUT");
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
