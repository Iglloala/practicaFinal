// Defino el módulo principal de mi aplicación
var CrudClientes = (function(){
	// PROPIEDADES
	var _conf = {
		urlApi: "http://localhost/dwc/APIextendida/",
	}

	// MÉTODOS
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
	// No hay eventos ya que todo se dispara mediante PubSub y/o en sus respectivas vistas

	// EJECUCIÓN
	// Compruebo que se hayan cargado el resto de módulos
	if (comprobarDependencias()) {
		// Inicializo ClienteList pasándole la url de configuración
		ClienteList.init(_conf.urlApi);	
	}
	
	
	// RETORNO
	return {
		conf: _conf,
	};
})();