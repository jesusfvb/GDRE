import React, { useEffect, useState } from "react";
import { POST, PUT } from "./helpers/_Axion";

export const Session = React.createContext({
  userName: "",
  authorities: [],
  cb: null,
});

const App = () => {
  const [session, setSession] = useState({
    login: null,
    userName: "",
    authorities: [],
  });

  useEffect(() => {
    handleScroll();
    handleLoad();
  }, []);

  function handleLoad() {
    let jwt = window.localStorage.getItem("jwt");
    if (jwt === null || jwt === undefined) {
      setSession({
        login: false,
        userName: "",
        authorities: [],
      });
      console.error("error al iniciar sesión");
    } else {
      PUT("/login", { jwt: jwt })
        .then((response) => {
          let Jwt = require("jsonwebtoken");
          let data = Jwt.decode(jwt).sub.split(",");
          setSession({
            login: !response,
            userName: data.shift(),
            authorities: data,
          });
        })
        .catch((error) => {
          console.error("error al comprobar si estaba autenticado", error);
          setSession({
            login: false,
            userName: "",
            authorities: [],
          });
        });
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    POST("/login", {
      userName: e.target.userName.value,
      password: e.target.password.value,
    })
      .then((response) => {
        window.localStorage.setItem("jwt", response.jwt);
        let Jwt = require("jsonwebtoken");
        let data = Jwt.decode(response.jwt).sub.split(",");
        setSession({
          login: true,
          userName: data.shift(),
          authorities: data,
        });
      })
      .catch((error) => console.error(error));
  }

  function handleLogout() {
    window.localStorage.clear();
    setSession({
      login: false,
      userName: "",
      authorities: [],
    });
  }

  function handleScroll() {
    let scroll = 0;
    document.addEventListener("scroll", () => {
      let filtro = document.getElementById("filtrar");
      if (window.scrollY < scroll && filtro !== null) {
        scroll = window.scrollY;
        filtro.classList.remove("d-none");
      }
      if (window.scrollY > scroll && filtro !== null) {
        scroll = window.scrollY;
        filtro.classList.add("d-none");
      }
    });
  }

  return <h1>Jesus</h1>;
};

export default App;
