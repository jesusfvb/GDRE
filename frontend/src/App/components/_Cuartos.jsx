import React, { useContext, useState } from "react";

import { Button, ButtonGroup, ButtonToolbar, Col, Form } from "react-bootstrap";

import { POST, DELETE, PUT } from "../helpers/_Axion";
import Formulario from "../helpers/_Form";
import Marco from "../helpers/_Marco";
import TextModificar from "../helpers/_TexModificar";
import { validadorInput } from "../helpers/_Validaciones";
import { Session } from "../App";
import Personas from "./_Personas";

//Se encarga de la gestión de los usuarios
const Cuartos = (props) => {
  const url = "/ubicacion/cuartos";
  const [showPersonas, setShowPersonas] = useState({ show: false, data: {} });
  const [data, setData] = useState(props.data.rooms);
  const [filtro, setFiltro] = useState("");
  const session = useContext(Session);
  //Contantes con los acceso a los recursos de gestion de usuario
  const permisos = !session.authorities.some((a) => a === "ADMINISTRADOR");
  const annadir = !session.authorities.some((a) => a === "ADMINISTRADOR");
  const borrar = !session.authorities.some((a) => a === "ADMINISTRADOR");
  const modificar = session.authorities.some((a) => a === "ADMINISTRADOR");

  //Modifica la variable global(showPersonas) para acceder a la interfaz de manejo de las personas
  function handleShowPersonas(dato, e) {
    e.preventDefault();
    setShowPersonas({ show: !showPersonas.show, data: dato });
  }

  //Realiza la opción de seleccionar todos
  function handleSelect(e) {
    e.preventDefault();
    let checkBoxes = Array.from(document.getElementsByTagName("input"))
      .filter((checkBox) => checkBox.type === "checkbox")
      .filter((checkBox) => checkBox.checked === false);
    checkBoxes.forEach((checkBox) => (checkBox.checked = true));
  }

  //Función para añadir un nuevo Cuarto
  function handleSubmit(inputs) {
    let dato0 = inputs[0].value;
    let dato1 = inputs[1].value;
    POST(url, {
      numero: dato0,
      numberOfPeople: dato1,
      idUbicacion: props.data.id,
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

  // Función para modificar
  function handleUpdate(id, opcion, value, cb) {
    if (validadorInput(value, opcion)) {
      cb(false);
      PUT(url, {
        id: id,
        opcion: opcion,
        value: value.value,
      })
        .then((dat) => {
          data[data.findIndex((d) => d.id === id)] = dat;
          setData([...data]);
        })
        .catch((error) => console.error(error));
    }
  }

  //Función para filtra antes de mostrar los datos
  function filtros() {
    let salida = data.filter(
      (d) =>
        d.numero.toString().includes(filtro) ||
        d.numberOfPeople.toString().includes(filtro)
    );
    return salida;
  }

  let body = document.getElementsByTagName("body")[0];
  body.classList.remove("colorBodyError404");
  body.classList.add("colorBody");
  if (!showPersonas.show) {
    return (
      <>
        {/* Se le pasa la función  que controla el estado del filtro */}
        <Marco
          filtro={setFiltro}
          beforeTable={<h4>Ubicación: {props.data.name}</h4>}
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
              <th>Número</th>
              <th>Número de Personas</th>
              {permisos ? null : <th width="100">Personas</th>}
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
                <td>
                  <TextModificar
                    isUpdate={modificar}
                    update={handleUpdate.bind(null, dato.id, "numero")}
                  >
                    {dato.numero}
                  </TextModificar>
                </td>
                <td>
                  <TextModificar
                    isUpdate={modificar}
                    update={handleUpdate.bind(null, dato.id, "numberOfPeople")}
                  >
                    {dato.numberOfPeople}
                  </TextModificar>
                </td>
                {permisos ? null : (
                  <td className="text-center">
                    <i
                      onClick={handleShowPersonas.bind(this, dato)}
                      className="icon-list2 shadow-sm iconoPermiso"
                    ></i>
                  </td>
                )}
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
                      <Form.Label>Número del Cuarto</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter el numero del cuarto"
                        name="numero"
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Número de Personas</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Entre el numero de Personas"
                        name="numberOfPeople"
                      />
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
  } else {
    return <Personas show={handleShowPersonas} data={showPersonas.data} />;
  }
};
export default Cuartos;
