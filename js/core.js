"use strict";
var MAXIMO_INTENTOS = 8;
var PUNTOS_BASE = { facil: 60, medio: 80, dificil: 100 };
var CLAVE_HISTORIAL = "futbollerHistorial";
var jugadorSecreto = null;
var intentosRealizados = [];
var partidaTerminada = false;
var nombreJugadorHumano = "";
var dificultadActual = "facil";
var momentoInicio = null;
var idIntervaloTemporizador = null;
var jugadorSeleccionado = null;
var idRetrasoBusqueda = null;

function reproducirAudio(elementoAudio) {
    if (elementoAudio === null) {
        return;
    }
    try {
        elementoAudio.currentTime = 0;
        elementoAudio.play();
    } catch (error) {
        elementoAudio.load();
    }
}
function rellenarCeros(numero) {
    var texto;
    texto = String(numero);
    if (texto.length < 2) {
        texto = "0" + texto;
    }
    return texto;
}
function formatearDuracion(segundos) {
    var minutos;
    var resto;
    minutos = Math.floor(segundos / 60);
    resto = segundos % 60;
    return rellenarCeros(minutos) + ":" + rellenarCeros(resto);
}
function formatearFecha(fecha) {
    var parteFecha;
    var parteHora;
    parteFecha = rellenarCeros(fecha.getDate()) + "/" + rellenarCeros(fecha.getMonth() + 1) + "/" + fecha.getFullYear();
    parteHora = rellenarCeros(fecha.getHours()) + ":" + rellenarCeros(fecha.getMinutes());
    return parteFecha + " " + parteHora;
}
function obtenerEtiquetaDificultad(dificultad) {
    if (dificultad === "medio") {
        return "Medio";
    }
    if (dificultad === "dificil") {
        return "Difícil";
    }
    return "Fácil";
}
function obtenerHistorial() {
    var datos;
    var historial;
    datos = localStorage.getItem(CLAVE_HISTORIAL);
    historial = [];
    if (datos !== null) {
        try {
            historial = JSON.parse(datos);
        } catch (error) {
            historial = [];
        }
    }
    return historial;
}
function guardarPartidaEnHistorial(partida) {
    var historial;
    historial = obtenerHistorial();
    historial.push(partida);
    localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(historial));
}
function compararPorFecha(partidaA, partidaB) {
    return partidaB.marcaTiempo - partidaA.marcaTiempo;
}
function compararPorIntentos(partidaA, partidaB) {
    return partidaA.intentos - partidaB.intentos;
}
function calcularDuracionSegundos() {
    if (momentoInicio === null) {
        return 0;
    }
    return Math.round((Date.now() - momentoInicio) / 1000);
}
function calcularPuntaje(gano, dificultad, intentosUsados, duracionSegundos) {
    var puntaje;
    if (!gano) {
        return 0;
    }
    puntaje = PUNTOS_BASE[dificultad] - (intentosUsados - 1) * 10;
    if (duracionSegundos < 60) {
        puntaje = puntaje + 20;
    } else if (duracionSegundos < 120) {
        puntaje = puntaje + 10;
    }
    if (puntaje < 10) {
        puntaje = 10;
    }
    return puntaje;
}
function compararCategoria(valorIntento, valorSecreto) {
    if (valorIntento === valorSecreto) {
        return "verde";
    }
    return "rojo";
}
function compararNumerico(valorIntento, valorSecreto) {
    if (valorIntento === valorSecreto) {
        return "verde";
    }
    if (valorSecreto > valorIntento) {
        return "arriba";
    }
    return "abajo";
}
function compararJugadores(intento, secreto) {
    return {
        nacionalidad: compararCategoria(intento.nationality, secreto.nationality),
        club: compararCategoria(intento.club, secreto.club),
        posicion: compararCategoria(intento.position, secreto.position),
        edad: compararNumerico(intento.age, secreto.age),
        overall: compararNumerico(intento.overall, secreto.overall),
        altura: compararNumerico(intento.heightCm, secreto.heightCm)
    };
}
function contarAciertos(comparacion) {
    var claves;
    var indice;
    var total;
    claves = ["nacionalidad", "club", "posicion", "edad", "overall", "altura"];
    total = 0;
    for (indice = 0; indice < claves.length; indice = indice + 1) {
        if (comparacion[claves[indice]] === "verde") {
            total = total + 1;
        }
    }
    return total;
}
function esIntentoRepetido(jugador) {
    var indice;
    for (indice = 0; indice < intentosRealizados.length; indice = indice + 1) {
        if (intentosRealizados[indice].id === jugador.id) {
            return true;
        }
    }
    return false;
}
function obtenerIntentosRestantes() {
    return MAXIMO_INTENTOS - intentosRealizados.length;
}