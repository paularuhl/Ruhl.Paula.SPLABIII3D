import Anuncio from "./anuncio.js";

export default class Anuncio_Auto extends Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio, num_puertas, num_KMs, potencia){
        super(id, titulo, transaccion, descripcion, precio);
        this.num_KMs = num_KMs;
        this.num_puertas = num_puertas;
        this.potencia = potencia;

    }
}

