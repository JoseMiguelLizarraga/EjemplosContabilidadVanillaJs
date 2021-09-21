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

        let rubroVentas = { ventas: 0, descuentoSobreVentas: 0, ventasNetas: 0 };
        let rubroCostoVentas = { manoDeObra: 0, materiaPrima: 0, costoVentas: 0 };
        let rubroGastos = { gastosAdministrativos: 0, gastosVenta: 0, totalGastos: 0 };
        let rubroImpuestos = { utilidadAntesDeImpuestos: 0, impuestosUtilidad: 0 };

        // Resultado: Esto es lo que finalimente nos va a decir si estamos perdiendo o ganando
        let utilidadBruta = 0;
        let utilidadNeta = 0;  // Tambien se le conoce como resultado del ejercicio


        // Primer paso (Calcular ventas netas)
        // Vamos a suponer que vendimos $100.000
        rubroVentas.ventas = 100000;   // 100% con respecto al total de las ventas
        rubroVentas.descuentoSobreVentas = 5000;  // Vamos a suponer que tenemos rebajas por $5.000     5% con respecto al total de las ventas
        rubroVentas.ventasNetas = 100000 - 5000;  // Seria $95.000           Corresponde al 95 %
    
    
        // Segundo paso (Calcular costo de ventas)
        rubroCostoVentas.manoDeObra = 50000;  // Mano de obra, es decir, el dinero que le pagamos a nuestros trabajadores por hacer esas cobijas.    50%
        rubroCostoVentas.materiaPrima = 20000;  // Dinero usado para fabricar esas cobijas, hilo, tela, etc.     20%
        rubroCostoVentas.costoVentas = 50000 + 20000;  // Costo de ventas = mano de obra + materia prima.       Es el 70% de nuestras ventas
    

        // Tercer paso (Calcular Utilidad Bruta)
        // 95.000 - 70.000 = 25.000 de utilidad bruta
        utilidadBruta = rubroVentas.ventasNetas - rubroCostoVentas.costoVentas;  // Esto es el 25% del total de nuestras ventas
        

        // Cuarto paso (Calcular Total Gastos)
        rubroGastos.gastosAdministrativos = 15000;   // 15%   Sueldos y salarios de personas que administran el negocio
        rubroGastos.gastosVenta = 2000;    // Gastos de publicidad   2%
        rubroGastos.totalGastos = rubroGastos.gastosAdministrativos + rubroGastos.gastosVenta;  // 17%      Esto es:  15000 + 2000


        // Quinto paso (Calcular Impuestos)
        let porcentajeImpuestoUtilidad = 30;
        rubroImpuestos.utilidadAntesDeImpuestos = utilidadBruta - rubroGastos.totalGastos;  // $8.000      8% del total de nuestras ventas
        rubroImpuestos.impuestosUtilidad = (rubroImpuestos.utilidadAntesDeImpuestos * porcentajeImpuestoUtilidad) / 100;   // Esto es $2.400    2.4% de nuestras ventas. En Mexico este impuesto es del 30%   Por lo tanto, el 30% de $8.000 = $2.400
    

        // Sexto paso (Calcular Utilidad Neta o Resultado del ejercicio)
        utilidadNeta = rubroImpuestos.utilidadAntesDeImpuestos - rubroImpuestos.impuestosUtilidad;

        let textoHtml =  `
        <br/><br/> 

        ${nombre} <br/>
        ESTADO DE RESULTADOS AL ${fechaHasta} <br/><br/>

        Ventas ${formatearNumero(rubroVentas.ventas)} <br/>
        Descuento sobre ventas ${formatearNumero(rubroVentas.descuentoSobreVentas)} <br/>
        Ventas netas ${formatearNumero(rubroVentas.ventasNetas)} <br/><br/>
        
        Mano de obra ${formatearNumero(rubroCostoVentas.manoDeObra)} <br/>
        Materia prima ${formatearNumero(rubroCostoVentas.materiaPrima)} <br/>
        Costo de ventas ${formatearNumero(rubroCostoVentas.costoVentas)} <br/>
        Utilidad bruta ${formatearNumero(utilidadBruta)} <br/>
        Gastos administrativos ${formatearNumero(rubroGastos.gastosAdministrativos)} <br/>
        Gastos de venta ${formatearNumero(rubroGastos.gastosVenta)} <br/>
        Total de gastos ${formatearNumero(rubroGastos.totalGastos)} <br/>
        Utilidad antes de impuestos ${formatearNumero(rubroImpuestos.utilidadAntesDeImpuestos)} <br/>
        Impuestos a la utilidad ${formatearNumero(rubroImpuestos.impuestosUtilidad)} <br/>
        Utilidad neta o resultado del ejercicio ${formatearNumero(utilidadNeta)}
        `;

        this.cargarHtml({ textoHtml });  
    }
};

