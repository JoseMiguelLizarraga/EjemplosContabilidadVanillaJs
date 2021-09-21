import { formatearNumero } from '../../funciones/funcionesGenericas.js';
import { CargaVista } from '../cargaVista.js';
import { Libro } from '../../modelo/libro.js';
import { Activo } from '../../modelo/activo.js';
import { Pasivo } from '../../modelo/pasivo.js';
import { Capital } from '../../modelo/capital.js';
import { AsientoContable } from '../../modelo/asientoContable.js';

export class BalanceGeneral extends CargaVista
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
        let libro = new Libro();

        let activo = new Activo();
        let pasivo = new Pasivo();
        let capital = new Capital();

        /*
        Agregar capital social
        Un socio va a aportar capital (50.000). Viene de un socio, por lo que se tiene que reflejar en la parte de capital social
        Como esos 50.000 los tengo que meter al banco o a la caja chica de la empresa, tenemos que reflejarlo en el activo ya que forma parte de la empresa
        */
        activo.incrementarCaja(50000);              // Esto es porque es en efectivo
        capital.incrementarCapitalSocial(50000);    // Pasivo + Capital = 50.000
        
        let asiento1 = new AsientoContable("10-9-2021", "Asiento 1" );
        asiento1.cargar("Caja", 50000, "Como esos 50.000 los tengo que meter al banco o a la caja chica de la empresa, tenemos que reflejarlo en el activo ya que forma parte de la empresa");
        asiento1.abonar("Capital social", 50000, "Viene de un socio, por lo que se tiene que reflejar en la parte de capital social"); 
        asiento1.descripcion = `Un primer socio aportó un capital de 50.000`;
        libro.agregarAsiento(asiento1);

        /*
        Ahora un segundo socio que no tiene efectivo, va aportar productos que estan avaluados en 300.000
        Entonces, en el capital social, a los 50.000 hay que sumarle 300.000. Quedaria en 350.000
        Pasivo + Capital = 350.000  
        */
        activo.incrementarAlmacen(300000);  // Como no es efectivo, se debe reflejar en el activo, en la parte llamada Almacen
        capital.incrementarCapitalSocial(300000);

        let asiento2 = new AsientoContable("11-9-2021", "Asiento 2" );
        asiento2.cargar("Almacen", 300000, "Como no es efectivo, se debe reflejar en el activo, en la parte llamada Almacen");
        asiento2.abonar("Capital social", 300000, "Entonces, en el capital social, a los 50.000 hay que sumarle 300.000. Quedaria en 350.000"); 
        asiento2.descripcion = `Un segundo socio que no tiene efectivo aportó productos que estan avaluados en 300.000`;
        libro.agregarAsiento(asiento2); 

        /*
        Ahora vamos a solicitar un credito al banco de 750.000, para que asi la empresa tenga dinero en la caja
        */

        activo.incrementarCaja(750000);  // Esta cantidad solicitada es necesario reflejarla en el activo, sino el   Pasivo + Capital  sera mayor a   TotalActivo
        pasivo.incrementarCreditoBancario(750000);


        let asiento3 = new AsientoContable("12-9-2021", "Asiento 3" );
        asiento3.cargar("Caja", 750000, "Esta cantidad solicitada es necesario reflejarla en el activo, sino el   Pasivo + Capital  sera mayor a   TotalActivo");
        asiento3.abonar("Cuentas por Pagar", 750000, "Cumplir con Ley de la Partida Doble"); 
        asiento3.descripcion = `Se solicitó un credito al banco de 750.000, para que asi la empresa tenga dinero en la caja`;
        libro.agregarAsiento(asiento3); 

        /*
        Ahora vamos a hacer tanto una compra venta de productos como una venta a nuestro cliente
        Primero vamos a comprar 300.000 de productos, y se los vamos a comprar a un proveedor que nos va a dar credito a 30 dias
        Estos 300.000 se los vamos a pagar en algun momento a nuestro proveedor
        */
        activo.incrementarAlmacen(300000);  // Esto lo debemos reflejar en el activo, guardando los productos en el almacen
        pasivo.incrementarProveedores(300000);


        let asiento4 = new AsientoContable("13-9-2021", "Asiento 4" );
        asiento4.cargar("Almacen", 300000, "Primero vamos a comprar 300.000 de productos, y se los vamos a comprar a un proveedor que nos va a dar credito a 30 dias");
        asiento4.abonar("Pagos a Proveedores", 300000, "Estos 300.000 se los vamos a pagar en algun momento a nuestro proveedor"); 
        asiento4.descripcion = `
        Se realizó una compra a un proveedor de 300.000 de productos. El proveedor nos dió crédito a 30 dias. Estos 300.000 se los vamos a pagar en algún momento a nuestro proveedor`;
        libro.agregarAsiento(asiento4); 

        /*
        Ahora, esos productos que compramos por 300.000 se los vamos a vender a un cliente por 400.000
        */

        let precioComprado = 300000;
        let precioVendido = 400000;
        activo.incrementarClientes(precioVendido);
        // Se retira el producto del almacen. Ejemplo:  yo compre el producto en 300.000 pero lo vendi en 400.000
        activo.retirarProductoAlmacen(precioComprado);  // Entonces solo 300.000 es lo que sacamos de nuestro almacen
        // Ahora los 100.000 pesos que gane con la venta debo reflejarlos en la cuenta resultado del ejercicio(Capital)
        let cantidadGanada = precioVendido - precioComprado;
        capital.incrementarResultadoEjercicio(cantidadGanada);


        let asiento5 = new AsientoContable("14-9-2021", "Asiento 5" );
        asiento5.cargar("Ganancias por Ventas", cantidadGanada, "Se retira el producto del almacen. Ejemplo:  yo compre el producto en 300.000 pero lo vendi en 400.000");
        asiento5.abonar("Resultado del ejercicio(Capital)", cantidadGanada, "Ahora los 100.000 pesos que gane con la venta debo reflejarlos en la cuenta resultado del ejercicio(Capital)"); 
        asiento5.descripcion = `
        Ahora, esos productos que compramos por 300.000 se los vendimos a un cliente por 400.000`;
        libro.agregarAsiento(asiento5); 

        /*
        Verificar si el balance general esta bien cuadrado. La suma de  Pasivo + Capital = TotalActivo
        */

        let balanceCorrecto = (pasivo.total + capital.total == activo.total);

        let cadenaBalanceGeneral = `
        <b> ACTIVO: </b> <br/>
            Caja o bancos: ${formatearNumero(activo.caja)} <br/>
            Clientes: ${formatearNumero(activo.clientes)} (Esta es una cantidad que el cliente no nos ha pagado aun) <br/>
            Almacen: ${formatearNumero(activo.almacen)} <br/>
            Total Activo: ${formatearNumero(activo.total)} <br/><br/>
        <b> PASIVO: </b> <br/>
            Proveedores: ${formatearNumero(pasivo.proveedores)} (Esta es una cantidad que todavia no le hemos pagado a nuestro proveedor) <br/>
            Credito Bancario: ${formatearNumero(pasivo.creditoBancario)} <br/>
            Total Pasivo: ${formatearNumero(pasivo.total)} <br/><br/>
        <b> CAPITAL: </b> <br/>
            Capital Social: ${formatearNumero(capital.capitalSocial)} <br/>
            Resultado del Ejercicio: ${formatearNumero(capital.resultadoEjercicio)} <br/>
            Total Capital Social: ${formatearNumero(capital.total)} <br/>
            Pasivo + Capital: ${formatearNumero(pasivo.total + capital.total)} <br/><br/>
            ¿Esta correcto? = ${(balanceCorrecto ? "Si" : "No")} <br/><br/>
        `;

        /*
        Despliegue de asientos contables utilizados
        */

        let sumaDebe = 0;
        let sumaHaber = 0;

        let cadenaAsientosContables = `
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

            ${libro.asientosContables.map((asiento, cont) => 
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

        let textoHtml = `
        <br/><br/>
        <h3> Balance General </h3>
        ${cadenaBalanceGeneral}
    
        <br/><br/>
        <h3> Asientos contables utilizados </h3>
        ${cadenaAsientosContables}
    
        <br/><br/>
        `;

        this.cargarHtml({ textoHtml });  
    }
};

