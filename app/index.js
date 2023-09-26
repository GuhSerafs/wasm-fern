import init, { Canvas, render_barnsley_fern } from "./wasm_fern.js";

async function run() {
    await init();

    const canvasElement = document.getElementById("my-canvas");
    const canvasWidthInput = document.getElementById("canvasWidth");
    const canvasHeightInput = document.getElementById("canvasHeight");
    const iterationsInput = document.getElementById("iterations");

    // Setup do Tamanho do Canvas Dependendo do Tipo de Tela
    if (window.innerWidth > window.innerHeight) {
        // Telas Horizontais
        canvasWidthInput.value = 25;
        canvasHeightInput.value = 75;
    } else {
        // Telas Verticais
        canvasWidthInput.value = 75;
        canvasHeightInput.value = 80;
    }
    
    const ctx = canvasElement.getContext("2d");

    // Função para atualizar o canvas com base nas entradas do usuário
    function updateCanvas() {
        const canvasWidth = parseInt(canvasWidthInput.value);
        const canvasHeight = parseInt(canvasHeightInput.value);
        const iterations = parseInt(iterationsInput.value);
        
        canvasElement.width = canvasWidth * window.innerWidth / 100;
        canvasElement.height = canvasHeight * window.innerHeight / 100;

        const canvas = Canvas.new(canvasElement.width, canvasElement.height);
        render_barnsley_fern(canvas, iterations);

        const imageData = canvas.render();
        const imgData = new ImageData(new Uint8ClampedArray(imageData), canvasElement.width, canvasElement.height);
        ctx.putImageData(imgData, 0, 0);
    }

    // Adicione ouvintes de eventos para capturar alterações nos controles de entrada
    canvasWidthInput.addEventListener("input", updateCanvas);
    canvasHeightInput.addEventListener("input", updateCanvas);
    iterationsInput.addEventListener("input", updateCanvas);

    // Inicialize o canvas com os valores padrão
    updateCanvas();
}

run();
