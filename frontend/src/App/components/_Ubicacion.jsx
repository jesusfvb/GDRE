import React, { useContext, useEffect, useState } from "react";

import { Button, ButtonGroup, ButtonToolbar, Col, Form } from "react-bootstrap";

import { GET, POST, DELETE, PUT } from "../helpers/_Axion";
import Formulario from "../helpers/_Form";
import Marco from "../helpers/_Marco";
import TextModificar from "../helpers/_TexModificar";
import { validadorInput } from "../helpers/_Validaciones";
import Cuartos from "./_Cuartos";
import { Session } from "../App";

//Se encarga de la gestión de las ubicaciones
const Ubicacion = () => {
  const url = "/ubicacion";
  const [showCuartos, setShowCuartos] = useState({
    show: false,
    data: {},
  });
  const [data, setData] = useState([]);
  const [filtro, setFiltro] = useState("");
  const session = useContext(Session);
  //Contantes con los acceso a los recursos de gestion de Ubicacion
  const cuartos = !session.authorities.some(
    (a) =>
      a === "ADMINISTRADOR" ||
      a === "GESTION-UBICACION-CUARTOS-PERSONAS" ||
      a === "GESTION-CUARTO" ||
      a === "AÑADIR-CUARTO" ||
      a === "MODIFICAR-CUARTO" ||
      a === "BORRAR-CUARTO" ||
      a === "GESTION-PERSONAS" ||
      a === "AÑADIR-PERSONAS" ||
      a === "BORRAR-PERSONAS"
  );
  const annadir = !session.authorities.some(
    (a) =>
      a === "ADMINISTRADOR" ||
      a === "GESTION-UBICACION-CUARTOS-PERSONAS" ||
      a === "GESTION-UBICACION" ||
      a === "AÑADIR-UBICACION"
  );
  const borrar = !session.authorities.some(
    (a) =>
      a === "ADMINISTRADOR" ||
      a === "GESTION-UBICACION-CUARTOS-PERSONAS" ||
      a === "GESTION-UBICACION" ||
      a === "BORRAR-UBICACION"
  );
  const modificar = session.authorities.some(
    (a) =>
      a === "ADMINISTRADOR" ||
      a === "GESTION-UBICACION-CUARTOS-PERSONAS" ||
      a === "GESTION-UBICACION" ||
      a === "MODIFICAR-UBICACION"
  );

  //Carga los datos del backend y los coloca en una variable global(data)
  useEffect(() => {
    GET(url)
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  //Modifica la variable global(showCuartos) para acceder a la interfaz de manejo de los cuartos
  function handleShowCuartos(dato, e) {
    e.preventDefault();
    setShowCuartos({ show: !showCuartos.show, data: dato });
  }

  //Realiza la opción de seleccionar todos
  function handleSelect(e) {
    e.preventDefault();
    let checkBoxes = Array.from(document.getElementsByTagName("input"))
      .filter((checkBox) => checkBox.type === "checkbox")
      .filter((checkBox) => checkBox.checked === false);
    checkBoxes.forEach((checkBox) => (checkBox.checked = true));
  }

  //Función para añadir una nueva Ubicación
  function handleSubmit(inputs) {
    let dato0 = inputs[0].value;
    let dato1 = inputs[1].value;
    POST(url, {
      name: dato0,
      numberOfRooms: dato1,
    })
      .then((data) => setData(data))
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
        .then((data) => setData(data))
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
        .then((data) => setData(data))
        .catch((error) => console.error(error));
    }
  }

  //Función para filtra antes de mostrar los datos
  function filtros() {
    let salida = data.filter(
      (d) =>
        d.name.includes(filtro) || d.numberOfRooms.toString().includes(filtro)
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
              <th>Numero de Cuartos</th>
              {cuartos ? null : <th width="100">Cuartos</th>}
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
                    update={handleUpdate.bind(null, dato.id, "nameUbicacion")}
                  >
                    {dato.name}
                  </TextModificar>
                </td>
                <td>
                  <TextModificar
                    isUpdate={modificar}
                    update={handleUpdate.bind(null, dato.id, "numberOfRooms")}
                  >
                    {dato.numberOfRooms}
                  </TextModificar>
                </td>
                {cuartos ? null : (
                  <td className="text-center">
                    <i
                      onClick={handleShowCuartos.bind(this, dato)}
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
                      <Form.Label>Nombre de la Ubicación</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter el Nombre de la Ubicación"
                        name="nameUbicacion"
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Número de Cuartos</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Entre el numero de Cuartos"
                        name="numberOfRoom"
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
    return <Cuartos show={handleShowCuartos} data={showCuartos.data} />;
  }
};
export default Ubicacion;
