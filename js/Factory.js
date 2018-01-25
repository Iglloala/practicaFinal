var Factory = (function(){
	
	// Función generadora de objetos cliente
	var _Cliente = function(jsonData){
		// Propiedades
		this.id = jsonData.id;
		this.nombres = jsonData.nombres;
		this.ciudad = jsonData.ciudad;
		this.sexo = jsonData.sexo;
		this.telefono = jsonData.telefono;
		this.fecha_nacimiento = jsonData.fechaNacimiento;
	};
	// Añado un método para transformar un cliente en json
	_Cliente.prototype.transform2JSON = function(){
		dataJSON = JSON.stringify(this); 
		return dataJSON;
	}

	// RETORNO DEL MÓDULO
	return {
		Cliente: _Cliente,
	}
})()