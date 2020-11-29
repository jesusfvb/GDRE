import React from "react";
import { Col, Container, FormControl, InputGroup, Row, Table } from "react-bootstrap";
import NavBar from "../components/_NavBar";

const Marco = (props) => {
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
            <FormControl placeholder="Filtrar" />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="mt-4">
          <Table bordered hover size="sm">
            {props.children}
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default Marco;
