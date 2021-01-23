import React, { useContext, useEffect, useState } from "react";

import { Button, ButtonGroup, ButtonToolbar, Col, Form } from "react-bootstrap";

import { GET, POST, DELETE, PUT } from "../helpers/_Axion";
import Formulario from "../helpers/_Form";
import Marco from "../helpers/_Marco";
import TextModificar from "../helpers/_TexModificar";
import { validadorInput } from "../helpers/_Validaciones";
import { Session } from "../App";
import InputSugerencias from "../helpers/_InputSugerencias";
import Integrantes from "./_Integrantes";

//Se encarga de la gestión de la Guardia
const Guardia = () => {
  const url = "/guardia";
  const [showIntegrantes, setShowIntegrantes] = useState({
    show: false,
    data: {},
  });
  const [data, setData] = useState([]);
  const [filtro, setFiltro] = useState("");
  const session = useContext(Session);
  //Contantes con los acceso a los recursos de gestion de Cuarteleria
  const integrantes = !session.authorities.some(
    (a) =>
      a === "ADMINISTRADOR" ||
      a === "GESTION-GUARDIA-INTEGRANTES" ||
      a === "GESTION-INTEGRANTES" ||
      a === "AÑADIR-INTEGRANTES" ||
      a === "MODIFICAR-INTEGRANTES" ||
      a === "BORRAR-INTEGRANTES"
  );
  const annadir = !session.authorities.some(
    (a) =>
      a === "ADMINISTRADOR" ||
      a === "GESTION-GUARDIA-INTEGRANTES" ||
      a === "GESTION-GUARDIA" ||
      a === "AÑADIR-GUARDIA"
  );
  const borrar = !session.authorities.some(
    (a) =>
      a === "ADMINISTRADOR" ||
      a === "GESTION-GUARDIA-INTEGRANTES" ||
      a === "GESTION-GUARDIA" ||
      a === "BORRAR-GUARDIA"
  );
  const modificar = session.authorities.some(
    (a) =>
      a === "ADMINISTRADOR" ||
      a === "GESTION-GUARDIA-INTEGRANTES" ||
      a === "GESTION-GUARDIA" ||
      a === "MODIFICAR-GUARDIA"
  );

  //Carga los datos del backend y los coloca en una variable global(data)
  useEffect(() => {
    GET(url)
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error(error));
  });

  //Realiza la opción de seleccionar todos
  function handleSelect(e) {
    e.preventDefault();
    let checkBoxes = Array.from(document.getElementsByTagName("input"))
      .filter((checkBox) => checkBox.type === "checkbox")
      .filter((checkBox) => checkBox.checked === false);
    checkBoxes.forEach((checkBox) => (checkBox.checked = true));
  }

  //Modifica la variable global(showIntegrantes) para acceder a la interfaz de manejo de las Integrantes
  function handleShowIntegrantes(dato, e) {
    e.preventDefault();
    setShowIntegrantes({ show: !showIntegrantes.show, data: dato });
  }
  //Función para añadir una nueva Ubicación
  function handleSubmit(inputs) {
    let dato0 = inputs[0].id;
    let dato1 = inputs[1].selectedOptions[0].value;
    let dato2 = inputs[2].value;
    let dato3 = inputs[3].value;
    console.log(dato1);
    POST(url, {
      id: dato0,
      turno: dato1,
      inicio: dato2,
      fin: dato3,
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
        d.profesor.name.includes(filtro) ||
        d.turno.includes(filtro) ||
        d.fin.includes(filtro) ||
        d.inicio.includes(filtro)
    );
    return salida;
  }

  let body = document.getElementsByTagName("body")[0];
  body.classList.remove("colorBodyError404");
  body.classList.add("colorBody");
  if (!showIntegrantes.show) {
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
              <th>Nombre Profesor</th>
              <th>Turno</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th width="80">Integrantes</th>
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
                <td>{dato.profesor.name}</td>
                <td>
                  <TextModificar
                    isUpdate={modificar}
                    update={handleUpdate.bind(null, dato.id, "turno")}
                  >
                    {dato.turno}
                  </TextModificar>
                </td>
                <td>
                  <TextModificar
                    isUpdate={modificar}
                    update={handleUpdate.bind(null, dato.id, "inicio")}
                  >
                    {dato.inicio}
                  </TextModificar>
                </td>
                <td>
                  <TextModificar
                    isUpdate={modificar}
                    update={handleUpdate.bind(null, dato.id, "fin")}
                  >
                    {dato.fin}
                  </TextModificar>
                </td>
                {integrantes ? null : (
                  <td className="text-center">
                    <i
                      onClick={handleShowIntegrantes.bind(this, dato)}
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
                      <Form.Label>Nombre del Profesor</Form.Label>
                      <InputSugerencias />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Turno</Form.Label>
                      <Form.Control as="select" defaultValue="..." name="turno">
                        <option>Residencia</option>
                        <option>Docente</option>
                        <option>...</option>
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>Inicio</Form.Label>
                      <Form.Control
                        type="time"
                        placeholder="Entre la Fecha"
                        name="inicio"
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Fin</Form.Label>
                      <Form.Control
                        type="time"
                        placeholder="Entre la Fecha"
                        name="fin"
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
    return (
      <Integrantes show={handleShowIntegrantes} data={showIntegrantes.data} />
    );
  }
};
export default Guardia;
