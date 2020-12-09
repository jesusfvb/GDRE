// Función que se encarga de según el nombre del input a validarlos y retorna true o false según la validación general
export const validadorInputs = (inputs) => {
  let validoGeneral = true;
  inputs.forEach((i) => {
    let valido = false;
    switch (i.name) {
      case "name":
        valido = name(i.value);
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

export const validadorInput = (input, option) => {
  let valido = false;
  switch (option) {
    case "name":
      valido = name(input.value);
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
