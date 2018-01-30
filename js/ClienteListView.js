var ClienteListView = (function(){
	// PROPIEDADES
	var _bloqueContenido = $('#contenido');

	// EVENTOS
	//- btNuevoCliente
	$('#contenido').on('click', '#btNuevoCliente', function(event){
		// Publica que se ha pulsado el botón btNuevoCliente para que responda ClientView
		// Tengo que pasarle un objeto cliente vacío para que el helper transformarFecha no explote
		var dummy = {id:'', nombres:'', ciudad:'', sexo:'', telefono:'', fecha_nacimiento:''};
		PubSub.publish("btPulsado/nuevoCliente", dummy);
	});

	// btModificarCliente
	$('#contenido').on('click', '#btModificarCliente', function(event){
		// Pillo el id del cliente que se pretende modificar
		var idCliente = $(event.currentTarget).parent().parent().attr('data-id');
		// Y publico que se ha pulsado el botón (pasando el id del cliente)
		PubSub.publish('btPulsado/modificar', idCliente);
	});

	// btEliminarCliente
	$('#contenido').on('click', '#btEliminarCliente', function(event){
		// Pillo el id del cliente que se pretende eliminar
		var idCliente = $(event.currentTarget).parent().parent().attr('data-id');
		// Publico que se ha pulsado el botón (pasando el id del cliente)
		PubSub.publish('btPulsado/eliminar', idCliente);
	});

	// MÉTODOS
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

	// EJECUCIÓN
	_init();
	
	// RETORNO
	return {
		generar: _generar,
	}
})();