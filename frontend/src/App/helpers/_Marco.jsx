import React from "react";
import {
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import NavBar from "../components/_NavBar";

//Retorna la estructura básica de las páginas que incluye un input para filtrar u se le pasa como hijos la estructura interna de una tabla
//también se le puede incluir un elemento antes de la tabla por las props.beforeTable
const Marco = (props) => {
  //Recibe los cambios que se manifiestan en el input de filtrar y le pasa a la función de manejo de estado del filtro mediante las props.filtro
  function handleChangeFiltra(e) {
    e.preventDefault();
    if (props.filtro !== undefined) {
      props.filtro(e.target.value);
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col className="p-0">
          <NavBar />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="mt-5 fixed-top" style={{ zIndex: 1 }}>
          <InputGroup className="mt-1" id="filtrar">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <i className="icon-search7"></i>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl placeholder="Filtrar" onChange={handleChangeFiltra} />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="mt-4">
          {props.beforeTable}
          <Table bordered hover size="sm" responsive>
            {props.children}
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default Marco;
