var ClienteList = (function(){
	// Propiedades
	var that = this;

	// Métodos
	function _init(urlApi){
		// Define la url de la api
		this._urlApi = urlApi;
		this.cargarClientes();
	}

	// crearCliente: Método factory que retorna un objeto Cliente
	function _crearCliente(id, nombres, ciudad, sexo, telefono, fecha_nacimiento){
		return {
			id: id,
			nombres: nombres,
			ciudad: ciudad,
			sexo: sexo,
			telefono: telefono,
			fecha_nacimiento: fecha_nacimiento
		}
	}

	// _cargarClientes: Método que ejecuta una petición AJAX a la API establece el listado de clientes inicial
	var _cargarClientes = function(){
		jqxhr = $.ajax({url: this._urlApi+"/consulta.php", async: false});
		var that = this;
		jqxhr.done(function (respuesta){
			console.log('Cargando clientes')
			that.listaClientes =  JSON.parse(respuesta);
		});
	}

	function readClientes(){

	}
	// Retorno
	return {
		init: _init,
		cargarClientes : _cargarClientes
	}
})();