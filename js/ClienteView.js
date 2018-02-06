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

	// Eventos para disparar la api geocoding y generar un mapa para incluir en la ventana modal
	$('#contenido').on('change', '#formClienteView #direccion', _cargarMapa);
	//$('#contenido #formClienteView #direccion').on('load', _cargarMapa);

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
		_bloqueContenido.find('#inputFecha').datepicker({changeYear:'true', changeMonth:'true', yearRange:'1900:2018', dateFormat:'dd/mm/yy'});
		_bloqueContenido.find('#fecha_alta').datepicker({changeYear:'true', changeMonth:'true', yearRange:'1900:2018', dateFormat:'dd/mm/yy'});
		// Y llama a _mostrar para que se vea el modal
		_mostrar();
	}

	// Función que muestra la ventana modal de ClienteView
	function _mostrar(){
		_bloqueContenido.find('#clienteView').modal("show");
		// Añado un pequeño timeout xq si no a veces no carga bien el mapa
		setTimeout(function(){
			// Si existe una dirección en la ventana modal, llamo a _cargarMapa
			if ($('#formClienteView #direccion').val() !== ""){_cargarMapa()}
		}, 200);
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
		var fechaNac = $('#formClienteView #inputFecha').val(); // Pillo la fecha tal cuál
		fechaNac = fechaNac.split("/").reverse().join("-"); // Le da la vuelta y la une con '-'
		datos.fecha_nacimiento = fechaNac + " 00:00:00"; // Le añade la hora
		datos.direccion = $('#formClienteView #direccion').val();
		datos.provincia = $('#formClienteView #provincia').val();
		if ($('#formClienteView #fecha_alta').length){
			var fechaAlt = $('#formClienteView #fecha_alta').val(); // Pillo la fecha tal cuál
			fechaAlt = fechaAlt.split("/").reverse().join("-"); // Le da la vuelta y la une con '-'
			datos.fecha_alta = fechaAlt + " 00:00:00"; // Le añade la hora
		}
		// Y retorno un objeto plano con todos los datos
		return datos;
	}

	function _cargarMapa(){
		// Preparo los datos
		var contenedor = $('#wrapper-mapa');
		var calle = $('#formClienteView #direccion').val();
		var ciudad = $('#formClienteView #ciudad').val();
		var provincia = $('#formClienteView #provincia').val();
		var address = calle + " " + ciudad + " " + provincia;
		var key = "AIzaSyD8QjUGg_tSHL7Nxk6L-30jt6nOb_conGU";
		var language = "es";
		var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+encodeURI(address)+"&language="+language+"&key="+key;
		// Inicio una petición ajax
		var jqxhr = $.ajax({url:url});
		jqxhr.done(function(respuesta){
			// Si la respuesta es válida tiene que generar un mapa de google
			if (respuesta.status == "OK"){
				// Obtengo las coordenadas
				var lat = respuesta.results[0].geometry.location.lat;
				var lng = respuesta.results[0].geometry.location.lng;
				var coords = {lat: lat, lng: lng};
				// Preparo el contenedor
				contenedor.css("margin", "5px 0");
				contenedor.css("width", "466px");
				contenedor.css("height", "233px");
				// Genero el mapa
				var mapa = new google.maps.Map(contenedor[0], 
					{
						zoom:17, 
						center:coords, 
						disableDefaultUI: true,
					});
				var marcador = new google.maps.Marker({position:coords, map:mapa});
			}
			// Si no que informe de que no se encuentra la dirección
			else {
				var mensaje = $('<p>').append("No se ha podido localizar la dirección");
				contenedor.html(mensaje);
			}
		});
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