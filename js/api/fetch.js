import Anuncio_Auto from "../anuncio_auto.js";
import { divSpinner } from "../controllers/controllersCRUDFetchAsync.js";
import crearTabla, { divTabla } from "../tabla.js";

const BASE_URL = 'http://localhost:3000/anuncios';

export const traerAnunciosFetch = () => {
    try {
        divSpinner.textContent = '';
        divSpinner.appendChild(spinner());
        return fetch(BASE_URL)
            .then(res => {
                if (!res.ok) return Promise.reject(res);
                return res.json()
            })
            .then(data => {
                const parsed = [];
                data.forEach(element => {
                    const anuncio = new Anuncio_Auto(element.id,
                        element.titulo,
                        element.transaccion,
                        element.descripcion,
                        element.precio,
                        element.num_puertas,
                        element.num_KMs,
                        element.potencia);
                    parsed.push(anuncio);
                });
                divSpinner.textContent = '';
                divTabla.textContent = '';
                divTabla.appendChild(crearTabla(parsed));
                return parsed;
            })
            .catch(err => {
                console.log(err);
            })

    } catch (err) {
        throw { status: err.status, statusText: err.statusText };
    }
}
export const bajaAnuncioFetch = (id) => {

    try {
        divSpinner.appendChild(spinner());
        const options = {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=utf-8"
            }
        }
        return fetch(`${BASE_URL}/${id}`, options)
            .then(res => {
                if (!res.ok) return Promise.reject(res);
                return res.json()
            })
            .then(data => {
                traerAnunciosFetch();
                return true;
            })
            .catch(err => {
                console.log(err);
            })

    } catch (err) {
        throw { status: err.status, statusText: err.statusText };
    }
}

export const modificarAnuncioFetch = (id, objAnuncio) => {
    divSpinner.appendChild(spinner());
    try {
        const options = {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(objAnuncio)
        }
        return fetch(`${BASE_URL}/${id}`, options)
            .then(res => {
                if (!res.ok) return Promise.reject(res);
                return res.json()
            })
            .then(data => {
                traerAnunciosFetch();
                return true;
            })
            .catch(err => {
                console.log(err);
            })
    } catch (err) {
        throw { status: err.status, statusText: err.statusText };
    }
}

const spinner = () => {
    let spinnerCar = document.createElement('img');
    spinnerCar.src = './img/739.gif';
    return spinnerCar;
}