var Factory = (function(){
	
	// Se subscribe a eventos publicados
	PubSub.subscribe('btPulsado/enviarNuevo', _generarClienteNuevo);
	PubSub.subscribe('btPulsado/enviarModificar', _generarClienteModificar);

	// Constructor de objetos cliente
	var _Cliente = function(jsonData){
		// Propiedades
		this.id = jsonData.id;
		this.nombres = jsonData.nombres;
		this.ciudad = jsonData.ciudad;
		this.sexo = jsonData.sexo;
		this.telefono = jsonData.telefono;
		this.fecha_nacimiento = jsonData.fecha_nacimiento;
		this.direccion = jsonData.direccion;
		this.provincia = jsonData.provincia;
		this.fecha_alta = jsonData.fecha_alta;
	};
	// Añado un método para transformar un cliente en json
	// Lo comento xq sino me da "Uncaught TypeError: Converting circular structure to JSON"
	// _Cliente.prototype.transform2JSON = function(){
	// 	dataJSON = JSON.stringify(this);
	// 	return dataJSON;
	// }

	// Función que genera un nuevo objeto cliente llamando al constructor pasándole los datos
	//  que necesita para insertar un nuevo cliente
	function _generarClienteNuevo(datos){
		// Crea el nuevo cliente
		var nuevoCliente = new _Cliente(datos);	
		// Y lo publica
		PubSub.publish("generado/nuevoClienteInsertar", nuevoCliente);
	}

	// Función que genera un nuevo objeto cliente llamando al constructor pasándole los datos
	// que necesita para modificar un cliente existente
	function _generarClienteModificar(datos){
		// Crea el nuevo cliente
		var nuevoCliente = new _Cliente(datos);	
		// Y lo publica
		PubSub.publish("generado/nuevoClienteModificar", nuevoCliente);
	}

	// RETORNO DEL MÓDULO
	return {
		Cliente: _Cliente,
	}
})()