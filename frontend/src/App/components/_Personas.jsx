import React, { useContext, useState } from "react";

import { Button, ButtonGroup, ButtonToolbar, Col, Form } from "react-bootstrap";

import { POST, DELETE } from "../helpers/_Axion";
import Formulario from "../helpers/_Form";
import Marco from "../helpers/_Marco";
import { Session } from "../App";
import InputSugerencias from "../helpers/_InputSugerencias";

//Se encarga de la gestión de los usuarios
const Personas = (props) => {
  const url = "/ubicacion/persona";
  const [data, setData] = useState(props.data.people);
  const [filtro, setFiltro] = useState("");
  const session = useContext(Session);
  //Contantes con los acceso a los recursos de gestion de usuario
  const annadir = !session.authorities.some((a) => a === "ADMINISTRADOR");
  const borrar = !session.authorities.some((a) => a === "ADMINISTRADOR");

  //Realiza la opción de seleccionar todos
  function handleSelect(e) {
    e.preventDefault();
    let checkBoxes = Array.from(document.getElementsByTagName("input"))
      .filter((checkBox) => checkBox.type === "checkbox")
      .filter((checkBox) => checkBox.checked === false);
    checkBoxes.forEach((checkBox) => (checkBox.checked = true));
  }

  //Función para añadir una nueva persona a un cuarto
  function handleSubmit(inputs) {
    console.log(inputs);

    let dato0 = inputs[0].id;
    POST(url, {
      idUser: dato0,
      idCuarto: props.data.id,
    })
      .then((d) => {
        setData([...data, d]);
      })
      .catch((error) => console.error(error));
  }

  //Función para borrar ya sea desde la tabla como del botón global
  function handleDelete(ids, e) {
    e.preventDefault();

    if (ids.length === 0) {
      ids = Array.from(document.getElementsByName("checkTable"))
        .filter((c) => c.checked === true)
        .map((c) => Number.parseInt(c.id));
    }

    if (ids.length !== 0) {
      DELETE(url, {
        ids: ids,
        id: props.data.id,
      })
        .then((dat) => {
          if (dat) {
            ids.forEach((id) => {
              data.splice(
                data.findIndex((d) => d.id === id),
                1
              );
            });
            setData([...data]);
          }
        })
        .catch((error) => console.error(error));
    } else {
      console.error("Error en borrar barios");
    }
  }

  //Función para filtra antes de mostrar los datos
  function filtros() {
    let salida = data.filter(
      (d) =>
        d.name.toString().includes(filtro) ||
        d.identification.toString().includes(filtro)
    );
    return salida;
  }

  let body = document.getElementsByTagName("body")[0];
  body.classList.remove("colorBodyError404");
  body.classList.add("colorBody");
  return (
    <>
      {/* Se le pasa la función  que controla el estado del filtro */}
      <Marco
        filtro={setFiltro}
        beforeTable={<h4>Cuarto: {props.data.numero}</h4>}
      >
        <thead>
          <tr>
            {borrar ? null : (
              <th width="20" className="text-center">
                <i
                  onClick={handleSelect}
                  className="icon-android-checkbox-outline iconoChecked shadow-sm"
                ></i>
              </th>
            )}
            <th>Nombre</th>
            <th>Identificación</th>
            {borrar ? null : <th width="80">Borrar</th>}
          </tr>
        </thead>
        <tbody>
          {/* Se filtra antes de mostrar */}
          {filtros().map((dato) => (
            <tr key={dato.id}>
              {borrar ? null : (
                <td>
                  <Form.Check
                    type="checkbox"
                    label=""
                    className="ml-2"
                    name="checkTable"
                    id={dato.id}
                  />
                </td>
              )}
              <td>{dato.name}</td>
              <td>{dato.identification}</td>
              {borrar ? null : (
                <td className="text-center">
                  <i
                    className="icon-bin shadow-sm iconoBorrar"
                    onClick={handleDelete.bind(this, [dato.id])}
                  ></i>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Marco>
      {/* Botones flotantes  */}
      <div className="botonesTabla">
        <ButtonToolbar className="mb-5">
          {annadir ? null : (
            <ButtonGroup className="mr-2">
              <Formulario
                onSubmit={handleSubmit}
                header="Añadir Ubicación"
                button={(cb) => (
                  <Button variant="primary" onClick={cb}>
                    <i className="icon-plus4"></i>
                  </Button>
                )}
              >
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Nombre</Form.Label>
                    <InputSugerencias />
                  </Form.Group>
                </Form.Row>
              </Formulario>
            </ButtonGroup>
          )}
          {borrar ? null : (
            <ButtonGroup className="mr-2">
              <Button variant="danger" onClick={handleDelete.bind(this, [])}>
                <i className="icon-bin"></i>
              </Button>
            </ButtonGroup>
          )}
          <ButtonGroup className="mr-2">
            <Button variant="primary" onClick={props.show.bind(this, {})}>
              <i className="icon-arrow-left4"> Retroceder</i>
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    </>
  );
};
export default Personas;
