import React, { useContext, useEffect, useState } from "react";

import { Button, ButtonGroup, ButtonToolbar, Col, Form } from "react-bootstrap";

import { GET, POST, DELETE, PUT } from "../helpers/_Axion";
import Formulario from "../helpers/_Form";
import Marco from "../helpers/_Marco";
import TextModificar from "../helpers/_TexModificar";
import { validadorInput } from "../helpers/_Validaciones";
import { Session } from "../App";
import Cuartos from "./_Cuartos";
import InputSugerencias from "../helpers/_InputSugerencias";

//Se encarga de la gestión de la Cuarteleria
const Cuarteleria = () => {
  const url = "/cuarteleria";
  const [showIncidencias, setShowIncidencias] = useState({
    show: false,
    data: {},
  });
  const [data, setData] = useState([]);
  const [filtro, setFiltro] = useState("");
  const session = useContext(Session);
  //Contantes con los acceso a los recursos de gestion de Cuarteleria
  const cuartos = !session.authorities.some((a) => a === "ADMINISTRADOR");
  const annadir = !session.authorities.some((a) => a === "ADMINISTRADOR");
  const borrar = !session.authorities.some((a) => a === "ADMINISTRADOR");
  const modificar = session.authorities.some((a) => a === "ADMINISTRADOR");

  //Carga los datos del backend y los coloca en una variable global(data)
  useEffect(() => {
    GET(url)
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  //Realiza la opción de seleccionar todos
  function handleSelect(e) {
    e.preventDefault();
    let checkBoxes = Array.from(document.getElementsByTagName("input"))
      .filter((checkBox) => checkBox.type === "checkbox")
      .filter((checkBox) => checkBox.checked === false);
    checkBoxes.forEach((checkBox) => (checkBox.checked = true));
  }

  //Modifica la variable global(showCuartos) para acceder a la interfaz de manejo de las Incidencias
  function handleShowIncidencias(dato, e) {
    e.preventDefault();
    setShowIncidencias({ show: !showIncidencias.show, data: dato });
  }
  //Función para añadir una nueva Ubicación
  function handleSubmit(inputs) {
    let dato0 = inputs[0].id;
    let dato1 = inputs[1].value;
    POST(url, {
      idPersona: dato0,
      fecha: dato1,
    })
      .then((d) => setData([...data, d]))
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
      DELETE(url, ids)
        .then((d) => {
          if (d) {
            ids.forEach((id) => {
              data.splice(
                data.findIndex((d) => d.id === id),
                1
              );
              setData([...data]);
            });
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
        .then((d) => {
          data[data.findIndex((da) => (da.id = d.id))] = d;
          setData([...data]);
        })
        .catch((error) => console.error(error));
    }
  }

  //Función para filtra antes de mostrar los datos
  function filtros() {
    let salida = data.filter(
      (d) =>
        d.user.name.includes(filtro) ||
        d.fecha.includes(filtro) ||
        d.ubicacion.includes(filtro) ||
        d.evaluacion.includes(filtro) ||
        d.evaluacion.includes(filtro)
    );
    return salida;
  }

  let body = document.getElementsByTagName("body")[0];
  body.classList.remove("colorBodyError404");
  body.classList.add("colorBody");
  if (!showCuartos.show) {
    return (
      <>
        {/* Se le pasa la función  que controla el estado del filtro */}
        <Marco filtro={setFiltro}>
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
              <th>Fecha</th>
              <th>Lugar</th>
              <th>Evaluación</th>
              <th width="80">Incidencias</th>
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
                <td>{dato.user.name}</td>
                <td>
                  <TextModificar
                    isUpdate={modificar}
                    update={handleUpdate.bind(null, dato.id, "date")}
                  >
                    {dato.fecha}
                  </TextModificar>
                </td>
                <td>{dato.ubicacion}</td>
                <td>
                  <TextModificar
                    isUpdate={modificar}
                    update={handleUpdate.bind(null, dato.id, "evaluacion")}
                  >
                    {dato.evaluacion}
                  </TextModificar>
                </td>
                {cuartos ? null : (
                  <td className="text-center">
                    <i
                      onClick={handleShowIncidencias.bind(this, dato)}
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
                  header="Añadir Cuarteleria"
                  button={(cb) => (
                    <Button variant="primary" onClick={cb}>
                      <i className="icon-plus4"></i>
                    </Button>
                  )}
                >
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>Nombre de la Persona</Form.Label>
                      <InputSugerencias />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Número de Cuartos</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Entre la Fecha"
                        name="date"
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
          </ButtonToolbar>
        </div>
      </>
    );
  } else {
    return <Cuartos show={handleShowIncidencias} data={showIncidencias.data} />;
  }
};
export default Cuarteleria;
