import { formatearNumero } from '../../funciones/funcionesGenericas.js';
import { CargaVista } from '../cargaVista.js';
import { Libro } from '../../modelo/libro.js';
import { AsientoContable } from '../../modelo/asientoContable.js';

export class AsientoContable2 extends CargaVista
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

        // Primer asiento:

        let asiento1 = new AsientoContable("17-10-2018", "Asiento 1");
        asiento1.descripcion = `
        El 17 de octubre se le hace un prestamo al empleado #1618 de $20.000. El comenta que lo pagara en 5 partes. Cada parte se le descontara de su nomina 
        y la nomina es quincenal. Se le entrega un cheque con la cantidad pactada.
        `;

        // Primero hacemos un cargo a lo que va a aumentar nuestro activo. Como nosotros le vamos a prestar dinero a un empleado, lo que vamos a tener como activo. Es una cuenta por cobrar
        asiento1.cargar(
            "Deudores Diversos", 
            20000, 
            "Primero hacemos un cargo a lo que va a aumentar nuestro activo. Como nosotros le vamos a prestar dinero a un empleado, lo que vamos a tener como activo. Es una cuenta por cobrar"
        );

        // Como se lo vamos a pagar a traves de un cheque, y nuestro activo esta disminuyendo, tenemos que hacer un abono al haber
        asiento1.abonar("Banco (Cheque #10)", 20000, "Como se lo vamos a pagar a traves de un cheque, y nuestro activo esta disminuyendo, tenemos que hacer un abono al haber");

        libro.agregarAsiento(asiento1);

        //==================================================================>>>>>
        // Segundo asiento:

        let asiento2 = new AsientoContable("31-10-2018", "Asiento 2");
        asiento2.descripcion = `
        El 31 de octubre se paga la nomina de los empleados por un total de $150.000, a traves de transferencia bancaria. Se realiza una retencion de impuestos 
        por $40.000. Dentro del pago de la nomina se realiza el primer descuento al trabajador #1618 a cuenta de prestamo.
        `;

        asiento2.cargar("Gastos por Sueldos y salarios", 150000, "Al pagar la nomina vamos a sacar dinero de nuestro banco. Aca estamos afectando una cuenta de resultados y es un gasto");

        // Esta es la retencion de impuestos. Aca vamos a abonar $40.000. Y lo estoy abonando porque para nosotros va a 
        // representar una obligacion pagar ese impuesto a cuenta del trabajador
        asiento2.abonar("Impuestos por pagar", 40000, "Esta es la retencion de impuestos. Aca vamos a abonar $40.000. Y lo estoy abonando porque para nosotros va a representar una obligacion pagar ese impuesto a cuenta del trabajador");

        // Ahora vamos a disminuir la cuenta de Deudores Diversos, ya que el trabajador lo esta pagando. La quinta parte de esos $20.000 es $4.000
        // $4.000 es lo que nosotros le vamos a quitar a ese trabajador debido a su prestamo
        asiento2.abonar("Deudores Diversos", 4000, "Ahora vamos a disminuir la cuenta de Deudores Diversos, ya que el trabajador lo esta pagando. La quinta parte de esos $20.000 es $4.000. Entonces $4.000 es lo que nosotros le vamos a quitar a ese trabajador debido a su prestamo");

        // Ahora hay que sacar el dinero para poder completar nuestra operacion
        asiento2.abonar(
            "Bancos", 
            106000, 
            `
            Ahora hay que sacar el dinero para poder completar nuestra operacion. 
            Al gasto de los $150.000 vamos a restarle los $40.000 de los Impuestos por pagar. Eso es porque al trabajador le vamos a pagar su sueldo neto, es decir 
            su sueldo menos los impuestos que le estamos reteniendo. 
            Tambien hay que restarle los $4.000 que le quitamos a ese trabajador debido a su prestamo. <br/>
            Entonces 150.000 - 40.000 - 4.000 = 106.000 (De nuestro banco van a salir solamente $106.000)
            `
        );  // De nuestro banco van a salir solamente $106.000

        libro.agregarAsiento(asiento2);

        //==================================================================>>>>>
        // Tercer asiento:

        let asiento3 = new AsientoContable("05-11-2018", "Asiento 3");
        asiento3.descripcion = `El 5 de noviembre se manda a cobrar un cheque (Vamos a sacar dinero de nuestro banco) para abrir un fondo de caja por el importe de $5.000`;

        // Vamos a sacar dinero de nuestro banco
        asiento3.cargar(
            "Fondo de caja o caja chica", 
            5000, 
            `Vamos a sacar dinero de nuestro banco, y como la salida de dinero siempre es un abono, vamos a dar nacimiento o abrir una nueva cuenta para tener dinero 
            disponible de manera inmediata`
        );

        asiento3.abonar("Bancos", 5000, "Lo vamos a abrir a traves de un cheque. Ese cheque va a salir de nuestra cuenta bancaria. Por lo tanto tenemos que sacar dinero del banco");

        libro.agregarAsiento(asiento3);

        //==================================================================>>>>>
        // Cuarto asiento:

        let asiento4 = new AsientoContable("10-11-2018", "Asiento 4");
        asiento4.descripcion = `El 10 de noviembre se pagan los impuestos de los trabajadores a las autoridades fiscales`;

        asiento4.cargar(
            "Impuestos por pagar", 
            40000, 
            `Como vamos a pagar los impuestos, tenemos que disminuir ese pasivo que nosotros hicimos hace dos asientos atras. 
            Como estamos disminuyendo el pasivo pues vamos a cargarlo. Vamos a cargar el mismo importe de $40.000 que le retuvimos a esos trabajadores`
        );

        asiento4.abonar(
            "Bancos", 
            40000, 
            `Esto es lo que va a salir de nuestros bancos. Asi le damos cumplimiento tanto a los impuestos por pagar asi como matar esa cuenta de pasivo que 
            en su momento nosotros le dimos nacimiento. Hicimos el pago de los $150.000 mas los $40.000   ... esta parte no la entendi muy bien`
        );

        libro.agregarAsiento(asiento4);

        //==================================================================>>>>>
        // Quinto asiento:

        let asiento5 = new AsientoContable("15-11-2018", "Asiento 5");
        asiento5.descripcion = `
        El 15 de noviembre se paga la nomina de los empleados por un total de $125.000, sin embargo, la empresa solicita un prestamo a un banco para dicho gasto, ya 
        que no cuenta con la solvencia en ese momento. Se realiza una retencion de impuestos de la nomina por un importe de $30.000. En esta ocacion el  
        trabajador #1618 pidio que no se le descontara nada
        `;

        asiento5.cargar("Gastos por Sueldos y salarios", 125000, "Primero tenemos que afectar el gasto");

        asiento5.abonar(
            "Impuestos por pagar", 
            30000, 
            "Como estamos reteniendo esos impuestos, nuevamente tenemos que hacer un pasivo por esos impuestos que le estamos reteniendo al trabajador"
        );

        asiento5.abonar(
            "Acreedores diversos", 
            95000, 
            `
            Como el trabajador esta pidiendo que no le descontemos nada de su nomina, por lo tanto no tenemos que reflejar ese movimiento. 
            Y no estamos sacando el dinero del banco, es un tercero el que nos esta prestando el dinero para que nosotros podamos cubrir ese pasivo.
            Por lo tanto vamos a abrir un nuevo pasivo. Es un acreedor el que nos esta prestando dinero. Uso el nombre Acreedores diversos porque podria 
            ser no solo un banco el que nos presta, sino tambien una persona o una empresa.
            El calculo es: 125.000 - 30.000 (El impuesto que estamos reteniendo a los trabajadores) = 95.000 <br/>
            La cantidad que vamos a solicitar que nos presten es $95.000  y la vamos a quedar debiendo  
            `
        );

        libro.agregarAsiento(asiento5);

        //==================================================================>>>>>
        // Sexto asiento:

        let asiento6 = new AsientoContable("20-11-2018", "Asiento 6");
        asiento6.descripcion = `
        El 20 de noviembre se compra una silla para el jefe de la empresa que vale $4.000. La forma de pago es en efectivo y se toma de la caja chica de 
        la empresa. El importe no considera IVA y la tasa es del 16%
        `;

        asiento6.cargar(
            "Mobiliario y equipo de oficina", 
            4000, 
            `Vamos a afectar a nuestro activo, ya que como tal, no es un gasto. Una silla es un activo y es parte del mobiliario de la oficina. 
            Por lo tanto no voy a afectar al gasto, voy a afectar a una cuenta de activo`
        );

        asiento6.cargar(
            "IVA Acreditable", 
            640, 
            `No considera IVA. Usamos la cuenta IVA Acreditable porque es nuestro y en algun momento vamos a hacer uso de el. Es por el importe del 16% <br/>
            El 16% se aplica al importe bruto, es decir, a 4.000. El calculo es: (4.000 * 16) / 100 = 640`
        );

        asiento6.abonar(
            "Fondo de caja o caja chica", 
            4640, 
            `Ocupamos la cuenta que creamos unos asientos atras. Asi tenemos inmediatez para poder usar ese dinero. Sirve para gastos menores. Entonces
            4.000 + 640 = 4.640`
        );

        libro.agregarAsiento(asiento6);

        //==================================================================>>>>>
        // Septimo asiento:

        let asiento7 = new AsientoContable("21-11-2018", "Asiento 7");
        asiento7.descripcion = `El 21 de noviembre, el empleado #1618 decide pagar lo que le resta de su deuda con la empresa por medio de un cheque`;

        asiento7.cargar(
            "Banco", 
            16000, 
            `
            Vamos a ingresar al Banco los 16.000 que el empleado esta pagando. 
            Saca el saldo de lo que ese empleado le debe todavia a la empresa. Como nosotros le prestamos 20.000, pero ya pago 4.000, el importe 
            de la deuda que resta son 16.000. Aca cargamos, porque vamos a meter dinero en nuestra empresa. 
            Cuando se habla de cargar es porque es un derecho, o porque estamos disminuyendo nuestros pasivos
            `
        );  

        asiento7.abonar(
            "Deudores Diversos", 
            16000, 
            "Vamos a disminuir su Cuenta por cobrar. Con esto, el saldo de la cuenta Deudores Diversos queda en cero. Asi recuperamos el dinero que el empleado solicito"
        );

        libro.agregarAsiento(asiento7);

        //==================================================================>>>>>
        // Octavo asiento:

        let asiento8 = new AsientoContable("24-11-2018", "Asiento 8");
        asiento8.descripcion = `El 24 de noviembre, un socio aporta $1.000.000 a la sociedad para operar por medio de un deposito bancario`;
        
        asiento8.cargar("Banco", 1000000, "Afectamos nuestra cuenta Banco, ya que esta entrando dinero a la empresa"); 
        asiento8.abonar("Capital Social (Contribuido)", 1000000, "Asi cumplimos la ley de la partida doble");

        libro.agregarAsiento(asiento8);

        //==================================================================>>>>>
        // Noveno asiento:

        let asiento9 = new AsientoContable("25-11-2018", "Asiento 9");
        asiento9.descripcion = `El 25 de noviembre, la empresa le paga al banco el prestamo que solicito para pagar la ultima nomina (sueldos o salarios)`;

        asiento9.cargar(
            "Acreedores diversos", 
            95000, 
            `Como estamos disminuyendo ese pasivo, o esa deuda, tenemos que disminuir la cuenta Acreedores diversos, que es donde nosotros. 
            anteriormente reflejamos esa deuda. Lo hacemos por el importe que nos presto y que es 95.000`
        );

        asiento9.abonar("Banco", 95000, "De la cuenta Banco sacamos dinero para pagarle al acreedor");

        libro.agregarAsiento(asiento9);
    
        // Despliegue del html

        let textoHtml = `
        <br/><br/>
        <h3> Ejemplo 2 (Asientos contables) </h3>
        ${libro.obtenerTablaAsientosLibro()}
    
        <br/><br/>
        `;

        this.cargarHtml({ textoHtml });  
    }
};

