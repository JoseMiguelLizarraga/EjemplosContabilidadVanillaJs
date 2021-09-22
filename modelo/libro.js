import { formatearNumero } from "../funciones/funcionesGenericas.js";



export class Libro
{
    constructor() {
        this.asientosContables = [];
    }
    
    agregarAsiento(asiento) { 
        this.asientosContables.push(asiento); 
    }

    obtenerTablaAsientosLibro()
    {
        let sumaDebe = 0;
        let sumaHaber = 0;

        let cadena = `
        <table border="1">
            <thead style="background-color: #55514d; color: #eceaea;">
                <tr>
                    <th> Fecha </th>
                    <th> Título </th>
                    <th style='width: 330px;'> Descripción General </th>
                    <th> Descripción Específica </th>
                    <th> Cuenta </th>
                    <th> Debe </th>
                    <th> Haber </th>
                </tr>
            </thead>
            <tbody>

            ${this.asientosContables.map((asiento, cont) => 
            { 
                let estilosFilaAsiento = `background-color: ${cont % 2 == 0 ? "#fff4ee" : "#ced0c6"};`;

                return `
                <tr style="${estilosFilaAsiento}">
                    <td> ${asiento.fecha} </td>
                    <td> <b> ${asiento.nombre} </b> </td>
                    <td> ${asiento.descripcion} </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                </tr>

                ${asiento.detallesDebe.map(detalleDebe => 
                {
                    sumaDebe += detalleDebe.cantidad;
                    return `
                    <tr style="${estilosFilaAsiento}">
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> ${detalleDebe.descripcionCarga} </td>
                        <td> ${detalleDebe.nombreCuenta} </td>
                        <td> ${formatearNumero(detalleDebe.cantidad)} </td>
                        <td> </td>
                    </tr>
                    `
                }).join("")}

                ${asiento.detallesHaber.map(detalleHaber => 
                {
                    sumaHaber += detalleHaber.cantidad;
                    return `
                    <tr style="${estilosFilaAsiento}">
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> ${detalleHaber.descripcionAbono} </td>
                        <td> ${detalleHaber.nombreCuenta} </td>
                        <td> </td>
                        <td> ${formatearNumero(detalleHaber.cantidad)} </td>
                    </tr>
                    `
                }).join("")}
                ` 
            }).join("")} 
            </tbody>
            <tfoot style="background-color: #c3dde6;">
                <tr>
                    <td colspan="5"> </td>
                    <td> <b> Suma Debe </b> </td>
                    <td> <b> Suma Haber </b> </td>
                </tr>
                <tr>
                    <td colspan="5"> </td>
                    <td> ${formatearNumero(sumaDebe)} </td>
                    <td> ${formatearNumero(sumaHaber)} </td>
                </tr>
            </tfoot>
        </table>
        `;

        return cadena;
    }
}