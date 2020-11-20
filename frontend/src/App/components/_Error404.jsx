import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Error404 = () => {
  let body = document.getElementsByTagName("body")[0];
  body.classList.remove("colorBody");
  body.classList.add("colorBodyError404");
  return (
    <Container fluid className="centerError404 text-center">
      <Row>
        <Col></Col>
        <Col xl="3" lg="4" md="5" sm="6" xs="9">
          <blockquote className="blockquote ">
            <h1 className="display-1">404</h1>
            <cite>Página no Encontrada</cite>
          </blockquote>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
export default Error404;
