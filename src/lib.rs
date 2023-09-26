use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Canvas {
    pub width: usize,
    pub height: usize,
    pixels: Vec<u8>, // Usar Vec<u8> para armazenar cores
}

#[wasm_bindgen]
impl Canvas {
    pub fn new(width: usize, height: usize) -> Canvas {
        // Inicialize a estrutura com um Vec<u8> vazio
        let pixels = vec![0; width * height * 4]; // Inicialize com zeros, assumindo RGBA de 4 bytes por pixel
        Canvas {
            width,
            height,
            pixels,
        }
    }

    fn set_pixel(&mut self, x: usize, y: usize, rgba: Vec<u8>) {
        // Verifique se as coordenadas estão dentro dos limites do canvas
        if x < self.width && y < self.height {
            // Calcule o índice correspondente no Vec<u8>
            let index = (y * self.width + x) * 4; // RGBA de 4 bytes por pixel

            // Copie os valores de RGBA para o Vec<u8>
            self.pixels[index] = rgba[0];
            self.pixels[index + 1] = rgba[1];
            self.pixels[index + 2] = rgba[2];
            self.pixels[index + 3] = rgba[3];
        }
    }

    pub fn render(&self) -> Vec<u8> {
        // Simplesmente retorne o Vec<u8> com os dados de cores do canvas
        self.pixels.clone()
    }
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = Math)]
    fn random() -> f64;
}

#[wasm_bindgen]
pub fn render_barnsley_fern(canvas: &mut Canvas, it: usize) {
    // Parâmetros para as transformações do fractal
    let mut xn = 0.0;
    let mut yn = 0.0;
    let fit_x = canvas.width as f64 / 5.0;
    let fit_y = canvas.height as f64 / 10.0;

    for _ in 0..it {
        let r = random(); // Gere um número aleatório usando a função externa de JavaScript
        let (x, y) = (xn, yn);
        if r < 0.01 {
            xn = 0.0;
            yn = 0.16 * y;
        } else if r < 0.86 {
            xn = 0.85 * x + 0.04 * y;
            yn = -0.04 * x + 0.85 * y + 1.6;
        } else if r < 0.93 {
            xn = 0.2 * x - 0.26 * y;
            yn = 0.23 * x + 0.22 * y + 1.6;
        } else {
            xn = -0.15 * x + 0.28 * y;
            yn = 0.26 * x + 0.24 * y + 0.44;
        }

        // Mapeie as coordenadas (x, y) para as coordenadas do canvas e defina a cor do pixel
        let canvas_x = ((x + 2.5) * fit_x) as usize;
        let canvas_y = canvas.height - (y * fit_y) as usize;
        canvas.set_pixel(canvas_x, canvas_y, [0, 128, 0, 255].to_vec());
    }
}

