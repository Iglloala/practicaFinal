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
	// EJECUCIÓN
	// Compruebo que se hayan cargado el resto de módulos
	if (comprobarDependencias()) {
		// Inicializo los modulos
		ClienteList.init(_conf.urlApi);
		
	}
	
	// Objeto devuelto por el módulo
	return {
		conf: _conf,
	};
})();