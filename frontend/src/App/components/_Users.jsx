import React, { useEffect, useState } from "react";

import { Button, ButtonGroup, ButtonToolbar, Col, Form } from "react-bootstrap";

import { GET, POST, DELETE, PUT } from "../helpers/_Axion";
import Formulario from "../helpers/_Form";
import Marco from "../helpers/_Marco";
import TextModificar from "../helpers/_TexModificar";
import { validadorInput } from "../helpers/_Validaciones";

import Permisos from "./_Permisos";

//Se encarga de la gestión de los usuarios
const Users = () => {
  const url = "/user";
  const [showPermisos, setShowPermisos] = useState({ show: false, data: {} });
  const [data, setData] = useState([]);
  const [filtro, setFiltro] = useState("");

  //Carga los datos del backend y los coloca en una variable global(data)
  useEffect(() => {
    GET(url)
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  //Modifica la variable global(showPermisos) para acceder a la interfaz de manejo de los permisos
  function handleShowPermiso(dato, e) {
    e.preventDefault();
    setShowPermisos({ show: !showPermisos.show, data: dato });
  }

  //Realiza la opción de seleccionar todos
  function handleSelect(e) {
    e.preventDefault();
    let checkBoxes = Array.from(document.getElementsByTagName("input"))
      .filter((checkBox) => checkBox.type === "checkbox")
      .filter((checkBox) => checkBox.checked === false);
    checkBoxes.forEach((checkBox) => (checkBox.checked = true));
  }

  //Función para añadir un nuevo usuario
  function handleSubmit(inputs) {
    let dato0 = inputs[0].value;
    let dato1 = inputs[1].value;
    let dato2 = inputs[2].value;
    let dato3 = inputs[3].value;
    POST(url, {
      name: dato0,
      identification: dato1,
      userName: dato2,
      password: dato3,
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
      (d) => d.name.includes(filtro) || d.userName.includes(filtro)
    );
    return salida;
  }

  let body = document.getElementsByTagName("body")[0];
  body.classList.remove("colorBodyError404");
  body.classList.add("colorBody");
  if (!showPermisos.show) {
    return (
      <>
        {/* Se le pasa la función  que controla el estado del filtro */}
        <Marco filtro={setFiltro}>
          <thead>
            <tr>
              <th width="20" className="text-center">
                <i
                  onClick={handleSelect}
                  className="icon-android-checkbox-outline iconoChecked shadow-sm"
                ></i>
              </th>
              <th>Nombre</th>
              <th>Identificación</th>
              <th>Usuario</th>
              <th width="10">Permisos</th>
              <th width="10">Borrar</th>
            </tr>
          </thead>
          <tbody>
            {/* Se filtra antes de mostrar */}
            {filtros().map((dato) =>
              dato.id === 1 ? null : (
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
                  <td>
                    <TextModificar
                      update={handleUpdate.bind(null, dato.id, "name")}
                    >
                      {dato.name}
                    </TextModificar>
                  </td>
                  <td>
                    <TextModificar
                      update={handleUpdate.bind(
                        null,
                        dato.id,
                        "identification"
                      )}
                    >
                      {dato.identification}
                    </TextModificar>
                  </td>
                  <td>
                    <TextModificar
                      update={handleUpdate.bind(null, dato.id, "userName")}
                    >
                      {dato.userName}
                    </TextModificar>
                  </td>
                  <td className="text-center">
                    <i
                      onClick={handleShowPermiso.bind(this, dato)}
                      className="icon-list2 shadow-sm iconoPermiso"
                    ></i>
                  </td>
                  <td className="text-center">
                    <i
                      className="icon-bin shadow-sm iconoBorrar"
                      onClick={handleDelete.bind(this, [dato.id])}
                    ></i>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Marco>
        {/* Botones flotantes  */}
        <div className="botonesTablaUsuario">
          <ButtonToolbar className="mb-5">
            <ButtonGroup className="mr-2">
              <Formulario
                onSubmit={handleSubmit}
                header="Añadir Usuario"
                button={(cb) => (
                  <Button variant="primary" onClick={cb}>
                    <i className="icon-plus4"></i>
                  </Button>
                )}
              >
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter el Nombre"
                      name="name"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Identificación</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Entre la Identificación"
                      name="identification"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter el Usuario"
                      name="userName"
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Entre la Contraseña"
                      name="password"
                    />
                  </Form.Group>
                </Form.Row>
              </Formulario>
            </ButtonGroup>
            <ButtonGroup className="mr-2">
              <Button variant="danger" onClick={handleDelete.bind(this, [])}>
                <i className="icon-bin"></i>
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      </>
    );
  } else {
    return <Permisos show={handleShowPermiso} data={showPermisos.data} />;
  }
};
export default Users;
