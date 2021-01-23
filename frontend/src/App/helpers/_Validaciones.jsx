// Función que se encarga de según el nombre del input a validarlos y retorna true o false según la validación general
export const validadorInputs = (inputs) => {
  let validoGeneral = true;
  inputs.forEach((i) => {
    let valido = false;
    switch (i.name) {
      case "name":
        valido = name(i.value);
        break;
      case "nameUbicacion":
        valido = nameUbicacion(i.value);
        break;
      case "identification":
        valido = identification(i.value);
        break;
      case "userName":
        valido = userName(i.value);
        break;
      case "password":
        valido = password(i.value);
        break;
      case "numberOfRoom":
        valido = numberOfRoom(i.value);
        break;
      case "numero":
        valido = numberTheRoom(i.value);
        break;
      case "numberOfPeople":
        valido = numberOfPeople(i.value);
        break;
      case "date":
        valido = date(i.value);
        break;
      case "evaluacion":
        valido = evaluacion(i.value);
        break;
      case "incidencia":
        valido = incidencia(i.value);
        break;
      case "inicio":
        valido = inicio(i.value);
        break;
      case "fin":
        valido = fin(i.value);
        break;
      case "turno":
        valido = turno(i.value);
        break;
      default:
        break;
    }
    if (valido) {
      if (!i.classList.contains("is-valid")) {
        if (i.classList.contains("is-invalid")) {
          i.classList.remove("is-invalid");
          i.classList.add("is-valid");
        } else {
          i.classList.add("is-valid");
        }
      }
    } else {
      if (!i.classList.contains("is-invalid")) {
        if (i.classList.contains("is-valid")) {
          i.classList.remove("is-valid");
          i.classList.add("is-invalid");
        } else {
          i.classList.add("is-invalid");
        }
      }
    }
    if (validoGeneral) {
      validoGeneral = valido;
    }
  });
  return validoGeneral;
};

//Función que se encarga de validar los input, se le pasa el input a validad y la opcion por la que este se validara y este le coloca la clase "is-invalidM" retorna si es valido o no
//Solo se a implementado para validar los textarea
export const validadorInput = (input, option) => {
  let valido = false;
  switch (option) {
    case "name":
      valido = name(input.value);
      break;
    case "nameUbicacion":
      valido = nameUbicacion(input.value);
      break;
    case "identification":
      valido = identification(input.value);
      break;
    case "userName":
      valido = userName(input.value);
      break;
    case "password":
      valido = password(input.value);
      break;
    case "numberOfRooms":
      valido = numberOfRoom(input.value);
      break;
    case "numero":
      valido = numberTheRoom(input.value);
      break;
    case "numberOfPeople":
      valido = numberOfPeople(input.value);
      break;
    case "date":
      valido = date(input.value);
      break;
    case "evaluacion":
      valido = evaluacion(input.value);
      break;
    case "incidencia":
      valido = incidencia(input.value);
      break;
    case "inicio":
      valido = inicio(input.value);
      break;
    case "fin":
      valido = fin(input.value);
      break;
    case "turno":
      valido = turno(input.value);
      break;
    default:
      break;
  }
  if (valido) {
    if (input.classList.contains("is-invalidM")) {
      input.classList.remove("is-invalidM");
    }
  } else {
    if (!input.classList.contains("is-invalidM")) {
      input.classList.add("is-invalidM");
    }
  }
  return valido;
};

//Funciones que a traves de expresiones regulares validan los datos que se le pasan por parámetro
function name(value) {
  let salida = /[A-Z]([a-z]|[áéíóúñ])+(\s[A-Z]([.]|([a-z]|[áéíóúñ]))+)*/.exec(
    value
  );
  return salida !== null && salida[0] === value;
}

function nameUbicacion(value) {
  let salida = /([A-Z]|[a-z]|[0-9])+/.exec(value);
  return salida !== null && salida[0] === value;
}

function identification(value) {
  let salida = /[A-Z][0-9]{7}/.exec(value);
  return salida !== null && salida[0] === value;
}

function userName(value) {
  let salida = /[a-z]{4,}/.exec(value);
  return salida !== null && salida[0] === value;
}

function password(value) {
  let salida = /([A-Z]|[a-z]|[0-9]){4,}/.exec(value);
  return salida !== null && salida[0] === value;
}

function numberOfRoom(value) {
  let salida = /[0-9]+/.exec(value);
  return salida !== null && salida[0] === value;
}

function numberTheRoom(value) {
  let salida = /[0-9]+/.exec(value);
  return salida !== null && salida[0] === value;
}
function numberOfPeople(value) {
  let salida = /[0-9]+/.exec(value);
  return salida !== null && salida[0] === value;
}

function date(value) {
  let salida = /[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/.exec(value);
  return salida !== null && salida[0] === value;
}

function evaluacion(value) {
  return (
    value !== null &&
    (value === "Bien" || value === "Regular" || value === "Mal")
  );
}

function incidencia() {
  return true;
}

function inicio(value) {
  let salida = /[0-9][0-9]:[0-9][0-9]/.exec(value);
  return salida !== null && salida[0] === value;
}
function fin(value) {
  let salida = /[0-9][0-9]:[0-9][0-9]/.exec(value);
  return salida !== null && salida[0] === value;
}

function turno(value) {
  switch (value) {
    case "...":
      return false;
    case "Residencia":
      return true;
    case "Docente":
      return true;
    default:
      break;
  }
}
