var ClienteListView = (function(){
	// PROPIEDADES
	var _bloqueContenido = $('#contenido');
	// propiedades para paginar
	var _paginas = [1];
	var _paginaActual = 1;
	var _maximoPagina = 5; // 5
	var _posicionInicio = (_paginaActual * _maximoPagina) - _maximoPagina; // 0 // 5 // 10
	var _posicionFinal = (_paginaActual * _maximoPagina); // 5 // 10 // 15
	var _arrayClientes = [];

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

	// btPagina
	$('#contenido').on('click', '.btPagina', function(event){
		event.preventDefault();
		// Pillo el atributo data-pagina del botón
		var paginaSolicitada = $(this).attr('data-pagina');
		// Comprueba si es anterior o siguiente
		if (isNaN(paginaSolicitada)){
			switch (paginaSolicitada) {
				case 'anterior':
					paginaSolicitada = Number(_paginaActual) -1;
					break;
				case 'siguiente':
					paginaSolicitada = Number(_paginaActual) +1;
					break;
				default:
					paginaSolicitada = 1;
					break;
			}
		}
		// Actualiza los valores del paginador
		_paginaActual = paginaSolicitada;
		_posicionInicio = (_paginaActual * _maximoPagina) - _maximoPagina;
		_posicionFinal = (_paginaActual * _maximoPagina);
		// Y llama a la función que genera la vista con los nuevos valores
		_generar(_arrayClientes);
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
		// Construyo los datos que se le van a pasar a Handlebars
		// - Guardo todos los clientes que me manda ClientList en la propiedad del módulo
		_arrayClientes = arrayClientes;
		// - Extraigo el pedazo que voy a usar
		var trozoClientes = (arrayClientes.length<=_maximoPagina)?arrayClientes:arrayClientes.slice(_posicionInicio, _posicionFinal);
		// - Calculo los números de página
		_paginas = (function(arrayClientes){
			var arrayPaginas = [];
			for (var c=0, p=1; c<arrayClientes.length; c+=_maximoPagina, p++){
				var actual = (p==_paginaActual)?true:false;
				var pagina = {pagina:p, actual:actual};
				arrayPaginas.push(pagina)
			}
			return arrayPaginas;
		})(arrayClientes);
		// - Calculo si el botón de 'Anterior' debe de estar desactivado
		var anteriorDesactivado = (_paginaActual==1)?true:false;
		// Calculo si el botón 'Siguiente' debe de estar desactivado
		var siguienteDesactivado = (_paginaActual==_paginas[_paginas.length-1].pagina)?true:false;
		// - Genero el objeto data
		var data = {
			clientes: trozoClientes,
			paginas : _paginas,
			anteriorDesactivado: anteriorDesactivado,
			siguienteDesactivado: siguienteDesactivado,
		}
		// Genero el html pasándole a Handlebars el trozo del array clientes que quiero que
		// se muestre así como el resto de datos necesarios para paginar
		var html = Handlebars.templates.listaClientes(data);
		// Si la vista no existe en el documento la añade
		if (!_bloqueContenido.find('#clienteListView').length){
			_bloqueContenido.append(html);
		}
		// Y si ya existe la reemplaza
		else {
			_bloqueContenido.find('#clienteListView').replaceWith(html);
		}
		// Deshabilita el comportamiento normal de los botones btPagina
		//$('#contenido #btPagina').preventDefault();
	}

	// EJECUCIÓN
	_init();
	
	// RETORNO
	return {
		generar: _generar,
	}
})();