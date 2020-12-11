//Todos los métodos necesarios para la conexión con el servidor se le pueden poner si quieren llevar el jwt de autentificacion por default lo llevan
var server = "http://" + window.location.hostname + ":8080";

const Fetch = (url, data, method, authorization) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let jwt = window.localStorage.getItem("jwt");
  if (!(jwt === null || jwt === undefined) && authorization) {
    myHeaders.append("Authorization", jwt);
  }

  let requestOptions = {};

  if (method === "GET") {
    requestOptions = {
      method: method,
      headers: myHeaders,
      redirect: "follow",
    };
  } else {
    requestOptions = {
      method: method,
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };
  }

  return new Promise((resolve, reject) => {
    fetch(server + url, requestOptions)
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
};

export const POST = (url, data, authorization = true) => {
  return Fetch(url, data, "POST", authorization);
};

export const PUT = (url, data, authorization = true) => {
  return Fetch(url, data, "PUT", authorization);
};

export const GET = (url, authorization = true) => {
  return Fetch(url, null, "GET", authorization);
};

export const DELETE = (url, data, authorization = true) => {
  return Fetch(url, data, "DELETE", authorization);
};
