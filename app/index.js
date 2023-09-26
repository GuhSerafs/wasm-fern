import init, { Canvas, render_barnsley_fern } from "./wasm_fern.js";

async function run() {
    await init();

    const canvasElement = document.getElementById("myCanvas");
    const canvasWidthInput = document.getElementById("canvasWidth");
    const canvasHeightInput = document.getElementById("canvasHeight");
    const iterationsInput = document.getElementById("iterations");
    
    const ctx = canvasElement.getContext("2d");

    // Função para atualizar o canvas com base nas entradas do usuário
    function updateCanvas() {
        const canvasWidth = parseInt(canvasWidthInput.value);
        const canvasHeight = parseInt(canvasHeightInput.value);
        const iterations = parseInt(iterationsInput.value);

        canvasElement.width = canvasWidth;
        canvasElement.height = canvasHeight;

        const canvas = Canvas.new(canvasWidth, canvasHeight);
        render_barnsley_fern(canvas, iterations);

        const imageData = canvas.render();
        const imgData = new ImageData(new Uint8ClampedArray(imageData), canvasWidth, canvasHeight);
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
