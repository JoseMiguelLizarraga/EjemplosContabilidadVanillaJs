

export class Haber
{
    constructor(nombreCuenta, cantidad, descripcionAbono)
    {
        this.nombreCuenta = nombreCuenta;
        this.cantidad = cantidad;
        this.descripcionAbono = descripcionAbono;
    }

    cantidadConPuntos() { return formatearNumero(this.cantidad); }
}