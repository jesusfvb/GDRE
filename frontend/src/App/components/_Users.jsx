import React, { useState } from "react";
import { Button, ButtonGroup, ButtonToolbar, Form } from "react-bootstrap";
import Formulario from "../helpers/_Form";
import Marco from "../helpers/_Marco";

import Permisos from "./_Permisos";

const Users = () => {
  const [showPermisos, setShowPermisos] = useState({ show: false });

  function handleShowPermiso(e) {
    e.preventDefault();
    setShowPermisos({ show: !showPermisos.show });
  }

  function handleSelect(e) {
    e.preventDefault();
    let checkBoxes = Array.from(document.getElementsByTagName("input"))
      .filter((checkBox) => checkBox.type === "checkbox")
      .filter((checkBox) => checkBox.checked === false);
    checkBoxes.forEach((checkBox) => (checkBox.checked = true));
  }

  let body = document.getElementsByTagName("body")[0];
  body.classList.remove("colorBodyError404");
  body.classList.add("colorBody");
  if (!showPermisos.show) {
    return (
      <>
        <Marco>
          <thead>
            <tr>
              <th width="20" className="text-center">
                <i
                  onClick={handleSelect}
                  className="icon-android-checkbox-outline iconoChecked shadow-sm"
                ></i>
              </th>
              <th>Nombre</th>
              <th>Solapin</th>
              <th>Usuario</th>
              <th width="10">Permisos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Form.Check type="checkbox" label="" className="ml-2" />
              </td>
              <td>Mark</td>
              <td>Mark</td>
              <td>Otto</td>
              <td className="text-center">
                <i
                  onClick={handleShowPermiso}
                  className="icon-list2 shadow-sm iconoPermiso"
                ></i>
              </td>
            </tr>
          </tbody>
        </Marco>
        <div className="botonesTablaUsuario">
          <ButtonToolbar className="mb-5">
            <ButtonGroup className="mr-2">
              <Formulario
                button={(cb) => (
                  <Button variant="primary" onClick={cb}>
                    <i className="icon-plus4"></i>
                  </Button>
                )}
              >
                aqui ese
              </Formulario>
            </ButtonGroup>
            <ButtonGroup className="mr-2">
              <Button variant="danger">
                <i className="icon-bin"></i>
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      </>
    );
  } else {
    return <Permisos show={handleShowPermiso} />;
  }
};
export default Users;
