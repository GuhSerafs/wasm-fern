/* tslint:disable */
/* eslint-disable */
/**
* @param {Canvas} canvas
* @param {number} it
*/
export function render_barnsley_fern(canvas: Canvas, it: number): void;
/**
*/
export class Canvas {
  free(): void;
/**
* @param {number} width
* @param {number} height
* @returns {Canvas}
*/
  static new(width: number, height: number): Canvas;
/**
* @returns {Uint8Array}
*/
  render(): Uint8Array;
/**
*/
  height: number;
/**
*/
  width: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_canvas_free: (a: number) => void;
  readonly __wbg_get_canvas_width: (a: number) => number;
  readonly __wbg_set_canvas_width: (a: number, b: number) => void;
  readonly __wbg_get_canvas_height: (a: number) => number;
  readonly __wbg_set_canvas_height: (a: number, b: number) => void;
  readonly canvas_new: (a: number, b: number) => number;
  readonly canvas_render: (a: number, b: number) => void;
  readonly render_barnsley_fern: (a: number, b: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
