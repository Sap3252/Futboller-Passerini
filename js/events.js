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
