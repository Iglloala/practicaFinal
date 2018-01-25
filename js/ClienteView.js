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
	};

	// Función para generar la vista de la ventana modal
	function _generar(cliente={id:'', nombres:'', ciudad:'', sexo:'', telefono:'', fecha_nacimiento:''}){
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

	// Función que me devuelve un objeto con todos los datos de la vista
	function _obtenerDatos(){
		var datos = {};
		// Pillo los datos
		datos.id = $('#formClienteView #id').val();
		datos.nombres = $('#formClienteView #nombres').val();
		datos.ciudad = $('#formClienteView #ciudad').val();
		datos.sexo = ($('#formClienteView #sexoMasculino').attr('checked') == 'checked')?'M':'F';
		datos.telefono = $('#formClienteView #telefono').val();
		datos.fecha_nacimiento = $('#formClienteView #inputFecha');
		// Y retorno un objeto plano con todos los datos
		return datos;
	}

	// Ejecución
	_init();

	// Retorno
	return {
		generar: _generar,
		mostrar: _mostrar,
		ocultar: _ocultar,
		obtenerDatos: _obtenerDatos,
	}
})();