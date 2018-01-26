var ClienteListView = (function(){
	// Propiedades
	var _bloqueContenido = $('#contenido');

	// Métodos
	function _init(){
		// Se registran los suscriptores para la actualización de la vista
		var subscribeCargaInicial = PubSub.subscribe("carga/inicial", _generar);
		var subscribeInsercion = PubSub.subscribe("cliente/insertado", _generar);
		var subscribeModificacion = PubSub.subscribe("cliente/modificado", _generar);
		var subscribeEliminacion = PubSub.subscribe("cliente/eliminado", _generar);
	}

	function _generar(arrayClientes){
		console.log('Actualizando la vista del listado de clientes');
		// Genero el html pasándole a Handlebars el array con todos los clientes
		// que me trae el publicador
		var html = Handlebars.templates.listaClientes(arrayClientes);
		// Si la vista no existe en el documento la añade
		if (!_bloqueContenido.find('#clienteListView').length){
			_bloqueContenido.append(html);
		}
		// Y si ya existe la reemplaza
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