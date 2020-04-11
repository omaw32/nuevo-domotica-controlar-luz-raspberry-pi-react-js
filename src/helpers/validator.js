export const validator = {
  compare,
  verifyUrl,
  formatRut,
  rutEsValido,
  verifyEmail,
  verifyRange,
  verifyLength,
  tiene_letras,
  verifyAlfanumeric,
  validarSoloLetras,
  validate_RangoDias,
  formatearRutConPuntos,
  validate_fechaMayorQue
};
// function that returns true if value is email, false otherwise
function verifyEmail(value) {
  var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRex.test(value)) {
    return true;
  }
  return false;
}
// function that verifies if a string has a given length or not
function verifyLength(value, length) {
  if (value.length >= length) {
    return true;
  }
  return false;
}

function verifyRange(value, lenMin, lenMax) {
  if (value.length < lenMin || value.length > lenMax) {
    return false;
  }
  return true;
}

// function that verifies if two strings are equal
function compare(string1, string2) {
  if (string1 === string2) {
    return true;
  }
  return false;
}

// verifies if value is a valid URL
function verifyUrl(value) {
  try {
    new URL(value);
    return true;
  } catch (_) {
    return false;
  }
}

function formatearRutConPuntos(rut) {
  var actual = rut.replace(/^0+/, "");
  if (actual !== "" && actual.length > 1) {
    var sinPuntos = actual.replace(/\./g, "");
    var actualLimpio = sinPuntos.replace(/-/g, "");
    var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
    var rutPuntos = "";
    var i = 0;
    var j = 1;
    for (i = inicio.length - 1; i >= 0; i--) {
      var letra = inicio.charAt(i);
      rutPuntos = letra + rutPuntos;
      if (j % 3 === 0 && j <= inicio.length - 1) {
        rutPuntos = "." + rutPuntos;
      }
      j++;
    }
    var dv = actualLimpio.substring(actualLimpio.length - 1);
    rutPuntos = rutPuntos + "-" + dv.toUpperCase();
  }
  return rutPuntos;
}

function formatRut(value, useThousandsSeparator) {
  var rutAndDv = splitRutAndDv(value);
  var cRut = rutAndDv[0];
  var cDv = rutAndDv[1];
  if (!(cRut && cDv)) {
    return cRut || value;
  }
  var rutF = "";
  var thousandsSeparator = useThousandsSeparator ? "." : "";
  while (cRut.length > 3) {
    rutF = thousandsSeparator + cRut.substr(cRut.length - 3) + rutF;
    cRut = cRut.substring(0, cRut.length - 3);
  }
  return cRut + rutF + "-" + cDv;
}

function splitRutAndDv(rut) {
  var cValue = clearFormat(rut);
  if (cValue.length === 0) {
    return [null, null];
  }
  if (cValue.length === 1) {
    return [cValue, null];
  }
  var cDv = cValue.charAt(cValue.length - 1);
  var cRut = cValue.substring(0, cValue.length - 1);
  return [cRut, cDv];
}

function clearFormat(value) {
  // return value.replace(/[^0-9kK-]/g, ""); //.replace(/[\.\-]/g, "");
  // eslint-disable-next-line
    return value.replace(/[\.\-]/g, "");
}

function rutEsValido(rut) {
  if (!rut || rut.trim().length < 3) return false;
  const rutLimpio = rut.replace(/[^0-9kK-]/g, "");

  if (rutLimpio.length < 3) return false;

  const split = rutLimpio.split("-");
  if (split.length !== 2) return false;

  const num = parseInt(split[0], 10);
  const dgv = split[1];

  const dvCalc = calculateDV(num);
  return dvCalc === dgv.toUpperCase();
}

function calculateDV(rut) {
  const cuerpo = `${rut}`;
  // Calcular Dígito Verificador
  let suma = 0;
  let multiplo = 2;

  // Para cada dígito del Cuerpo
  for (let i = 1; i <= cuerpo.length; i++) {
    // Obtener su Producto con el Múltiplo Correspondiente
    const index = multiplo * cuerpo.charAt(cuerpo.length - i);

    // Sumar al Contador General
    suma += index;

    // Consolidar Múltiplo dentro del rango [2,7]
    if (multiplo < 7) {
      multiplo += 1;
    } else {
      multiplo = 2;
    }
  }

  // Calcular Dígito Verificador en base al Módulo 11
  const dvEsperado = 11 - (suma % 11);
  if (dvEsperado === 10) return "K";
  if (dvEsperado === 11) return "0";
  return `${dvEsperado}`;
}

function validate_fechaMayorQue(fechaInicial, fechaFinal) {
  if (fechaInicial > fechaFinal) {
    return 0;
  } else {
    return 1;
  }
}

function validate_RangoDias(fechaInicial, fechaFinal) {
  // var fechaInicio = new Date('2016-07-12').getTime();
  // var fechaFin    = new Date('2016-08-01').getTime();
  var mayorATreinta = false;
  var diff = fechaFinal - fechaInicial;
  var diferencia = diff / (1000 * 60 * 60 * 24);
  if (diferencia > 30) {
    mayorATreinta = true;
  }
  return mayorATreinta;
}

function verifyAlfanumeric(value) {
  var tieneLetras = tiene_letras(value);
  var tieneNumeros = tiene_numeros(value);

  if (tieneLetras === 1 && tieneNumeros === 1) {
    if (soloLetrasYNum(value)) {
      return true;
    }
    return false;
  }
  return false;
}

function tiene_letras(texto) {
  var letras = "abcdefghyjklmnñopqrstuvwxyz";
  texto = texto.toLowerCase();
  var letra;
  for (let l = 0; l < texto.length; l++) {
    letra = texto.charAt(l);
    if (letras.indexOf(letra, 0) !== -1) {
      return 1;
    }
  }
  return 0;
}

function tiene_numeros(texto) {
  var numeros = "0123456789";
  var numero;
  for (let n = 0; n < texto.length; n++) {
    numero = texto.charAt(n);
    if (numeros.indexOf(numero, 0) !== -1) {
      return 1;
    }
  }
  return 0;
}

function soloLetrasYNum(campo) {
  var validos = "abcdefghijklmnopqrstuvwxyz0123456789";
  var letra;
  var bien = true;
  for (var i = 0; i < campo.length; i++) {
    letra = campo.charAt(i).toLowerCase();
    if (validos.indexOf(letra) === -1) {
      bien = false;
    }
  }
  return bien;
}

// La siguiente funcion valida el input
function validarSoloLetras(input) {
  let isValid = false;
  const pattern = new RegExp("^([a-z ñáéíóú]{2,50})$", "i");
  if (input && pattern.test(input)) {
    isValid = true;
  }
  return isValid;
}
