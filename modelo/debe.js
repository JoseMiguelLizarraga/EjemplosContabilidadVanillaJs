

export class Debe
{
    constructor(nombreCuenta, cantidad, descripcionCarga)
    {
        this.nombreCuenta = nombreCuenta; 
        this.cantidad = cantidad;
        this.descripcionCarga = descripcionCarga;
    }

    cantidadConPuntos() { return formatearNumero(this.cantidad); }
}