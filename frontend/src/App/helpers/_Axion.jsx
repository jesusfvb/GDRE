let server = "http://" + window.location.hostname + ":8080";

const Fetch = (url, data, method) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let requestOptions = {
    method: method,
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: "follow",
  };

  return new Promise((resolve, reject) => {
    fetch(server + url, requestOptions)
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
};

export const POST = (url, data) => {
  return Fetch(url, data, "POST");
};

export const PUT = (url, data) => {
  return Fetch(url, data, "PUT");
};
