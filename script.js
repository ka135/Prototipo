document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("game-container");
    const scoreDisplay = document.getElementById("score");
    const startButton = document.getElementById("start");
    const pauseButton = document.getElementById("pause");

    const sounds = {
        1: document.getElementById("sound1"),
        2: document.getElementById("sound2"),
        3: document.getElementById("sound3"),
        4: document.getElementById("sound4")
    };

    let gameInterval;
    let score = 0;
    let isRunning = false;

    function generarNota() {
        if (!isRunning) return;

        const cuerdaIndex = Math.floor(Math.random() * 4) + 1;
        const cuerda = document.getElementById(`cuerda${cuerdaIndex}`);
        const nota = document.createElement("div");
        nota.classList.add("nota");
        nota.style.top = "0px";
        cuerda.appendChild(nota);

        function moverNota() {
            if (!isRunning) return;
            let posicion = parseInt(nota.style.top);
            if (posicion >= 380) {
                nota.remove();
            } else {
                nota.style.top = `${posicion + 2}px`;
                requestAnimationFrame(moverNota);
            }
        }
        moverNota();
    }

    function iniciarJuego() {
        reiniciarJuego();
        isRunning = true;
        gameInterval = setInterval(generarNota, 1000);
    }

    function pausarJuego() {
        reiniciarJuego();
    }

    function reiniciarJuego() {
        isRunning = false;
        clearInterval(gameInterval);
        document.querySelectorAll(".nota").forEach(nota => nota.remove());
        score = 0;
        scoreDisplay.textContent = score;
    }

    startButton.addEventListener("click", iniciarJuego);
    pauseButton.addEventListener("click", pausarJuego);

    document.addEventListener("keydown", (event) => {
        if (!isRunning) return;

        const keyMap = { "a": 1, "s": 2, "d": 3, "f": 4 };
        if (keyMap[event.key]) {
            const cuerda = document.getElementById(`cuerda${keyMap[event.key]}`);
            const notas = cuerda.getElementsByClassName("nota");

            if (notas.length > 0) {
                notas[0].remove();
                score += 10;
                scoreDisplay.textContent = score;
                sounds[keyMap[event.key]].play();
            }
        }
    });
});
