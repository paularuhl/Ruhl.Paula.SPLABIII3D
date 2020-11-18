import { obtenerAnuncio_AutoForm, cleanInfo } from "../scripts.js";

import { altaAnuncioFetchAsync } from "../API/fetch-async.js";

export const $divSpinner = document.querySelector('#divSpinner');

export const eventHandlerAltaFetchAsync = async (e) => {

    e.preventDefault();
    try {

        const anuncioForm = obtenerAnuncio_AutoForm();

        if (anuncioForm) {

            if (await altaAnuncioFetchAsync(anuncioForm)) {

                alert('Alta OK');
                cleanInfo();
            }
        }
    } catch (err) {

        throw { status: err.status, statusText: err.statusText };
    }

}