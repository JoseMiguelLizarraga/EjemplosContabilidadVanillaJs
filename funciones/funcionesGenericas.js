

const mostrarLoadingSpinner = () =>
{
	document.querySelector("#loading-spinner").style.display = "block";
}

const ocultarLoadingSpinner = () =>
{
	document.querySelector("#loading-spinner").style.display = "none";
}

const formatearNumero = (numero) =>
{
	var arreglo = (numero + "").split("").reverse();
	var cadena = "", cont = 1;

	arreglo.forEach((c, index) => {
		cadena += c;
		if (cont % 3 == 0 && arreglo[index + 1] != null) cadena += ".";
		cont ++;
	});

	var nuevaCadena = cadena.split("").reverse().join("");
	return nuevaCadena;
}

export { 
	mostrarLoadingSpinner, 
	ocultarLoadingSpinner, 
	formatearNumero 
}