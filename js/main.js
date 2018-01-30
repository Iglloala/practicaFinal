// Defino el módulo principal de mi aplicación
var CrudClientes = (function(){
	// PROPIEDADES DEL MÓDULO
	var _conf = {
		urlApi: "http://localhost/dwc/PROFESOR/API/",
	}

	// MÉTODOS DEL MÓDULO
	function comprobarDependencias(){
		try {
			if (typeof jQuery == 'undefined') throw new Error('No se ha cargado la librería jQuery');
			if (typeof Handlebars == 'undefined') throw new Error('No se ha cargado la librería Handlebars');
			if (typeof bootstrap == 'undefined') throw new Error('No se ha cargado la librería bootstrap');
			if (typeof ClienteList == 'undefined') throw new Error("No se ha cargado el módulo ClienteList");
			if (typeof ClienteListView == 'undefined') throw new Error("No se ha cargado el módulo ClienteListView");
			if (typeof ClienteView == 'undefined') throw new Error("No se ha cargado el módulo ClienteView");
			if (typeof PubSub == 'undefined') throw new Error("No se ha cargado el módulo PubSub");
			return true;
		}
		catch(e) {
			console.error(e.message);
			return false;
		}
	}

	// HELPERS HANDLEBARS 
	// Registro un helper para cambiar cómo se muestra la fecha
	Handlebars.registerHelper('transformarFecha', function(fechaOriginal){
		var regexp = /(\d{4})-(\d{2})-(\d{2}) (\d{2}:\d{2}:\d{2})/g;
		var coincidencias = regexp.exec(fechaOriginal);
		if (fechaOriginal!="" && coincidencias.length>=4){
			var fechaTransformada =  coincidencias[3] + "/" + coincidencias[2] + "/" + coincidencias[1] ;
			return fechaTransformada;
		}
		else{
			return fechaOriginal;
		}
	});

	// EVENTOS
	//- btNuevoCliente
	$('#contenido').on('click', '#btNuevoCliente', function(event){
		// Genera un ClienteView sin datos
		ClienteView.generar();
		// Y muestra el modal
		ClienteView.mostrar();
	});
	// btModificarCliente
	$('#contenido').on('click', '#btModificarCliente', function(event){
		// Pillo el id del cliente que se pretende modificar
		var idCliente = $(event.currentTarget).parent().parent().attr('data-id');
		// Pillo el cliente que tiene ese id
		var clienteObjetivo = ClienteList.buscarCliente(idCliente);
		// Le pido a ClientView que regenere el modal
		ClienteView.generar(clienteObjetivo);
		// Y que abra el modal
		ClienteView.mostrar();
	});
	// btEliminarCliente
	$('#contenido').on('click', '#btEliminarCliente', function(event){
		// Pillo el id del cliente que se pretende eliminar
		var idCliente = $(event.currentTarget).parent().parent().attr('data-id');
		// Pillo el cliente que tiene ese id
		var clienteObjetivo = ClienteList.buscarCliente(idCliente);
		// Y llamo a ClientList para que lo elimine
		ClienteList.eliminarCliente(clienteObjetivo);
		// Y regenero la vista de ClientListView
		ClienteListView.generar(ClienteList.listaClientes);
	});
	// btEnviarNuevo
	$('#contenido').on('click', '#btEnviarNuevo', function(event){
		// Recupera los datos del formulario
		var datos = ClienteView.obtenerDatos();
		// Los convierte en un objeto Cliente
		var nuevoCliente = new Factory.Cliente(datos);
		// Los manda a insertar
		ClienteList.insertarCliente(nuevoCliente);
		// Y cierra la ventana modal
		ClienteView.ocultar();
	});
	// btEnviarModificar
	$('#contenido').on('click', '#btEnviarModificar', function(event){
		// Recupera los datos del formulario
		var datos = ClienteView.obtenerDatos();
		// Los convierte en un objeto Cliente
		var nuevoCliente = new Factory.Cliente(datos);
		// Los manda a modificar
		ClienteList.modificarCliente(nuevoCliente);
		// Y cierra la ventana modal
		ClienteView.ocultar();
	});

	// EJECUCIÓN
	// Compruebo que se hayan cargado el resto de módulos
	if (comprobarDependencias()) {
		// Inicializo ClienteList pasándole la url de configuración
		ClienteList.init(_conf.urlApi);	
	}
	
	
	// Objeto devuelto por el módulo
	return {
		conf: _conf,
	};
})();