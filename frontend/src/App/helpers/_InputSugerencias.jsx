import React, { useEffect, useRef, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { GET } from "./_Axion";

const InputSugerencias = () => {
  let url = "/user";
  const [sugerencias, setSugerencias] = useState([]);
  const [valor, setValor] = useState("");
  const inputSugerencia = useRef(null);
  useEffect(() => {
    GET(url)
      .then((datos) => {
        setSugerencias(datos);
      })
      .catch((error) => console.error(error));
  }, [url]);

  function handleChangeValor(e) {
    e.preventDefault();
    setValor(e.target.value);
  }
  function handleFilter() {
    let datosFiltrados = sugerencias.filter((dato) =>
      dato.name.toString().toLowerCase().includes(valor.toLowerCase())
    );
    return datosFiltrados;
  }
  function handleSelect(id, texto) {
    inputSugerencia.current.focus = false;
    inputSugerencia.current.id = id;
    setValor(texto);
  }
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          as={Form.Control}
          type="text"
          placeholder="Enter el nombre"
          name="name"
          value={valor}
          onChange={handleChangeValor}
          ref={inputSugerencia}
        />
        <Dropdown.Menu>
          {handleFilter().map((sugerencia, i) => {
            if (sugerencia.id === 1) {
              return null;
            } else {
              return (
                <Dropdown.Item
                  key={i}
                  onSelect={handleSelect.bind(
                    this,
                    sugerencia.id,
                    sugerencia.name
                  )}
                >
                  {sugerencia.name}
                </Dropdown.Item>
              );
            }
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default InputSugerencias;
