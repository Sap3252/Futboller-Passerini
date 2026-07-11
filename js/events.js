"use strict";
var CLAVE_TEMA = "futbollerTema";
var CORREO_CONTACTO = "santiago.passerini@gmail.com";
var EXPRESION_NOMBRE_JUEGO = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ]{3,}$/;
var EXPRESION_NOMBRE_CONTACTO = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ]+$/;
var EXPRESION_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var textoIntentoPendiente = "";
var revelacionRealizada = false;
var idRespaldoRevelacion = null;
var audioFinActual = null;
var botonTema = null;
var seccionInicio = null;
var entradaNombreHumano = null;
var selectorDificultad = null;
var botonComenzar = null;
var seccionJuego = null;
var textoJugador = null;
var contadorIntentos = null;
var textoTemporizador = null;
var botonReiniciar = null;
var botonHistorial = null;
var fotoSecreta = null;
var pistaAltura = null;
var valorPistaAltura = null;
var pistaEdad = null;
var valorPistaEdad = null;
var pistaOverall = null;
var valorPistaOverall = null;
var zonaBusqueda = null;
var entradaBusqueda = null;
var listaAutocompletado = null;
var botonIntentar = null;
var cuerpoTablero = null;
var modalMensaje = null;
var tituloModalMensaje = null;
var textoModalMensaje = null;
var botonCerrarModalMensaje = null;
var modalResultado = null;
var tituloModalResultado = null;
var textoModalResultado = null;
var fotoModalResultado = null;
var contenedorRevelacion = null;
var gifExplosion = null;
var audioAcierto = null;
var audioError = null;
var audioDerrota = null;
var audioVictoria = null;
var audioInicio = null;
var audioExplosion = null;
var botonNuevaPartida = null;
var botonCerrarModalResultado = null;
var modalHistorial = null;
var listaHistorial = null;
var botonOrdenarFecha = null;
var botonOrdenarIntentos = null;
var botonCerrarModalHistorial = null;
var formularioContacto = null;
var entradaNombreContacto = null;
var entradaCorreoContacto = null;
var entradaMensajeContacto = null;
var errorNombreContacto = null;
var errorCorreoContacto = null;
var errorMensajeContacto = null;


function mostrarElemento(elemento) {
    elemento.classList.remove("oculto");
}

function ocultarElemento(elemento) {
    elemento.classList.add("oculto");
}

function mostrarModalMensaje(titulo, texto) {
    tituloModalMensaje.textContent = titulo;
    textoModalMensaje.textContent = texto;
    mostrarElemento(modalMensaje);
}

function manejarErrorRed() {
    mostrarModalMensaje("Error de red", "No se pudo conectar con el servidor. Revisá tu conexión y volvé a intentar.");
}

function vaciarElemento(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

function ocultarAutocompletado() {
    vaciarElemento(listaAutocompletado);
    ocultarElemento(listaAutocompletado);
}

function seleccionarJugadorAutocompletado(jugador) {
    jugadorSeleccionado = jugador;
    entradaBusqueda.value = jugador.name;
    ocultarAutocompletado();
}

function crearManejadorSeleccion(jugador) {
    function manejarSeleccion() {
        seleccionarJugadorAutocompletado(jugador);
    }
    return manejarSeleccion;
}

function mostrarAutocompletado(jugadores) {
    var indice;
    var elemento;
    vaciarElemento(listaAutocompletado);
    if (jugadores.length === 0) {
        ocultarElemento(listaAutocompletado);
        return;
    }
    for (indice = 0; indice < jugadores.length; indice = indice + 1) {
        elemento = document.createElement("li");
        elemento.className = "opcion-autocompletado";
        elemento.textContent = jugadores[indice].name;
        elemento.addEventListener("click", crearManejadorSeleccion(jugadores[indice]));
        listaAutocompletado.appendChild(elemento);
    }
    mostrarElemento(listaAutocompletado);
}

function ejecutarBusquedaAutocompletado() {
    var texto;
    idRetrasoBusqueda = null;
    texto = entradaBusqueda.value.trim();
    if (texto.length < 2) {
        ocultarAutocompletado();
        return;
    }
    buscarJugadores(texto, 8, mostrarAutocompletado, manejarErrorRed);
}

function manejarEntradaBusqueda() {
    jugadorSeleccionado = null;
    if (idRetrasoBusqueda !== null) {
        clearTimeout(idRetrasoBusqueda);
    }
    idRetrasoBusqueda = setTimeout(ejecutarBusquedaAutocompletado, 300);
}

function manejarClicDocumento(evento) {
    if (zonaBusqueda !== null && !zonaBusqueda.contains(evento.target)) {
        ocultarAutocompletado();
    }
}

function actualizarTextoTemporizador() {
    textoTemporizador.textContent = formatearDuracion(calcularDuracionSegundos());
}

function iniciarTemporizador() {
    if (idIntervaloTemporizador === null) {
        momentoInicio = Date.now();
        idIntervaloTemporizador = setInterval(actualizarTextoTemporizador, 1000);
    }
}

function detenerTemporizador() {
    if (idIntervaloTemporizador !== null) {
        clearInterval(idIntervaloTemporizador);
        idIntervaloTemporizador = null;
    }
}

function actualizarContadorIntentos() {
    contadorIntentos.textContent = String(obtenerIntentosRestantes());
}

function actualizarFotoPista() {
    var nivel;
    if (dificultadActual !== "facil") {
        return;
    }
    nivel = 8 - intentosRealizados.length;
    if (nivel < 0) {
        nivel = 0;
    }
    fotoSecreta.className = "foto-secreta desenfoque-" + nivel;
}

function actualizarPistasProgresivas() {
    var fallos;
    if (dificultadActual !== "medio") {
        return;
    }
    fallos = intentosRealizados.length;
    if (fallos >= 2) {
        valorPistaAltura.textContent = jugadorSecreto.heightCm + " cm";
        mostrarElemento(pistaAltura);
    }
    if (fallos >= 4) {
        valorPistaEdad.textContent = jugadorSecreto.age + " años";
        mostrarElemento(pistaEdad);
    }
    if (fallos >= 6) {
        valorPistaOverall.textContent = String(jugadorSecreto.overall);
        mostrarElemento(pistaOverall);
    }
}

function usarFotoPlaceholder() {
    if (this.src.indexOf("personaje-placeholder") === -1) {
        this.src = "img/personaje-placeholder.jpg";
    }
}

function ocultarImagenRota() {
    this.style.display = "none";
}

function crearCeldaJugador(jugador) {
    var celda;
    var foto;
    var nombre;
    celda = document.createElement("div");
    foto = document.createElement("img");
    nombre = document.createElement("span");
    celda.className = "celda celda-jugador";
    foto.className = "foto-intento";
    foto.alt = jugador.name;
    foto.setAttribute("referrerpolicy", "no-referrer");
    foto.onerror = usarFotoPlaceholder;
    foto.src = jugador.photo;
    nombre.textContent = jugador.name;
    celda.appendChild(foto);
    celda.appendChild(nombre);
    return celda;
}

function crearCeldaComparada(texto, resultado) {
    var celda;
    var contenido;
    var clase;
    celda = document.createElement("div");
    contenido = texto;
    clase = "celda";
    if (resultado === "verde") {
        clase = clase + " celda-verde";
    } else if (resultado === "rojo") {
        clase = clase + " celda-roja";
    } else if (resultado === "arriba") {
        clase = clase + " celda-neutra";
        contenido = texto + " ▲";
    } else if (resultado === "abajo") {
        clase = clase + " celda-neutra";
        contenido = texto + " ▼";
    }
    celda.className = clase;
    celda.textContent = contenido;
    return celda;
}

function crearCeldaClub(jugador, resultado) {
    var celda;
    var logo;
    var nombre;
    var clase;
    celda = document.createElement("div");
    logo = document.createElement("img");
    nombre = document.createElement("span");
    clase = "celda";
    if (resultado === "verde") {
        clase = clase + " celda-verde";
    } else if (resultado === "rojo") {
        clase = clase + " celda-roja";
    }
    celda.className = clase;
    logo.className = "logo-club";
    logo.alt = jugador.club;
    logo.setAttribute("referrerpolicy", "no-referrer");
    logo.onerror = ocultarImagenRota;
    logo.src = jugador.clubLogo;
    nombre.textContent = jugador.club;
    celda.appendChild(logo);
    celda.appendChild(nombre);
    return celda;
}

function agregarFilaTablero(jugador, comparacion) {
    var fila;
    fila = document.createElement("div");
    fila.className = "fila";
    fila.appendChild(crearCeldaJugador(jugador));
    fila.appendChild(crearCeldaComparada(jugador.nationality, comparacion.nacionalidad));
    fila.appendChild(crearCeldaClub(jugador, comparacion.club));
    fila.appendChild(crearCeldaComparada(jugador.position, comparacion.posicion));
    fila.appendChild(crearCeldaComparada(String(jugador.age), comparacion.edad));
    fila.appendChild(crearCeldaComparada(String(jugador.overall), comparacion.overall));
    fila.appendChild(crearCeldaComparada(jugador.heightCm + " cm", comparacion.altura));
    cuerpoTablero.appendChild(fila);
}

function reiniciarPistas() {
    ocultarElemento(pistaAltura);
    ocultarElemento(pistaEdad);
    ocultarElemento(pistaOverall);
    if (dificultadActual === "facil") {
        fotoSecreta.src = jugadorSecreto.photo;
        fotoSecreta.className = "foto-secreta desenfoque-8";
    } else {
        fotoSecreta.className = "foto-secreta oculto";
    }
}

function reproducirSonidoAcierto() {
    reproducirAudio(audioAcierto);
}

function reproducirSonidoInicio() {
    reproducirAudio(audioInicio);
}

function reproducirSonidoExplosion() {
    reproducirAudio(audioExplosion);
}

function prepararPartida(jugador) {
    jugadorSecreto = jugador;
    intentosRealizados = [];
    partidaTerminada = false;
    jugadorSeleccionado = null;
    momentoInicio = null;
    detenerTemporizador();
    textoTemporizador.textContent = "00:00";
    vaciarElemento(cuerpoTablero);
    entradaBusqueda.value = "";
    ocultarAutocompletado();
    actualizarContadorIntentos();
    textoJugador.textContent = "Jugador: " + nombreJugadorHumano + " | Dificultad: " + obtenerEtiquetaDificultad(dificultadActual);
    reiniciarPistas();
    reproducirSonidoInicio();
    ocultarElemento(seccionInicio);
    mostrarElemento(seccionJuego);
}

function reiniciarGifExplosion() {
    var fuente;
    fuente = gifExplosion.getAttribute("src").split("?")[0];
    gifExplosion.setAttribute("src", fuente + "?t=" + Date.now());
}

function revelarFotoResultado() {
    fotoModalResultado.className = "foto-resultado desenfoque-0";
}

function ocultarGifExplosion() {
    ocultarElemento(gifExplosion);
}

function iniciarRevelacionConExplosion() {
    if (revelacionRealizada) {
        return;
    }
    revelacionRealizada = true;
    if (idRespaldoRevelacion !== null) {
        clearTimeout(idRespaldoRevelacion);
        idRespaldoRevelacion = null;
    }
    if (audioFinActual !== null) {
        audioFinActual.removeEventListener("ended", iniciarRevelacionConExplosion);
        audioFinActual = null;
    }
    reiniciarGifExplosion();
    mostrarElemento(gifExplosion);
    reproducirSonidoExplosion();
    setTimeout(revelarFotoResultado, 500);
    setTimeout(ocultarGifExplosion, 1000);
}

function terminarPartida(gano) {
    var duracion;
    var puntaje;
    var partida;
    partidaTerminada = true;
    revelacionRealizada = false;
    duracion = calcularDuracionSegundos();
    detenerTemporizador();
    puntaje = calcularPuntaje(gano, dificultadActual, intentosRealizados.length, duracion);
    partida = {
        nombre: nombreJugadorHumano,
        resultado: gano ? "Ganó" : "Perdió",
        intentos: intentosRealizados.length,
        fecha: formatearFecha(new Date()),
        marcaTiempo: Date.now(),
        duracion: duracion,
        puntaje: puntaje,
        dificultad: obtenerEtiquetaDificultad(dificultadActual)
    };
    guardarPartidaEnHistorial(partida);
    if (dificultadActual === "facil") {
        fotoSecreta.className = "foto-secreta desenfoque-0";
    }
    fotoModalResultado.src = jugadorSecreto.photo;
    fotoModalResultado.className = "foto-resultado desenfoque-8";
    mostrarElemento(modalResultado);
    if (gano) {
        tituloModalResultado.textContent = "¡Ganaste!";
        textoModalResultado.textContent = "Adivinaste a " + jugadorSecreto.name + " en " + intentosRealizados.length + " intento(s). Puntaje: " + puntaje + ".";
        audioFinActual = audioVictoria;
    } else {
        tituloModalResultado.textContent = "Perdiste";
        textoModalResultado.textContent = "Se agotaron los intentos. El jugador secreto era " + jugadorSecreto.name + ". Puntaje: 0.";
        audioFinActual = audioDerrota;
    }
    audioFinActual.addEventListener("ended", iniciarRevelacionConExplosion);
    reproducirAudio(audioFinActual);
    idRespaldoRevelacion = setTimeout(iniciarRevelacionConExplosion, 1800);
}

function procesarIntentoConJugador(jugador) {
    var comparacion;
    if (esIntentoRepetido(jugador)) {
        mostrarModalMensaje("Intento repetido", "Ya intentaste con " + jugador.name + " en esta partida. Probá con otro jugador.");
        return;
    }
    if (intentosRealizados.length === 0) {
        iniciarTemporizador();
    }
    intentosRealizados.push(jugador);
    comparacion = compararJugadores(jugador, jugadorSecreto);
    agregarFilaTablero(jugador, comparacion);
    actualizarContadorIntentos();
    entradaBusqueda.value = "";
    jugadorSeleccionado = null;
    ocultarAutocompletado();
    if (jugador.id === jugadorSecreto.id) {
        terminarPartida(true);
        return;
    }
    if (contarAciertos(comparacion) > 0) {
        reproducirSonidoAcierto();
    }
    if (obtenerIntentosRestantes() === 0) {
        terminarPartida(false);
        return;
    }
    actualizarFotoPista();
    actualizarPistasProgresivas();
}

function manejarResultadoBusquedaIntento(jugadores) {
    var indice;
    var encontrado;
    encontrado = null;
    for (indice = 0; indice < jugadores.length; indice = indice + 1) {
        if (jugadores[indice].name.toLowerCase() === textoIntentoPendiente.toLowerCase()) {
            encontrado = jugadores[indice];
        }
    }
    if (encontrado === null) {
        mostrarModalMensaje("Jugador inexistente", "El nombre ingresado no existe en el dataset. Seleccioná un jugador del autocompletado.");
        return;
    }
    procesarIntentoConJugador(encontrado);
}

function manejarClicIntentar() {
    var texto;
    if (jugadorSecreto === null) {
        return;
    }
    if (partidaTerminada) {
        mostrarModalMensaje("Partida terminada", "La partida ya terminó. Reiniciá para jugar de nuevo.");
        return;
    }
    texto = entradaBusqueda.value.trim();
    if (texto === "") {
        mostrarModalMensaje("Intento vacío", "Escribí el nombre de un jugador antes de intentar.");
        return;
    }
    if (jugadorSeleccionado !== null && jugadorSeleccionado.name.toLowerCase() === texto.toLowerCase()) {
        procesarIntentoConJugador(jugadorSeleccionado);
        return;
    }
    textoIntentoPendiente = texto;
    buscarJugadores(texto, 25, manejarResultadoBusquedaIntento, manejarErrorRed);
}

function manejarTeclaBusqueda(evento) {
    if (evento.key === "Enter") {
        manejarClicIntentar();
    }
}

function manejarClicComenzar() {
    var nombre;
    nombre = entradaNombreHumano.value.trim();
    if (!EXPRESION_NOMBRE_JUEGO.test(nombre)) {
        mostrarModalMensaje("Nombre inválido", "Ingresá un nombre alfanumérico de al menos 3 letras para comenzar.");
        return;
    }
    nombreJugadorHumano = nombre;
    dificultadActual = selectorDificultad.value;
    obtenerJugadorAleatorio(prepararPartida, manejarErrorRed);
}

function manejarClicReiniciar() {
    obtenerJugadorAleatorio(prepararPartida, manejarErrorRed);
}

function manejarClicNuevaPartida() {
    ocultarElemento(modalResultado);
    manejarClicReiniciar();
}

function manejarClicCerrarModalMensaje() {
    ocultarElemento(modalMensaje);
}

function manejarClicCerrarModalResultado() {
    ocultarElemento(modalResultado);
}

function manejarClicCerrarModalHistorial() {
    ocultarElemento(modalHistorial);
}

function aplicarTema(nombreTema) {
    if (nombreTema === "oscuro") {
        document.body.classList.add("tema-oscuro");
        if (botonTema !== null) {
            botonTema.textContent = "Modo claro";
        }
    } else {
        document.body.classList.remove("tema-oscuro");
        if (botonTema !== null) {
            botonTema.textContent = "Modo oscuro";
        }
    }
}
function aplicarTemaGuardado() {
    var temaGuardado;
    temaGuardado = localStorage.getItem(CLAVE_TEMA);
    if (temaGuardado === "oscuro") {
        aplicarTema("oscuro");
    } else {
        aplicarTema("claro");
    }
}
function manejarClicTema() {
    if (document.body.classList.contains("tema-oscuro")) {
        aplicarTema("claro");
        localStorage.setItem(CLAVE_TEMA, "claro");
    } else {
        aplicarTema("oscuro");
        localStorage.setItem(CLAVE_TEMA, "oscuro");
    }
}
function crearRegistroHistorial(partida) {
    var elemento;
    elemento = document.createElement("li");
    elemento.className = "registro-historial";
    elemento.textContent = partida.fecha + " | " + partida.nombre + " | " + partida.dificultad + " | " + partida.resultado + " | Intentos: " + partida.intentos + " | Duración: " + formatearDuracion(partida.duracion) + " | Puntaje: " + partida.puntaje;
    return elemento;
}
function renderizarHistorial(historial) {
    var indice;
    var vacio;
    vaciarElemento(listaHistorial);
    if (historial.length === 0) {
        vacio = document.createElement("li");
        vacio.className = "registro-historial";
        vacio.textContent = "Todavía no hay partidas guardadas.";
        listaHistorial.appendChild(vacio);
        return;
    }
    for (indice = 0; indice < historial.length; indice = indice + 1) {
        listaHistorial.appendChild(crearRegistroHistorial(historial[indice]));
    }
}
function manejarClicHistorial() {
    renderizarHistorial(obtenerHistorial().slice().sort(compararPorFecha));
    mostrarElemento(modalHistorial);
}
function manejarClicOrdenarFecha() {
    renderizarHistorial(obtenerHistorial().slice().sort(compararPorFecha));
}
function manejarClicOrdenarIntentos() {
    renderizarHistorial(obtenerHistorial().slice().sort(compararPorIntentos));
}
function ocultarErroresContacto() {
    ocultarElemento(errorNombreContacto);
    ocultarElemento(errorCorreoContacto);
    ocultarElemento(errorMensajeContacto);
}
function manejarEnvioContacto(evento) {
    var nombre;
    var correo;
    var mensaje;
    var valido;
    var direccion;
    evento.preventDefault();
    nombre = entradaNombreContacto.value.trim();
    correo = entradaCorreoContacto.value.trim();
    mensaje = entradaMensajeContacto.value.trim();
    valido = true;
    ocultarErroresContacto();
    if (!EXPRESION_NOMBRE_CONTACTO.test(nombre)) {
        mostrarElemento(errorNombreContacto);
        valido = false;
    }
    if (!EXPRESION_CORREO.test(correo)) {
        mostrarElemento(errorCorreoContacto);
        valido = false;
    }
    if (mensaje.length <= 5) {
        mostrarElemento(errorMensajeContacto);
        valido = false;
    }
    if (!valido) {
        return;
    }
    direccion = "mailto:" + CORREO_CONTACTO + "?subject=" + encodeURIComponent("Contacto Futboller de " + nombre) + "&body=" + encodeURIComponent(mensaje + " (Responder a: " + correo + ")");
    window.location.href = direccion;
}