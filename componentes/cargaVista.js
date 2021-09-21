

import { configuracionesProyecto } from '../configuraciones/configuracionesProyecto.js';
import {mostrarLoadingSpinner, ocultarLoadingSpinner} from '../funciones/funcionesGenericas.js';


export class CargaVista
{
    constructor()
    {
        this.validarSesionUsuario();
    }

    validarSesionUsuario()
    {
        // if (localStorage.getItem("mi_token") == null) 
        // {
        //     throw new Error("No ha iniciado sesión");
        // }
    }

    revisarCargaImagenes()
    {
        if (Array.from(document.getElementsByTagName("img")).length > 0)  // Si el documento tiene imagenes
        {
            Promise.all(Array.from(document.images).map(img => 
            {
                if (img.complete) return Promise.resolve(img.naturalHeight !== 0);

                return new Promise(resolve => {
                    img.addEventListener("load", () => resolve(true));
                    img.addEventListener("error", () => resolve(false));
                });
            }))
            .then(results => {
                if (results.every(res => res)) {
                    //console.log("all images loaded successfully");
                    ocultarLoadingSpinner();
                }
                else {
                    //console.log("some images failed to load, all finished loading");
                }
            });
        }
        else 
        {
            ocultarLoadingSpinner();
        }
    }

    cargarHtml(json = {})
    {
        let etiquetaContenido = document.getElementsByTagName("contenido-app")[0];

        mostrarLoadingSpinner();

        if (json.rutaArchivo != null) 
        {
            fetch(`${configuracionesProyecto.rutaComponentes}${json.rutaArchivo}`)
            .then(response => 
            {
                if (! response.ok) {
                    throw new Error(`Error ${response.status} al incluir el archivo ubicado en ${configuracionesProyecto.rutaComponentes}${json.rutaArchivo}`);
                }
                return response.text();
            })
            .then(contenido => 
            {
                etiquetaContenido.innerHTML = contenido;

                this.revisarCargaImagenes();

                if (json.onload != null && typeof json.onload == "function") {  json.onload();  }  // Si desea ejecutar alguna funcion despues de cargar el contenido
            })
            .finally(c=> {
                //ocultarLoadingSpinner();
            });
        }
        if (json.textoHtml != null) 
        {
            mostrarLoadingSpinner();
            etiquetaContenido.innerHTML = json.textoHtml;

            if (json.onload != null && typeof json.onload == "function") {  json.onload();  }  // Si desea ejecutar alguna funcion despues de cargar el contenido
            
            this.revisarCargaImagenes();
            //ocultarLoadingSpinner();
        }

    }
    
}