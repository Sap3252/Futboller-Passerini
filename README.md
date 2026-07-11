# Futboller

Juego web para adivinar un jugador de fútbol secreto, al estilo Wordle, desarrollado como Proyecto Final Individual de la materia **Desarrollo y Arquitecturas Web 2026 (UAI)**.

**Demo:** https://sap3252.github.io/Futboller-Passerini/

## Cómo se juega

1. Ingresá tu nombre (mínimo 3 letras) y elegí una dificultad.
2. El juego pide al servidor un jugador secreto aleatorio.
3. Escribí nombres en el buscador con autocompletado y registrá intentos.
4. Por cada intento se compara cada atributo contra el jugador secreto:
   - **Nacionalidad, Club y Posición:** verde si coincide, rojo si no.
   - **Edad, Overall y Altura:** verde si coincide; flecha ▲ o ▼ si el secreto es mayor o menor.
5. Tenés **8 intentos** para adivinar. Si los agotás, se revela el jugador secreto.

## Dificultades

- **Fácil:** se muestra la foto del jugador secreto desenfocada, que se va revelando con cada intento fallido.
- **Medio:** sin foto; se revelan cualidades (altura, edad, overall) a medida que se agotan los intentos.
- **Difícil:** sin pistas adicionales, solo el feedback de los intentos.

## Puntaje

`puntaje = puntos base (Fácil 60 / Medio 80 / Difícil 100) − (intentos usados − 1) × 10 + bonus por tiempo`

Bonus: +20 si se ganó en menos de 60 s, +10 en menos de 120 s. Mínimo 10 puntos por partida ganada. Si se pierde, el puntaje es 0.

## Características

- Autocompletado dinámico alimentado por el endpoint de la cátedra (fetch).
- Tablero de intentos generado dinámicamente con JavaScript, con foto, logo del club y bandera de país.
- Contador de intentos restantes y temporizador de partida.
- Modales en lugar de `alert` (mensajes, resultado e historial).
- Reinicio de partida sin recargar la página.
- Modo claro / oscuro persistido en LocalStorage.
- Historial de partidas en LocalStorage, ordenable por fecha o por intentos.
- Efectos de sonido en `.mp3` (inicio, acierto, error, victoria, derrota y revelación).
- Revelación del jugador secreto.
- Página de contacto con validación por JavaScript y envío vía `mailto`.
- Diseño responsivo con Flexbox.

## Endpoints utilizados

- `GET /api/players/search?q=&limit=` — búsqueda parcial de jugadores para el autocompletado.
- `GET /api/players/random` — jugador secreto aleatorio al iniciar cada partida.

Base: `https://futbolle-daw-uai-2026.onrender.com`

## Estructura del proyecto

```
Futboller-Passerini/
├── index.html          # Página principal del juego
├── contacto.html       # Página de contacto
├── css/
│   ├── reset.css       # Normalización cross browser
│   └── styles.css      # Estilos del sitio (Flexbox, temas, media queries)
├── js/
│   ├── endpoints.js    # Llamadas fetch a la API
│   ├── core.js         # Estado y lógica del juego (comparación, puntaje, historial, audio)
│   ├── events.js       # Manipulación del DOM y manejadores de eventos
│   └── init.js         # Inicialización de referencias y listeners
├── img/                # Logo, placeholder y gif de explosión
└── sonidos/            # Efectos de sonido (.mp3)
```

## Tecnologías

HTML5 · CSS3 (Flexbox) · JavaScript ES5 (`'use strict'`) · Fetch API · LocalStorage

## Ejecución local

No requiere instalación. Cloná el repositorio y abrí `index.html` en el navegador, o serví la carpeta con cualquier servidor estático.

## Autor

Santiago Passerini — UAI 2026
