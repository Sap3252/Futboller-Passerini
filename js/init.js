"use strict";
function inicializarReferencias() {
    botonTema = document.getElementById("botonTema");
    seccionInicio = document.getElementById("seccionInicio");
    entradaNombreHumano = document.getElementById("entradaNombreHumano");
    selectorDificultad = document.getElementById("selectorDificultad");
    botonComenzar = document.getElementById("botonComenzar");
    seccionJuego = document.getElementById("seccionJuego");
    textoJugador = document.getElementById("textoJugador");
    contadorIntentos = document.getElementById("contadorIntentos");
    textoTemporizador = document.getElementById("textoTemporizador");
    botonReiniciar = document.getElementById("botonReiniciar");
    botonHistorial = document.getElementById("botonHistorial");
    fotoSecreta = document.getElementById("fotoSecreta");
    pistaAltura = document.getElementById("pistaAltura");
    valorPistaAltura = document.getElementById("valorPistaAltura");
    pistaEdad = document.getElementById("pistaEdad");
    valorPistaEdad = document.getElementById("valorPistaEdad");
    pistaOverall = document.getElementById("pistaOverall");
    valorPistaOverall = document.getElementById("valorPistaOverall");
    zonaBusqueda = document.getElementById("zonaBusqueda");
    entradaBusqueda = document.getElementById("entradaBusqueda");
    listaAutocompletado = document.getElementById("listaAutocompletado");
    botonIntentar = document.getElementById("botonIntentar");
    cuerpoTablero = document.getElementById("cuerpoTablero");
    modalMensaje = document.getElementById("modalMensaje");
    tituloModalMensaje = document.getElementById("tituloModalMensaje");
    textoModalMensaje = document.getElementById("textoModalMensaje");
    botonCerrarModalMensaje = document.getElementById("botonCerrarModalMensaje");
    modalResultado = document.getElementById("modalResultado");
    tituloModalResultado = document.getElementById("tituloModalResultado");
    textoModalResultado = document.getElementById("textoModalResultado");
    fotoModalResultado = document.getElementById("fotoModalResultado");
    contenedorRevelacion = document.getElementById("contenedorRevelacion");
    gifExplosion = document.getElementById("gifExplosion");
    audioAcierto = document.getElementById("audioAcierto");
    audioError = document.getElementById("audioError");
    audioDerrota = document.getElementById("audioDerrota");
    audioVictoria = document.getElementById("audioVictoria");
    audioInicio = document.getElementById("audioInicio");
    audioExplosion = document.getElementById("audioExplosion");
    botonNuevaPartida = document.getElementById("botonNuevaPartida");
    botonCerrarModalResultado = document.getElementById("botonCerrarModalResultado");
    modalHistorial = document.getElementById("modalHistorial");
    listaHistorial = document.getElementById("listaHistorial");
    botonOrdenarFecha = document.getElementById("botonOrdenarFecha");
    botonOrdenarIntentos = document.getElementById("botonOrdenarIntentos");
    botonCerrarModalHistorial = document.getElementById("botonCerrarModalHistorial");
    formularioContacto = document.getElementById("formularioContacto");
    entradaNombreContacto = document.getElementById("entradaNombreContacto");
    entradaCorreoContacto = document.getElementById("entradaCorreoContacto");
    entradaMensajeContacto = document.getElementById("entradaMensajeContacto");
    errorNombreContacto = document.getElementById("errorNombreContacto");
    errorCorreoContacto = document.getElementById("errorCorreoContacto");
    errorMensajeContacto = document.getElementById("errorMensajeContacto");
}
function inicializarEventosComunes() {
    if (botonTema !== null) {
        botonTema.addEventListener("click", manejarClicTema);
    }
}
function inicializarEventosJuego() {
    if (botonComenzar === null) {
        return;
    }
    botonComenzar.addEventListener("click", manejarClicComenzar);
    entradaBusqueda.addEventListener("input", manejarEntradaBusqueda);
    entradaBusqueda.addEventListener("keyup", manejarTeclaBusqueda);
    botonIntentar.addEventListener("click", manejarClicIntentar);
    botonReiniciar.addEventListener("click", manejarClicReiniciar);
    botonHistorial.addEventListener("click", manejarClicHistorial);
    botonCerrarModalMensaje.addEventListener("click", manejarClicCerrarModalMensaje);
    botonNuevaPartida.addEventListener("click", manejarClicNuevaPartida);
    botonCerrarModalResultado.addEventListener("click", manejarClicCerrarModalResultado);
    botonOrdenarFecha.addEventListener("click", manejarClicOrdenarFecha);
    botonOrdenarIntentos.addEventListener("click", manejarClicOrdenarIntentos);
    botonCerrarModalHistorial.addEventListener("click", manejarClicCerrarModalHistorial);
    document.addEventListener("click", manejarClicDocumento);
}
function inicializarEventosContacto() {
    if (formularioContacto === null) {
        return;
    }
    formularioContacto.addEventListener("submit", manejarEnvioContacto);
}
function inicializar() {
    inicializarReferencias();
    aplicarTemaGuardado();
    inicializarEventosComunes();
    inicializarEventosJuego();
    inicializarEventosContacto();
}
inicializar();