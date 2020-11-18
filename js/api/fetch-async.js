import Anuncio_Auto from "../anuncio_auto.js";
import { divSpinner } from "../controllers/controllersCRUDFetchAsync.js";
import crearTabla, { divTabla } from "../tabla.js";

const BASE_URL = 'http://localhost:3000/anuncios';

export const traerSoloAnunciosFetchAsync = async () => {
    try {
        divSpinner.textContent = '';
        divSpinner.appendChild(crearPreloader());
        con
        if (!res.ok) {
            let msgError = res.statusText || 'Se produjo un error';
            throw { status: res.status, statusText: msgError };
        }
        const data = await res.json();
        const parsed = [];
        data.forEach(element => {
            const parsed = new Anuncio_Auto(element.id,
                element.titulo,
                element.transaccion,
                element.descripcion,
                element.precio,
                element.num_puertas,
                element.num_KMs,
                element.potencia);
            parsed.push(parsed);
        });
        divSpinner.textContent = '';
        return parsed;
    } catch (err) {
        throw { status: err.status, statusText: err.statusText };
    }
}

export const traerAnuncios = async () => {
    try {
        let data = await traerSoloAnunciosFetchAsync();
        const parsed = [];
        data.forEach(element => {
            const parsed = new Anuncio_Auto(element.id,
                element.titulo,
                element.transaccion,
                element.descripcion,
                element.precio,
                element.num_puertas,
                element.num_KMs,
                element.potencia);
            parsed.push(parsed);
        });
        divTabla.textContent = '';
        divTabla.appendChild(crearTabla(parsed));

        return parsed;
    } catch (err) {
        throw { status: err.status, statusText: err.statusText };
    }
}

export const altaAnuncioFetchAsync = async (anuncio) => {
    try {
        divSpinner.appendChild(crearPreloader());
        const options = {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(anuncio)
        }
        const res = await fetch(BASE_URL, options);
        if (!res.ok) {
            let msgError = res.statusText || 'Se produjo un error';
            throw { status: res.status, statusText: msgError };
        }
        traerAnuncios();
        return true;
    } catch (err) {
        throw { status: err.status, statusText: err.statusText };
    }
}

const crearPreloader = () => {
    const spinnerCar = document.createElement('img');
    spinnerCar.width = 80;
    spinnerCar.src = './spinnercar.gif';
    spinnerCar.alt = 'Spinner para la carga de la tabla.';
    return spinnerCar;
}