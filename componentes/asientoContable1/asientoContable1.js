import { formatearNumero } from '../../funciones/funcionesGenericas.js';
import { CargaVista } from '../cargaVista.js';
import { Libro } from '../../modelo/libro.js';
import { AsientoContable } from '../../modelo/asientoContable.js';

export class AsientoContable1 extends CargaVista
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

        //==================================================================>>>>>
        // Agregamos el primer asiento
        let asiento1 = new AsientoContable("20-01-2018", "Asiento 1" ); 
        asiento1.descripcion = "Aportes de tres socios"; 

        asiento1.cargar("Banco", 100000, "El socio uno aporta $100.000 y los deposita al banco de la sociedad");  
        asiento1.cargar("Almacen", 50000, "El socio dos aporta $50.000 en productos listos para vender"); 
        asiento1.cargar(
            "Equipo de computo", 
            100000, 
            "Otro socio aporta cuatro computadoras valuadas en $25.000 cada una (25.000 * 4 = 100.000). En contabilidad, equipo de computo es un rubro"
        );  

        // Asi cumplimos con la ley de la partida doble
        asiento1.abonar(
            "Capital social (Contribuido)", 
            250000, 
            "La suma de lo que aportaron los socios es $250.000. La cuenta de haber a la que vamos a mandar estos importes se llama capital social"
        );  

        libro.agregarAsiento(asiento1);

        //==================================================================>>>>>
        /*
        Agregamos el segundo asiento:

            El 15 de marzo se compra producto para perro listo para su venta con un valor de $85.000 y el 50% se pagara a 45 dias de credito y el otro 50% se paga 
            al contado. El importe no considera IVA.
        */

        let asiento2 = new AsientoContable("15-03-2018", "Asiento 2" );
        asiento2.descripcion = `El 15 de marzo se compra producto para perro listo para su venta con un valor de $85.000 y el 50% se pagara a 45 dias de credito y el otro 50% se paga 
        al contado. El importe no considera IVA.`;

        asiento2.cargar(
            "Almacen", 
            85000, 
            `Estamos comprando mercancia por un importe de $85.000. Por lo tanto vamos a hacer el cargo a nuestro almacen. 
            La totalidad de la mercancia va a entrar al almacen, aunque una parte se tenga que pagar despues`
        );  

        asiento2.cargar(
            "IVA por acreditar", 
            13600,
            `Hacemos un cargo del IVA por agreditar. Este es un impuesto que puedes usar a tu favor en el futuro. 
            Cada vez que compremos mercancia vamos a poder tener un IVA (impuesto) que es de nosotros, y lo vamos a poder utilizar despues cuando tengamos un IVA por pagar.
            En Mexico el IVA es el 16% y entonces para calcular el IVA seria: ((85.000 * 16) / 100) = 13.600`
        );  

        let cantidadMasIVA = 98600;  // 85.000 + 13.600 = 98.600
        asiento2.abonar("Proveedores", cantidadMasIVA, "Asi cumplimos con la ley de la partida doble. Calculo: 85.000 + 13.600 = 98.600");

        libro.agregarAsiento(asiento2);

        //=========================>>>>
        // Esto forma parte del asiento 2 y por eso se le va a denominar Asiento 2a

        let asiento2_A = new AsientoContable("15-03-2018", "Asiento 2a");
        asiento2_A.descripcion = "Esto forma parte del asiento 2 y por eso se le va a denominar Asiento 2a";

        asiento2_A.cargar(
            "Proveedores", 
            49300, 
            `Registramos en contabilidad que la mitad del dinero la estamos pagando en efectivo (inmediatamente). Vamos a colocar el primer pago al contado de un 50%.
            Entonces $49.300 es el 50% de $98.600. Vamos a cargar a proveedores, ya que estamos disminuyendo el pasivo`
            );  
        
        asiento2_A.abonar("Banco", 49300, "Vamos a pagar a traves de nuestro banco, haciendo la salida de dinero de este. Asi cumplimos con la ley de la partida doble"); 

        asiento2_A.cargar(
            "IVA Acreditable", 
            6800, 
            `Registramos en contabilidad que la otra mitad del dinero, es decir, 49.300, ya quedo registrada como una cuenta que se va a pagar a 45 dias.
            Como nosotros ya pagamos, el IVA por acreditar se convierte en un IVA acreditable, y puedo hacer uso de el, ya que ya lo pague. El calculo es: 13.600 / 2 = 6.800`
        );

        asiento2_A.abonar("IVA por acreditar", 6800, "Se abona en la cuenta IVA por acreditar");

        libro.agregarAsiento(asiento2_A);

        //==================================================================>>>>>
        // Agregamos el tercer asiento: 

        let asiento3 = new AsientoContable("16-03-2018", "Asiento 3");
        asiento3.descripcion = "Compra de mobiliario";

        asiento3.cargar("Mobiliario y Equipo", 10000, "El 16 de marzo se compra un escritorio y una silla para el negocio con importe de $10.000");
        asiento3.abonar("Acreedores Diversos", 10000, "Como no se quien me lo esta vendiendo, le pongo Acreedores Diversos");
        asiento3.cargar("Acreedores Diversos", 10000, "Esta parte no la entendi bien");  
        asiento3.abonar("Banco", 10000, "Esta parte no la entendi bien");

        libro.agregarAsiento(asiento3);

        //==================================================================>>>>>
        /*
        Agregamos el cuarto asiento:

            El 30 de abril se paga el salario de una persona encargada de vender el producto y otra de administrarlo. 
            El salario del primero es de $15.000 y el segundo es de $14.000
        */

        let asiento4 = new AsientoContable("30-04-2018", "Asiento 4");
        asiento4.descripcion = `El 30 de abril se paga el salario de una persona encargada de vender el producto y otra de administrarlo.  
        El salario del primero es de $15.000 y el segundo es de $14.000`;

        asiento4.cargar(
            "Sueldos y Salarios (Gasto Venta)", 
            15000, 
            `Guando tenemos un gasto tenemos que cargarlo, ya que corre por cuenta de la compañia.
            El hecho de hablar del pago de un salario nos dice que tenemos que gastar en una persona cierto importe para que realice una determinada funcion`
        );

        asiento4.cargar("Sueldos y Salarios (Gasto de Administración)", 14000, "Se paga el salario de una persona encargada de administrar el producto");

        asiento4.abonar(
            "Banco", 
            29000, "De nuestro banco van a salir $29.000. Uso la cuenta Banco, que es de donde va a salir nuestro dinero. Calculo: 15.000 + 14.000 = 29.000");     

        libro.agregarAsiento(asiento4);

        //==================================================================>>>>>
        /*
        Agregamos el quinto asiento (Aca en lugar de comprar mercancia, vamos a venderla):
            El 8 de mayo se vende producto a una fundacion. El importe que se vendio es por $50.000. El 80% se cobra de contado y el resto se cobrara a 45 dias.
            El costo de lo vendido representa el 50% de la venta.
        */

        let asiento5 = new AsientoContable("08-05-2018", "Asiento 5");
        asiento5.descripcion = `El 8 de mayo se vende producto a una fundacion. El importe que se vendio es por $50.000. El 80% se cobra de contado y el resto se cobrara a 45 dias. 
        El costo de lo vendido representa el 50% de la venta.`;

        asiento5.cargar("Clientes (Cuentas por cobrar)", 50000, "$50.000 es el importe total de lo que se vendio");   // Primero voy a registrar la totalidad del importe en la cuenta Clientes
        asiento5.abonar("Ventas", 50000, "Ojo que aca no se esta considerando el IVA");

        libro.agregarAsiento(asiento5);

        //======================>>>>
        // Registrar un pago que nos estan haciendo. Aqui voy a reflejar cuanto estoy cobrando
        let asiento5_A = new AsientoContable("08-05-2018", "Asiento 5a");
        asiento5_A.descripcion = `Registrar un pago que nos estan haciendo. Aqui voy a reflejar cuanto estoy cobrando`;

        asiento5_A.cargar("Banco", 40000, "Le mando al banco la totalidad de lo que nos van a pagar. El 80% de $50.000 es $40.000"); 
        asiento5_A.abonar("Clientes", 40000, "Aca voy a reducir lo que nos deben nuestros clientes");

        libro.agregarAsiento(asiento5_A);

        //======================>>>>
        // Registrar el costo de lo vendido que es el 50% de la venta. De nuestro almacen tendremos que sacar el producto porque ya lo vendimos

        let asiento5_B = new AsientoContable("08-05-2018", "Asiento 5b");
        asiento5_B.descripcion = `Registrar el costo de lo vendido que es el 50% de la venta. De nuestro almacen tendremos que sacar el producto porque ya lo vendimos`;    
        
        asiento5_B.cargar(
            "Costo de Ventas", 
            25000, 
            "Hacemos un cargo a nuestro Costo de Ventas, ya que nosotros estamos asumiendo ese costo por la mitad de lo que vendimos. El calculo es:  $50.000 / 2 = $25.000"
        );    

        asiento5_B.abonar("Almacen", 25000, "Asi se refleja que el Almacen ya no tiene ese importe o esa mercancia");

        libro.agregarAsiento(asiento5_B);

        // Despliegue del html
       
        let textoHtml = `
        <br/><br/>
        <h3> Ejemplo 1 (Asientos contables) </h3>
        ${libro.obtenerTablaAsientosLibro()}
    
        <br/><br/>
        `;

        this.cargarHtml({ textoHtml });  
    }
};

