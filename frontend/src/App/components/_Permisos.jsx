import React from "react";
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";

import Marco from "../helpers/_Marco";

const Permisos = (props) => {
  return (
    <>
      <Marco>
        <thead>
          <tr>
            <th>Valor</th>
            <th>Descripción</th>
            <th width="100">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Mark</td>
            <td className="text-center">
              <Button variant="primary" size="sm">
                Quitar
              </Button>
            </td>
          </tr>
        </tbody>
      </Marco>
      <div className="botonesTablaUsuario">
        <ButtonToolbar className="mb-5">
          <ButtonGroup className="mr-2">
            <Button variant="primary" onClick={props.show}>
              <i className="icon-arrow-left4"> Retroceder</i>
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    </>
  );
};
export default Permisos;
