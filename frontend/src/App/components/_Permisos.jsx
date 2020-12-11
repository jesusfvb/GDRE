import React, { useEffect, useState } from "react";

import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";

import { DELETE, GET, POST } from "../helpers/_Axion";
import Marco from "../helpers/_Marco";

const Permisos = (props) => {
  const url = "/user/authorities?id=" + props.data.id;
  const [datas, setDatas] = useState({
    props: props.data.authorities,
    backend: [],
  });
  const [filtro, setFiltro] = useState("");
  //Carga los permisos del backend que no tiene el usuario
  useEffect(() => {
    GET(url)
      .then((data) =>
        setDatas((datas) => {
          datas.backend = data;
          return { ...datas };
        })
      )
      .catch((error) => console.error(error));
  }, [url]);

  //Le quita los permiso del usuario y actualiza el estado en el backend
  function handleQuitar(dato, e) {
    e.preventDefault();
    DELETE(url, { id: dato.id }).then((d) => {
      if (d) {
        setDatas((datas) => {
          if (datas.props.includes(dato)) {
            datas.props.splice(datas.props.indexOf(dato), 1);
          }
          if (!datas.backend.includes(dato)) {
            datas.backend.push(dato);
            datas.backend.sort((a, b) => a.value.localeCompare(b.value));
          }
          return { ...datas };
        });
      }
    });
  }

  //Le añade los permiso al usuario y actualiza el estado en el backend
  function handleAnnadir(dato, e) {
    e.preventDefault();
    POST(url, { id: dato.id })
      .then((d) => {
        if (d) {
          setDatas((datas) => {
            if (datas.backend.includes(dato)) {
              datas.backend.splice(datas.backend.indexOf(dato), 1);
            }
            if (!datas.props.includes(dato)) {
              datas.props.push(dato);
            }
            return { ...datas };
          });
        }
      })
      .catch((error) => console.error(error));
  }

  function filtroPros() {
    let salida = datas.props.filter((d) =>
      d.value.includes(filtro.toUpperCase())
    );
    return salida;
  }
  function filtroBackend() {
    let salida = datas.backend.filter((d) =>
      d.value.includes(filtro.toUpperCase())
    );
    return salida;
  }

  return (
    <>
      <Marco beforeTable={<h2>{props.data.name}</h2>} filtro={setFiltro}>
        <thead>
          <tr>
            <th>Valor</th>
            <th>Descripción</th>
            <th width="100">Acción</th>
          </tr>
        </thead>
        <tbody>
          {filtroPros().map((dato) =>
            dato.id === 0 ? null : (
              <tr key={dato.id}>
                <td>{dato.value}</td>
                <td>{dato.description}</td>
                <td className="text-center">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleQuitar.bind(this, dato)}
                  >
                    Quitar
                  </Button>
                </td>
              </tr>
            )
          )}
          {filtroBackend().map((dato) => (
            <tr key={dato.id}>
              <td>{dato.value}</td>
              <td>{dato.description}</td>
              <td className="text-center">
                <Button
                  variant="info"
                  size="sm"
                  onClick={handleAnnadir.bind(this, dato)}
                >
                  Añadir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Marco>
      <div className="botonesTablaUsuario">
        <ButtonToolbar className="mb-5">
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
export default Permisos;
