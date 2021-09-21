
class RubroVentas
{
    constructor()
    {
        this.ventas = 0;
        this.descuentoSobreVentas = 0;
        this.ventasNetas = 0;
    }
}

class RubroCostoVentas
{
    constructor()
    {
        this.manoDeObra = 0; 
        this.materiaPrima = 0;
        this.costoVentas = 0;
    }
}

class RubroGastos
{
    /*
    Dentro del rubro Gastos encontramos tres rubros principales y son:
        - Aministrativos: Aca hay sueldos y salarios(No es lo mismo que la mano de obra)
        - De venta: Ej, publicidad, marketing, etc
        - Financieros: Ej, intereses que podriamos estar pagando a una institucion financiera. Ej, porque nos presto dinero
    */

    constructor()
    {
        this.gastosAdministrativos = 0;
        this.gastosVenta = 0;  // Gastos de publicidad, marketing
        this.totalGastos = 0;
    }
}

class RubroImpuestos
{
    constructor()
    {
        this.utilidadAntesDeImpuestos = 0;
        this.impuestosUtilidad = 0;
    }
}

export class EstadoDeResultado   // Tambien se le conoce como Estado de Perdidas y Ganancias. Se utiliza para saber cuanto hemos ganado en un negocio
{
    constructor(nombre, fechaHasta)
    {
        this.nombre = nombre;
        this.fechaHasta = fechaHasta;

        this.rubroVentas = new RubroVentas();
        this.rubroCostoVentas = new RubroCostoVentas();
        this.rubroGastos = new RubroGastos();
        this.rubroImpuestos = new RubroImpuestos();

        //====================================================>>>>>>
        // Resultado: Es lo que finalimente nos va a decir si estamos perdiendo o ganando

        this.utilidadBruta = 0;
        this.utilidadNeta = 0;  // Tambien se le conoce como resultado del ejercicio

        //====================================================>>>>>>
    }

    // Primer paso
    calcularVentasNetas(totalVendido, descuento)   // CalcularVentasNetas(100000, 5000)
    {
        this.rubroVentas.ventas = totalVendido;   // 100% con respecto al total de las ventas
        this.rubroVentas.descuentoSobreVentas = descuento;  // Vamos a suponer que tenemos rebajas por $5.000     5% con respecto al total de las ventas
        this.rubroVentas.ventasNetas = totalVendido - descuento;  // Seria $95.000           95 %
    }

    // Segundo paso
    calcularCostoVentas(pagoManoDeObra, costoMateriaPrima)   // CalcularCostoVentas(50000, 20000)
    {
        this.rubroCostoVentas.manoDeObra = pagoManoDeObra;  // Mano de obra, es decir, el dinero que le pagamos a nuestros trabajadores por hacer esas cobijas.    50%
        this.rubroCostoVentas.materiaPrima = costoMateriaPrima;  // Dinero usado para fabricar esas cobijas, hilo, tela, etc.     20%
        this.rubroCostoVentas.costoVentas = pagoManoDeObra + costoMateriaPrima;  // Es el 70% de nuestras ventas
    }

    // Tercer paso
    calcularUtilidadBruta()
    {
        this.utilidadBruta = this.rubroVentas.ventasNetas - this.rubroCostoVentas.costoVentas;  // Esto es el 25% del total de nuestras ventas
    }

    // Cuarto paso
    calcularTotalGastos(gastosAdministrativos, gastosVenta)   // CalcularTotalGastos(15000, 2000)
    {
        this.rubroGastos.gastosAdministrativos = gastosAdministrativos;   // 15%   Sueldos y salarios de personas que administran el negocio
        this.rubroGastos.gastosVenta = gastosVenta;    // Gastos de publicidad   2%
        this.rubroGastos.totalGastos = gastosAdministrativos + gastosVenta;  // 17%
    }

    // Quinto paso
    calcularImpuestos(porcentajeImpuestoUtilidad)   // CalcularImpuestos(30)
    {
        this.rubroImpuestos.utilidadAntesDeImpuestos = this.utilidadBruta - this.rubroGastos.totalGastos;  // $8.000      8% del total de nuestras ventas
        this.rubroImpuestos.impuestosUtilidad = (this.rubroImpuestos.utilidadAntesDeImpuestos * porcentajeImpuestoUtilidad) / 100;   // Esto es $2.400    2.4% de nuestras ventas. En Mexico este impuesto es del 30%   Por lo tanto, el 30% de $8.000 = $2.400
    }

    // Sexto paso
    calcularUtilidadNeta()
    {
        this.utilidadNeta = this.rubroImpuestos.utilidadAntesDeImpuestos - this.rubroImpuestos.impuestosUtilidad;
    }
    
}