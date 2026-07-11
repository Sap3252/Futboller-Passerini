"use strict";
var URL_BASE_API = "https://futbolle-daw-uai-2026.onrender.com/api/players";
function procesarRespuesta(respuesta) {
    if (!respuesta.ok) {
        throw new Error("El servidor respondió con un error");
    }
    return respuesta.json();
}
function buscarJugadores(consulta, limite, alExito, alError) {
    var direccion;
    direccion = URL_BASE_API + "/search?q=" + encodeURIComponent(consulta) + "&limit=" + limite;
    fetch(direccion).then(procesarRespuesta).then(alExito).catch(alError);
}
function obtenerJugadorAleatorio(alExito, alError) {
    fetch(URL_BASE_API + "/random").then(procesarRespuesta).then(alExito).catch(alError);
}