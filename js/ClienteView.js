var ClienteView = (function(){
	// PROPIEDADES
	var _bloqueContenido = $('#contenido');

	// EVENTOS
	//- btEnviarNuevo
	$('#contenido').on('click', '#btEnviarNuevo', function(event){
		// Recupera los datos del formulario
		var datos = _obtenerDatos();
		// Publica un "btPulsado/EnviarNuevo" con los datos para que los pille Factory
		PubSub.publish("btPulsado/enviarNuevo", datos);
		// Y cierra la ventana modal
		_ocultar();
	});

	// btEnviarModificar
	$('#contenido').on('click', '#btEnviarModificar', function(event){
		// Recupera los datos del formulario
		var datos = _obtenerDatos();
		// Publica un "btPulsado/enviarModificar" con los datos para que los pille Factory
		PubSub.publish("btPulsado/enviarModificar", datos);
		// Y cierra la ventana modal
		_ocultar();
	});

	// MÉTODOS
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
		// Se subscribe a eventos del publicador
		PubSub.subscribe("btPulsado/nuevoCliente", _generar);
		PubSub.subscribe("clienteEncontrado/modificar", _generar);
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
		_bloqueContenido.find('#inputFecha').datepicker({changeYear:'true', changeMonth:'true', yearRange:'1900:2018', dateFormat:'dd-mm-yy'});
		// Y llama a _mostrar para que se vea le modal
		_mostrar();
	}

	// Función que muestra la ventana modal de ClienteView
	function _mostrar(){
		_bloqueContenido.find('#clienteView').modal("show");
	}

	// Función que oculta la ventana modal de ClienteView
	function _ocultar(){
		_bloqueContenido.find('#clienteView').modal("hide");
	}

	// Función que me devuelve un objeto con todos los datos de la vista
	function _obtenerDatos(){
		var datos = {};
		// Pillo los datos
		datos.id = $('#formClienteView #id').val();
		datos.nombres = $('#formClienteView #nombres').val();
		datos.ciudad = $('#formClienteView #ciudad').val();
		datos.sexo = ($('#formClienteView #sexoMasculino').prop("checked"))?'M':'F';
		datos.telefono = $('#formClienteView #telefono').val();
		var fecha = $('#formClienteView #inputFecha').datepicker('getDate');
		datos.fechaNacimiento = fecha.toISOString();
		// Y retorno un objeto plano con todos los datos
		return datos;
	}

	// EJECUCIÓN
	_init();

	// RETORNO
	return {
		generar: _generar,
		mostrar: _mostrar,
		ocultar: _ocultar,
		obtenerDatos: _obtenerDatos,
	}
})();