var ClienteList = (function(){
	// Propiedades
	var that = this;
	var _listaClientes=[];
	var _urlApi;

	// Métodos
	var _init = function(urlApi){
		// Define la url de la api
		_urlApi = urlApi;
		_cargarClientes();
	}

	// _crearCliente: Método factory que retorna un objeto Cliente
	var _crearCliente = function(id, nombres, ciudad, sexo, telefono, fecha_nacimiento){
		return {
			id: id,
			nombres: nombres,
			ciudad: ciudad,
			sexo: sexo,
			telefono: telefono,
			fecha_nacimiento: fecha_nacimiento
		}
	}

	// _actualizarListado: Recibe como parámetro la respuesta de la api, la convierte en un 
	// array de objetos cliente y define o actualiza la propiedad listaClientes del módulo
	var _actualizarListado = function(respuesta){
		return function(){
			var objetoClientes = JSON.parse(respuesta);
			_listaClientes.length = 0; // vacío el array sin perder su referencia
			for (indice in objetoClientes){
				var cliente = objetoClientes[indice];
				_listaClientes.push(cliente)
			}
		}(that); // Aquí hago un closure para tener disponible la referencia a _listaClientes
	}
	
	// _cargarClientes: Método que ejecuta una petición AJAX a la API establece el listado de clientes inicial
	var _cargarClientes = function(){
		var jqxhr = $.ajax({url:_urlApi+"/consulta.php"});
		jqxhr.done(function(respuesta){
			_actualizarListado(respuesta);
			// Publico la carga inicial de clientes
			PubSub.publish('carga/inicial', {clientes: _listaClientes});
		});
	}

	// Función para buscar el índice de un cliente mediante su id
	var _buscarCliente = function(id){
		for (cliente in this.listaClientes){
			if (that.listaClientes[cliente].id == id){
				return cliente;
			}
		}
		return false;
	}

	// Función para insertar un nuevo cliente
	var _insertarCliente = function(datosCliente) {
		console.log('Insertando cliente');
		// Modifico el objeto datosCliente para que tenga una propiedad 'submit' y una propiedad
		// 'alternativas' con el valor del sexo
		datosCliente.submit = 'submit';
		datosCliente.alternativas = datosCliente.sexo;
		datosCliente.fecha_nacimiento = datosCliente.fechaNacimiento;
		// Intenta insertarlo en la bbdd mediante petición ajax
		var jqxhr = $.ajax({url:_urlApi+"nuevo.php", data:datosCliente, method:'POST'});
		var that = this;
		jqxhr.done(function(respuesta){
			console.log('Cliente insertado en la bbdd:\n'+respuesta);
			// Y como no hay manera de obtener de forma fiable el id del nuevo cliente
			// insertado pues actualizo la 'listaClientes' machacando su valor anterior
			// por el nuevo listado que devuelve nuevo.php
			_actualizarListado(respuesta);
			//Publico la inserción
			PubSub.publish("cliente/insertado", {clientes:_listaClientes});
		})
		jqxhr.fail(function(){
			console.log('No se ha podido insertar el cliente en la bbdd');
		})
	}

	// Función para eliminar un cliente
	var _eliminarCliente = function(idCliente){
		console.log('Eliminando cliente id:' + idCliente);
		// Empiezo una peticion ajax (POR GET PARA PASAR EL ID)
		var jqxhr = $.ajax({url:_urlApi+'eliminar.php', data:{id:idCliente}, method:'GET'});
		jqxhr.done(function(respuesta){
			// Si la 'respuesta' termina con 'correctamente' pues que notifique de la eliminacion
			if (respuesta.indexOf('correctamente') != -1){
				console.log('Cliente eliminado');
				// Busca en el listado un cliente con el idCliente y lo elimina del array
				var indice;
				for (var i=0; i<_listaClientes.length; i++){
					if (_listaClientes[i].id == idCliente){
						indice = i;
						break;
					}
				}
				_listaClientes.splice(indice, 1);
				//Publico la eliminación
				PubSub.publish("cliente/eliminado", {clientes:_listaClientes});
			}
			// Si no, pues notifica de error
			else {
				console.log('Error al eliminar el cliente');
			}		
		});
		jqxhr.fail(function(respuesta){
			console.log('No se ha podido eliminar el cliente');
		});
	}

	// Función para modificar un cliente
	var _modificarCliente = function(datosCliente){
		console.log('Modificando cliente con id:' + datosCliente.id);
		// Ahora construyo los datos de la petición:
		// <Los de un cliente> + submit + sexo=alternativas + fechaNacimiento=fecha_nacimiento
		var data = {
			submit:'submit',
			cliente_id: datosCliente.id,
			nombres: datosCliente.nombres,
			ciudad: datosCliente.ciudad,
			alternativas: datosCliente.sexo,
			telefono: datosCliente.telefono,
			fecha_nacimiento: datosCliente.fechaNacimiento,
		}
		// Y ejecuto la petición por post
		var jqxhr = $.ajax({url:_urlApi+'actualizar.php', data:data, method:'POST'});
		// Si devuelve algo
		jqxhr.done(function(respuesta){
			// Aquí hay que comprobar si la respuesta es un listado de clientes json
			// o si por el contrario es un json con un array asociativo con indice 'error' WTF!?
			console.log(respuesta);
			// Si ha devuelto error informo
			if (respuesta.indexOf('error') != -1){
				console.log('Error al actualizar el cliente' );
			}
			// Si no ha devuelto error pues actualizo listaClientes
			else {
				console.log("El cliente ha sido actualizado correctamente");
				_actualizarListado(respuesta);
				// Y publico la modificación
				PubSub.publish("cliente/modificado", {clientes:_listaClientes});
			}
		});
		// Si falla la peticion
		jqxhr.fail(function(respuesta){
			console.log('No se ha podido modificar el cliente');
		});
	}

	// Retorno
	return {
		listaClientes: _listaClientes,
		init: _init,
		//cargarClientes : _cargarClientes, // igual sobra
		insertarCliente: _insertarCliente,
		//buscarCliente: _buscarCliente, // igual sobra
		crearCliente: _crearCliente,
		eliminarCliente: _eliminarCliente,
		modificarCliente: _modificarCliente
	}
})();