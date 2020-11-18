import crearTabla from "./tabla.js";

import { traerSoloAnunciosFetchAsync, traerAnuncios } from "./API/fetch-async.js";
import { eventHandlerAltaFetchAsync } from "./controllers/controllersCRUDFetchAsync.js";

import { eventHandlerBajaFetch, eventHandlerModificarFetch } from "./controllers/controllersCRUDFetch.js";

let listaAutomoviles = [];
let proximoId;
const frmAutomovil = document.forms[0];

window.addEventListener('load', inicializarManejadores);


const btnGuardar = document.getElementById("btnGuardar");

const btnModificar = document.getElementById("btnModificar");

const btnEliminar = document.getElementById("btnEliminar");



export const titulo = document.getElementById("txtTitulo");
export const descripcion = document.getElementById("txtDescripcion");
export const precio = document.getElementById("txtPrecio");
export const puertas = document.getElementById("txtPuertas");
export const KM = document.getElementById("txtKMs");
export const potencia = document.getElementById("txtPotencia");
export const radioTransaccion = frmAutomovil.transaction;
export const selectedId = document.getElementById("txtID");
export const divTabla = document.getElementById('divTabla');
export const divSpinner = document.getElementById('divSpinner');
export const promedio = document.getElementById('txtPromedio');

export const btnFiltroTodos = document.getElementById('slcFiltroTodos');
export const btnFiltroAlquiler = document.getElementById('slcFiltroAlquiler');
export const btnFfiltroVenta = document.getElementById('slcFiltroVenta');


window.addEventListener('load', initHandlers);

async function initHandlers() {

    try {

        lista = await traerAnuncios();

        btnGuardar.addEventListener('click', async (e) => {

            try { await eventHandlerAltaFetchAsync(e); }
            catch (error) { alert(error); limpiarControles(); }

        });

        $botonEliminar.addEventListener('click', async (e) => {

            try { await eventHandlerBajaFetch(e); }
            catch (error) { alert(error); limpiarControles(); }

        });


        btnModificar.addEventListener('click', async (e) => {

            try { await eventHandlerModificarFetch(e); }
            catch (error) { alert(error); limpiarControles(); }

        });
        btnfiltroTodos.addEventListener('click', async (e) => { e.preventDefault(); filtroTodos(await traerSoloAnunciosFetchAsync()); })

        btnfiltroAlquiler.addEventListener('click', async (e) => { e.preventDefault(); filtroAlquiler(await traerSoloAnunciosFetchAsync()); })

        btnfiltroVenta.addEventListener('click', async (e) => { e.preventDefault(); filtroVenta(await traerSoloAnunciosFetchAsync()); })


    } catch (err) {

        err.status && err.statusText
            ? console.error(`Estado de la petición: ${err.status} - ${err.statusText}`)
            : console.error('Error!');
    }

};


export const cleanInfo = function () {

    document.getElementById("txtTitulo").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("txtPrecio").value = "";
    document.getElementById("txtPuertas").value = "";
    document.getElementById("txtKMs").value = "";
    document.getElementById("txtPotencia").value = "";
    document.getElementById("txtID").value = "";

    btnGuardar.disabled = false;
    btnModificar.disabled = true;
    btnEliminar.disabled = true;

}
function filtroTodos(lista) {

    const precios = lista.map(x => x.precio);
    const resultado = precios.reduce((acc, el) => acc + el, 0) / precios.length;

    promedio.value = resultado;

}

function filtroAlquiler(lista) {

    const soloAlquiler = lista.filter(x => x.transaccion === 'Alquiler').map(x => x.precio);
    const resultado = precios.reduce((acc, el) => acc + el, 0) / precios.length;

    promedio.value = resultado;

}

function filtroVenta(lista) {

    const soloVenta = lista.filter(x => x.transaccion === 'Venta').map(x => x.precio);
    const resultado = precios.reduce((acc, el) => acc + el, 0) / precios.length;

    promedio.value = resultado;
}

async function mapearTabla(element, lista) {

    element.addEventListener('click', async () => {

        lista = await traerSoloAnunciosFetchAsync();

        let listaMapeada = lista.map(row => {

            let fila = {};
            for (const key in row) {

                if (document.getElementById('filterTransaction' + key).checked) {
                    fila[key] = row[key];
                }

            }
            return fila;
        })

        console.log(listaMapeada);
        $divTabla.textContent = '';
        $divTabla.appendChild(crearTabla(listaMapeada));

    });

};