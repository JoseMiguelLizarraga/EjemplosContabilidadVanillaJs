import { formatearNumero } from '../../funciones/funcionesGenericas.js';
import { CargaVista } from '../cargaVista.js';


export class EstadoDeResultadoComponent extends CargaVista
{
    constructor()
    {
        super();

        for (var prop in this) { window[prop] = this[prop]; }                                     // Coloca los atributos de la clase para que esten disponibles desde el html
        Object.getOwnPropertyNames(this.constructor.prototype).forEach(c=> window[c] = this[c]);  // Coloca los metodos de la clase para que esten disponibles desde el html
        
        this.cargarVista();
    }

    destructor() {
        for (var prop in this) { delete window[prop]; }                                        // Remueve los atributos de la clase para que no queden en la ventana
        Object.getOwnPropertyNames(this.constructor.prototype).forEach(c=> delete window[c]);  // Remueve los metodos de la clase para que no queden en la ventana
    }

    cargarVista()
    {  
        let nombre = "Cobijas el Tigre de Bengala";
        let fechaHasta = "31-12-2018";
        let detalleVacio = {cantidad: 0, porcentaje: "", descripcion: ""};

        let rubroVentas = { 
            ventas: detalleVacio, descuentoSobreVentas: detalleVacio, ventasNetas: detalleVacio 
        };

        let rubroCostoVentas = { 
            manoDeObra: detalleVacio, materiaPrima: detalleVacio, costoVentas: detalleVacio 
        };

        let rubroGastos = { 
            gastosAdministrativos: detalleVacio, gastosVenta: detalleVacio, totalGastos: detalleVacio 
        };

        let rubroImpuestos = { 
            utilidadAntesDeImpuestos: detalleVacio, impuestosUtilidad: detalleVacio
        };

        // Esto es el Resultado, y es lo que finalimente nos va a decir si estamos perdiendo o ganando
        let utilidadBruta = detalleVacio;
        let utilidadNeta = detalleVacio;  // Tambien se le conoce como resultado del ejercicio


        // 1- Calcular ventas netas
        
        rubroVentas.ventas = {cantidad: 100000, porcentaje: "100% con respecto al total de las ventas", descripcion: "Vamos a suponer que vendimos $100.000"};  
        
        rubroVentas.descuentoSobreVentas = {cantidad: 5000, porcentaje: "5% con respecto al total de las ventas", descripcion: "Vamos a suponer que tenemos rebajas por $5.000"};

        rubroVentas.ventasNetas = {
            cantidad: 100000 - 5000,  // Seria $95.000
            porcentaje: "95%",
            descripcion: "Esto es Ventas (100.000) - Descuento sobre ventas (5.000)"
        } 
    
        // Segundo paso (Calcular costo de ventas)

        rubroCostoVentas.manoDeObra = {
            cantidad: 50000, 
            porcentaje: "50%", 
            descripcion: "Mano de obra, es decir, el dinero que le pagamos a nuestros trabajadores por hacer esas cobijas"
        };

        rubroCostoVentas.materiaPrima = {
            cantidad: 20000,
            porcentaje: "20%",
            descripcion: "Dinero usado para fabricar esas cobijas, hilo, tela, etc"
        };

        rubroCostoVentas.costoVentas = {
            cantidad: 50000 + 20000,
            porcentaje: "70% de nuestras ventas",
            descripcion: "Esto es:  mano de obra + materia prima"
        };

        // Tercer paso (Calcular Utilidad Bruta)
        
        utilidadBruta = {
            cantidad: rubroVentas.ventasNetas.cantidad - rubroCostoVentas.costoVentas.cantidad,  // 95.000 - 70.000 = 25.000 de utilidad bruta
            porcentaje: "25% del total de nuestras ventas",
            descripcion: "Ventas netas (95.000) - Costo de Ventas (70.000) = Utilidad Bruta (25.000)"
        };
        
        // Cuarto paso (Calcular Total Gastos)

        rubroGastos.gastosAdministrativos = {
            cantidad: 15000,
            porcentaje: "15%",
            descripcion: "Sueldos y salarios de personas que administran el negocio"
        };

        rubroGastos.gastosVenta = {
            cantidad: 2000, porcentaje: "2%", descripcion: "Gastos de publicidad"
        };

        rubroGastos.totalGastos = {
            cantidad: 15000 + 2000,
            porcentaje: "17%",
            descripcion: "Esto es:  Gastos Administrativos (15000) + Gastos Venta (2000)"
        };

        // Quinto paso (Calcular Impuestos)
        let porcentajeImpuestoUtilidad = 30;

        rubroImpuestos.utilidadAntesDeImpuestos = {
            cantidad: utilidadBruta.cantidad - rubroGastos.totalGastos.cantidad,  // $8.000
            porcentaje: "8% del total de nuestras ventas",
            descripcion: "Utilidad antes de impuestos es: Utilidad Bruta - Total Gastos (Del rubro Gastos)"
        };

        rubroImpuestos.impuestosUtilidad = {
            cantidad: (rubroImpuestos.utilidadAntesDeImpuestos.cantidad * porcentajeImpuestoUtilidad) / 100,  // Esto es $2.400
            porcentaje: "2.4% de nuestras ventas",
            descripcion: "En Mexico este impuesto es del 30% por lo tanto, el 30% de $8.000 = $2.400"
        };

        // Sexto paso (Calcular Utilidad Neta o Resultado del ejercicio)
        utilidadNeta = {
            cantidad: rubroImpuestos.utilidadAntesDeImpuestos.cantidad - rubroImpuestos.impuestosUtilidad.cantidad,
            porcentaje: "6%",
            descripcion: "Utilidad antes de Impuestos - Impuestos Utilidad = Utilidad Neta"
        };
      
        let textoHtml =  `
        <h4>
            ${nombre} <br/>
            ESTADO DE RESULTADOS AL ${fechaHasta} 
        </h4> 
        
        <br/><br/>

        <table border="1" class="table table-striped">
            <thead style="background-color: #55514d; color: #eceaea;">
                <tr>
                    <th></th>
                    <th></th>
                    <th> Importe </th>
                    <th> Porcentaje </th>
                    <th> Descripción </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td> Ventas </td>
                    <td> ${formatearNumero(rubroVentas.ventas.cantidad)} </td>
                    <td> ${rubroVentas.ventas.porcentaje} </td>
                    <td> ${rubroVentas.ventas.descripcion} </td>
                </tr>
                <tr>
                    <td> (Menos) </td>
                    <td> Descuento sobre Ventas </td>
                    <td> ${formatearNumero(rubroVentas.descuentoSobreVentas.cantidad)} </td>
                    <td> ${rubroVentas.descuentoSobreVentas.porcentaje} </td>
                    <td> ${rubroVentas.descuentoSobreVentas.descripcion} </td>
                </tr>
                <tr>
                    <td> Igual </td>
                    <td> Ventas netas </td>
                    <td> ${formatearNumero(rubroVentas.ventasNetas.cantidad)} </td>
                    <td> ${rubroVentas.ventasNetas.porcentaje} </td>
                    <td> ${rubroVentas.ventasNetas.descripcion} </td>
                </tr>
                <tr>
                    <td> (Más) </td>
                    <td> Mano de obra </td>
                    <td> ${formatearNumero(rubroCostoVentas.manoDeObra.cantidad)} </td>
                    <td> ${rubroCostoVentas.manoDeObra.porcentaje} </td>
                    <td> ${rubroCostoVentas.manoDeObra.descripcion} </td>
                </tr>
                <tr>
                    <td> (Más) </td>
                    <td> Materia prima </td>
                    <td> ${formatearNumero(rubroCostoVentas.materiaPrima.cantidad)} </td>
                    <td> ${rubroCostoVentas.materiaPrima.porcentaje} </td>
                    <td> ${rubroCostoVentas.materiaPrima.descripcion} </td>
                </tr>
                <tr>
                    <td> Igual </td>
                    <td> Costo de ventas </td>
                    <td> ${formatearNumero(rubroCostoVentas.costoVentas.cantidad)} </td>
                    <td> ${rubroCostoVentas.costoVentas.porcentaje} </td>
                    <td> ${rubroCostoVentas.costoVentas.descripcion} </td>
                </tr>
                <tr>
                    <td> Igual </td>
                    <td> Utilidad bruta </td>
                    <td> ${formatearNumero(utilidadBruta.cantidad)} </td>
                    <td> ${utilidadBruta.porcentaje} </td>
                    <td> ${utilidadBruta.descripcion} </td>
                </tr>
                <tr>
                    <td> (Más) </td>
                    <td> Gastos administrativos </td>
                    <td> ${formatearNumero(rubroGastos.gastosAdministrativos.cantidad)} </td>
                    <td> ${rubroGastos.gastosAdministrativos.porcentaje} </td>
                    <td> ${rubroGastos.gastosAdministrativos.descripcion} </td>
                </tr>
                <tr>
                    <td> (Más) </td>
                    <td> Gastos de venta </td>
                    <td> ${formatearNumero(rubroGastos.gastosVenta.cantidad)} </td>
                    <td> ${rubroGastos.gastosVenta.porcentaje} </td>
                    <td> ${rubroGastos.gastosVenta.descripcion} </td>
                </tr>
                <tr>
                    <td> Igual </td>
                    <td> Total de gastos </td>
                    <td> ${formatearNumero(rubroGastos.totalGastos.cantidad)} </td>
                    <td> ${rubroGastos.totalGastos.porcentaje} </td>
                    <td> ${rubroGastos.totalGastos.descripcion} </td>
                </tr>
                <tr>
                    <td> Igual </td>
                    <td> Utilidad antes de impuestos </td>
                    <td> ${formatearNumero(rubroImpuestos.utilidadAntesDeImpuestos.cantidad)} </td>
                    <td> ${rubroImpuestos.utilidadAntesDeImpuestos.porcentaje} </td>
                    <td> ${rubroImpuestos.utilidadAntesDeImpuestos.descripcion} </td>
                </tr>
                <tr>
                    <td></td>
                    <td> Impuestos a la utilidad </td>
                    <td> ${formatearNumero(rubroImpuestos.impuestosUtilidad.cantidad)} </td>
                    <td> ${rubroImpuestos.impuestosUtilidad.porcentaje} </td>
                    <td> ${rubroImpuestos.impuestosUtilidad.descripcion} </td>
                </tr>
                <tr>
                    <td> Igual </td>
                    <td> Utilidad neta o resultado del ejercicio </td>
                    <td> ${formatearNumero(utilidadNeta.cantidad)} </td>
                    <td> ${utilidadNeta.porcentaje} </td>
                    <td> ${utilidadNeta.descripcion} </td>
                </tr>
            </tbody>
        </table>

        <br/><br/> 
        `;

        /*
        Ventas ${formatearNumero(rubroVentas.ventas.cantidad)} <br/>
        Descuento sobre ventas ${formatearNumero(rubroVentas.descuentoSobreVentas.cantidad)} <br/>
        Ventas netas ${formatearNumero(rubroVentas.ventasNetas.cantidad)} <br/><br/>
        
        Mano de obra ${formatearNumero(rubroCostoVentas.manoDeObra.cantidad)} <br/>
        Materia prima ${formatearNumero(rubroCostoVentas.materiaPrima.cantidad)} <br/>
        Costo de ventas ${formatearNumero(rubroCostoVentas.costoVentas.cantidad)} <br/>
        Utilidad bruta ${formatearNumero(utilidadBruta.cantidad)} <br/>
        Gastos administrativos ${formatearNumero(rubroGastos.gastosAdministrativos.cantidad)} <br/>
        Gastos de venta ${formatearNumero(rubroGastos.gastosVenta.cantidad)} <br/>
        Total de gastos ${formatearNumero(rubroGastos.totalGastos.cantidad)} <br/>
        Utilidad antes de impuestos ${formatearNumero(rubroImpuestos.utilidadAntesDeImpuestos.cantidad)} <br/>
        Impuestos a la utilidad ${formatearNumero(rubroImpuestos.impuestosUtilidad.cantidad)} <br/>
        Utilidad neta o resultado del ejercicio ${formatearNumero(utilidadNeta.cantidad)}
        */

        this.cargarHtml({ textoHtml });  
    }
};

