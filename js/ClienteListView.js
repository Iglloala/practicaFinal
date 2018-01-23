var ClienteListView = (function(){
	// Propiedades
	var _bloqueContenido = $('#contenido');

	// Métodos
	function _init(){

	}

	function _generar(listaClientes){
		// Lista clientes es un objeto con objetos cliente dentro.
		// Lo voy a convertir a un objeto con un array clientes dentro con objetos cliente para poder iterarlo con handlebars
		var datos = {clientes : []};
		for (cliente in listaClientes){
			datos.clientes.push(listaClientes[cliente]);
		}
		// Ahora ya pues lo paso a handlebars para que cree el html
		var html = Handlebars.templates.listaClientes(datos);
		// Si no existe en el documento lo añade
		if (!_bloqueContenido.find('#clienteListView').length){
			_bloqueContenido.append(html);
		}
		// Y si ya existe lo reemplaza
		else {
			_bloqueContenido.find('#clienteListView').replaceWith(html);
		}
		
	}

	// Ejecución
	_init();
	// Retorno
	return {
		generar: _generar,
	}
})();