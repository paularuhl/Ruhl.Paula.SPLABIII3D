import {
    cleanInfo, titulo,
    descripcion,
    precio,
    puertas,
    KM,
    potencia,
    radioTransaccion,
    selectedId
} from "../scripts.js";
import { bajaAnuncioFetch, modificarAnuncioFetch } from "../API/fetch.js";
import { traerSoloAnunciosFetchAsync } from "../API/fetch-async.js";

export const eventHandlerBajaFetch = async (e) => {
    e.preventDefault();
    try {

        const idSelected = selectedId.value;
        if (await bajaAnuncioFetch(idAnuncioSeleccionado)) {
            alert('Baja exitosa!');
            cleanInfo();

        }

    } catch (error) {

        throw { status: err.status, statusText: err.statusText };
    }
}
export const eventHandlerModificarFetch = async (e) => {
    e.preventDefault();
    try {
        let lista = await traerSoloAnunciosFetchAsync();
        const idSelected = selectedId.value;
        const filtrado = lista.filter(x => x.id === idSelected);
        filtrado[0].titulo = titulo.value;
        filtrado[0].transaccion = radioTransaccion.value;
        filtrado[0].descripcion = descripcion.value;
        filtrado[0].precio = precio.value;
        filtrado[0].num_puertas = puertas.value;
        filtrado[0].num_KMs = KM.value;
        filtrado[0].potencia = potencia.value;

        if (await modificarAnuncioFetch(idSelected, filtrado[0])) {
            alert('Modificacion OK');
            cleanInfo();

        }
    } catch (error) {

        alert(error);
        cleanInfo();
    }
}