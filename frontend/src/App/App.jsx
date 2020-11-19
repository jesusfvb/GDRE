import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./helpers/img/logo.png";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { POST, PUT } from "./helpers/_Axion";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: null,
      userName: "",
      authorities: [],
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidMount() {
    let jwt = window.localStorage.getItem("jwt");
    if (jwt === null || jwt === undefined) {
      this.setState({ login: false });
      console.error("error al iniciar sesión");
    } else {
      PUT("/login", { jwt: jwt })
        .then((response) => {
          let Jwt = require("jsonwebtoken");
          let data = Jwt.decode(jwt).sub.split(",");
          this.setState({
            login: !response,
            userName: data.shift(),
            authorities: data,
          });
        })
        .catch((error) =>
          console.error("error al comprobar si estaba autenticado", error)
        );
    }
  }
  handleLogin(e) {
    e.preventDefault();
    POST("/login", {
      userName: e.target.userName.value,
      password: e.target.password.value,
    })
      .then((response) => {
        window.localStorage.setItem("jwt", response.jwt);
        let Jwt = require("jsonwebtoken");
        let data = Jwt.decode(response.jwt).sub.split(",");
        this.setState({
          login: true,
          userName: data.shift(),
          authorities: data,
        });
      })
      .catch((error) => console.error(error));
  }
  handleLogout() {
    window.localStorage.clear();
    this.setState({ login: false, userName: "", authorities: [] });
  }
  render() {
    if (this.state.login == null) {
      return null;
    } else if (!this.state.login) {
      document.getElementsByTagName("body")[0].classList.add("colorBodyLogin");
      return (
        <Container fluid className="myCenter ">
          <Row>
            <Col></Col>
            <Col
              xl="3"
              lg="4"
              md="5"
              sm="6"
              xs="9"
              className="shadow p-3 mb-5 bg-white rounded border colorLogin"
            >
              <Form onSubmit={(e) => this.handleLogin(e)}>
                <Image src={logo} fluid className="mb-4" />
                <Form.Group>
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entre el Usuario"
                    id="userName"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Entre la Contraseña"
                    id="password"
                  />
                </Form.Group>
                <Form.Group className="text-center">
                  <Button variant="secondary" type="submit">
                    Entrar
                  </Button>
                </Form.Group>
              </Form>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      );
    } else {
      document
        .getElementsByTagName("body")[0]
        .classList.remove("colorBodyLogin");
      return (
        <div>
          <label>{this.state.userName}</label>
          {this.state.authorities.map((authority, key) => (
            <label key={key}>_{authority}</label>
          ))}
          <button onClick={this.handleLogout}>Logout</button>
        </div>
      );
    }
  }
}
export default App;
