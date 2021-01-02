import React, { useState } from "react";

import { Button, ButtonGroup, ButtonToolbar, Col, Form } from "react-bootstrap";

import { POST, DELETE } from "../helpers/_Axion";
import Formulario from "../helpers/_Form";
import Marco from "../helpers/_Marco";

//Se encarga de la gestión de las Incidencias
const Incidencias = (props) => {
  const url = "/cuarteleria/incidencia";
  const [data, setData] = useState(props.data.incidencias);
  const [filtro, setFiltro] = useState("");

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
    let dato0 = inputs[0].value;

    POST(url, {
      incidencia: dato0,
      id: props.data.id,
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
          if (dat === true) {
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
    let salida = data.filter((d) => d.texto.includes(filtro));
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
        beforeTable={
          <h4>
            Cuarteleria: {props.data.user.name} / {props.data.fecha} /
            {props.data.ubicacion}
          </h4>
        }
      >
        <thead>
          <tr>
            <th width="20" className="text-center">
              <i
                onClick={handleSelect}
                className="icon-android-checkbox-outline iconoChecked shadow-sm"
              ></i>
            </th>
            <th>Incidencia</th>
            <th width="80">Borrar</th>
          </tr>
        </thead>
        <tbody>
          {/* Se filtra antes de mostrar */}
          {filtros().map((dato) => (
            <tr key={dato.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  label=""
                  className="ml-2"
                  name="checkTable"
                  id={dato.id}
                />
              </td>
              <td>{dato.texto}</td>

              <td className="text-center">
                <i
                  className="icon-bin shadow-sm iconoBorrar"
                  onClick={handleDelete.bind(this, [dato.id])}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Marco>
      {/* Botones flotantes  */}
      <div className="botonesTabla">
        <ButtonToolbar className="mb-5">
          <ButtonGroup className="mr-2">
            <Formulario
              onSubmit={handleSubmit}
              header="Añadir Incidencia"
              button={(cb) => (
                <Button variant="primary" onClick={cb}>
                  <i className="icon-plus4"></i>
                </Button>
              )}
            >
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Incidencia</Form.Label>
                  <Form.Control as="textarea" rows="3" name="incidencia" />
                </Form.Group>
              </Form.Row>
            </Formulario>
          </ButtonGroup>
          <ButtonGroup className="mr-2">
            <Button variant="danger" onClick={handleDelete.bind(this, [])}>
              <i className="icon-bin"></i>
            </Button>
          </ButtonGroup>
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
export default Incidencias;
