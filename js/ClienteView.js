var ClienteView = (function(){
	// Propiedades
	var _bloqueContenido = $('#contenido');

	// Métodos
	function _init(){
		// Registro un helper de handlebars para añadir el atributo cheked a un radiobutton
		// teniendo en cuenta el valor del radioButton y el valor de cliente.sexo
		Handlebars.registerHelper('marcarRadiobutton', function(valorRadio, valorCliente){
			if (valorRadio == valorCliente){
				return "checked";
			}
			else {
				return "";
			}
		});
		// Genero la ventana modal
		_generar();
	};

	// Función para generar la vista de la ventana modal
	function _generar(cliente={id:'', nombres:'', ciudad:'', sexo:'', telefono:'', fechaNacimiento:''}){
		var html = Handlebars.templates.cliente(cliente);
		// Si no existe el modal lo añado
		if (!_bloqueContenido.find('#clienteView').length){
			_bloqueContenido.append(html);	
		}
		// Si ya existe lo reemplazo
		else {
			_bloqueContenido.find('#clienteView').replaceWith(html);
		}
		// En ambos casos convierto #inputFecha en un datepicker
		_bloqueContenido.find('#inputFecha').datepicker();
	}

	// Función que muestra la ventana modal de ClienteView
	function _mostrar(){
		_bloqueContenido.find('.modal').modal("show");
	}

	// Función que oculta la ventana modal de ClienteView
	function _ocultar(){
		_bloqueContenido.find('.modal').modal("hide");
	}

	// Ejecución
	_init();

	// Retorno
	return {
		generar: _generar,
		mostrar: _mostrar,
		ocultar: _ocultar,
	}
})();