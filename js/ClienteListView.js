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

	function _generar(data){
		console.log('Actualizando la vista del listado de clientes');
		// Lista clientes es un objeto con objetos cliente dentro.
		// Lo voy a convertir a un objeto con un array clientes dentro con objetos cliente para poder iterarlo con handlebars
		var datosPlantilla = {clientes : []};
		for (cliente in data.clientes){
			datosPlantilla.clientes.push(data.clientes[cliente]);
		}
		// Ahora ya pues lo paso a handlebars para que cree el html
		var html = Handlebars.templates.listaClientes(datosPlantilla);
		// Si no existe en el documento lo añade
		if (!_bloqueContenido.find('#clienteListView').length){
			_bloqueContenido.append(html);
		}
		// Y si ya existe lo reemplaza
		else {
			_bloqueContenido.find('#clienteListView').replaceWith(html);
		}
		// Y AÑADO LOS MANEJADORES DE EVENTOS
		$('#btNuevoCliente').on('click', function(){
			console.log('Se ha pulsado el botón para añadir un nuevo cliente');
		})
		
	}

	// Ejecución
	_init();
	// Retorno
	return {
		generar: _generar,
	}
})();