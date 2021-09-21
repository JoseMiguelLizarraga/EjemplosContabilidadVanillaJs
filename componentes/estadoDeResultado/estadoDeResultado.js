import { formatearNumero } from '../../funciones/funcionesGenericas.js';
import { EstadoDeResultado } from '../../modelo/estadoDeResultado.js';
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
        let e = new EstadoDeResultado("Cobijas el Tigre de Bengala", "31-12-2018");

        
        // Vamos a suponer que vendimos $100.000
        e.calcularVentasNetas(
            100000,   // 100% con respecto al total de las ventas
            5000      // Vamos a suponer que tenemos rebajas por $5.000     5% con respecto al total de las ventas
        );
        // Ventas netas = totalVendido - descuento             Seria $95.000           Corresponde al 95 %

        //=================================>>>>>
            
        e.calcularCostoVentas(
            50000,   // Mano de obra, es decir, el dinero que le pagamos a nuestros trabajadores por hacer esas cobijas.    50%
            20000    // Dinero usado para fabricar esas cobijas, hilo, tela, etc.     20%
        );
        // Costo de ventas = mano de obra + materia prima         Es el 70% de nuestras ventas

        //=================================>>>>>
            
        // 95.000 - 70.000 = 25.000 de utilidad bruta
        e.calcularUtilidadBruta();
        // Utilidad bruta = ventas netas - costo ventas;    // Esto es el 25% del total de nuestras ventas

        //=================================>>>>>
           
        e.calcularTotalGastos(
            15000,  // Sueldos y salarios de personas que administran el negocio   15% 
            2000    // Gastos de publicidad   2%
        );

        //=================================>>>>>
            
        // Impuestos
        // Esto es $2.400    2.4% de nuestras ventas. En Mexico este impuesto es del 30%   Por lo tanto, el 30% de $8.000 = $2.400
        e.calcularImpuestos(30);

        //=================================>>>>>
             
        // Utilidad Neta o Resultado del ejercicio
        e.calcularUtilidadNeta();

        //e.UtilidadNeta = e.RubroImpuestos.UtilidadAntesDeImpuestos - e.RubroImpuestos.ImpuestosUtilidad;

        // string texto = $"{e.Imprimir()} <br/><br/>";
        // texto += $"{ImagenesHelper.ObtenerImagenHtmlBase64("EstadoDeResultados/Ejemplo1.png")} <br/>";
        
        //============================================================================================>>>>>>

        let textoHtml =  `
        <br/><br/> 

        ${e.nombre} <br/>
        ESTADO DE RESULTADOS AL ${e.fechaHasta} <br/><br/>

        Ventas ${formatearNumero(e.rubroVentas.ventas)} <br/>
        Descuento sobre ventas ${formatearNumero(e.rubroVentas.descuentoSobreVentas)} <br/>
        Ventas netas ${formatearNumero(e.rubroVentas.ventasNetas)} <br/><br/>
        
        Mano de obra ${formatearNumero(e.rubroCostoVentas.manoDeObra)} <br/>
        Materia prima ${formatearNumero(e.rubroCostoVentas.materiaPrima)} <br/>
        Costo de ventas ${formatearNumero(e.rubroCostoVentas.costoVentas)} <br/>
        Utilidad bruta ${formatearNumero(e.utilidadBruta)} <br/>
        Gastos administrativos ${formatearNumero(e.rubroGastos.gastosAdministrativos)} <br/>
        Gastos de venta ${formatearNumero(e.rubroGastos.gastosVenta)} <br/>
        Total de gastos ${formatearNumero(e.rubroGastos.totalGastos)} <br/>
        Utilidad antes de impuestos ${formatearNumero(e.rubroImpuestos.utilidadAntesDeImpuestos)} <br/>
        Impuestos a la utilidad ${formatearNumero(e.rubroImpuestos.impuestosUtilidad)} <br/>
        Utilidad neta o resultado del ejercicio ${formatearNumero(e.utilidadNeta)}
        `;

        this.cargarHtml({ textoHtml });  
    }
};

