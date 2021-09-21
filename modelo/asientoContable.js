import { Debe } from './debe.js';
import { Haber } from './haber.js';

export class AsientoContable
{
    constructor(fecha, nombre)
    {
        this.fecha = fecha;
        this.nombre = nombre;
        this.descripcion;
        this.detallesDebe = [];
        this.detallesHaber = [];
    }

    cargar(nombreCuenta, importe, descripcionCarga) {
        this.detallesDebe.push(new Debe(nombreCuenta, importe, descripcionCarga));
    }
    abonar(nombreCuenta, importe, descripcionAbono) {
        this.detallesHaber.push(new Haber(nombreCuenta, importe, descripcionAbono));
    }
}