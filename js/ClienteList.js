var ClienteList = (function(){
	// PROPIEDADES
	var that = this;
	var _listaClientes=[];
	var _urlApi;

	// MÉTODOS
	var _init = function(urlApi){
		// Define la url de la api
		_urlApi = urlApi;
		_cargarClientes();
		// Se subscribe a eventos
		PubSub.subscribe("btPulsado/modificar", _buscaParaModificar);
		PubSub.subscribe("btPulsado/eliminar", _buscaParaEliminar);
		PubSub.subscribe("generado/nuevoClienteInsertar", _insertarCliente);
		PubSub.subscribe("generado/nuevoClienteModificar", _modificarCliente);
	}

	// _actualizarListado: Recibe como parámetro la respuesta de la api, la convierte en un 
	// array de objetos cliente y define o actualiza la propiedad listaClientes del módulo
	var _actualizarListado = function(respuesta){
		return function(){
			var respuestaJSON = JSON.parse(respuesta);
			_listaClientes.length = 0; // vacío el array sin perder su referencia
			for (indice in respuestaJSON){
				// Creo un objeto cliente
				var cliente = new Factory.Cliente(respuestaJSON[indice]);
				// Lo añado a _listaClientes
				_listaClientes.push(cliente)
			}
		}(that); // Aquí hago un closure para tener disponible la referencia a _listaClientes
	}
	
	// _cargarClientes: Método que ejecuta una petición AJAX a la API establece el listado de clientes inicial
	var _cargarClientes = function(){
		var jqxhr = $.ajax({url:_urlApi+"/consulta.php", method:'POST'});
		jqxhr.done(function(respuesta){
			_actualizarListado(respuesta);
			// Publico la carga inicial de clientes
			PubSub.publish('carga/inicial', {clientes: _listaClientes});
		});
	}

	// Función para recuperar un cliente mediante su id
	var _buscarCliente = function(id){
		// Empieza a buscar
		var indiceCorrecto = -1;
		for (var i=0; i<_listaClientes.length; i++){
			if (_listaClientes[i].id == id){
				indiceCorrecto = i;
				break;
			}
		}
		return (indiceCorrecto != -1)?_listaClientes[indiceCorrecto]:false;
	}

	// Función que busca un cliente y lo publica para modificar
	var _buscaParaModificar = function(id){
		// Busca el cliente
		var cliente = _buscarCliente(id);
		if (cliente){
			// Y entonces lo publica para modificar
			PubSub.publish('clienteEncontrado/modificar', cliente);
		}
	}

	// Función que busca un cliente y lo publica para eliminar
	var _buscaParaEliminar = function(id){
		// Busca el cliente
		var cliente = _buscarCliente(id)
		if (cliente){
			// Y entonces llama a _eliminarCliente con dicho cliente
			_eliminarCliente(cliente);
		}
	}

	// Función para insertar un nuevo cliente
	var _insertarCliente = function(cliente) {
		console.log('Insertando cliente');
		// Modifico el objeto cliente para que tenga una propiedad 'submit' y una propiedad
		// 'alternativas' con el valor del sexo
		cliente.submit = 'submit';
		cliente.alternativas = cliente.sexo;
		// Tb lo modifico para que la fecha tenga el formato correcto: yyyy-mm-dd hh:mm:ss
		// Intenta insertarlo en la bbdd mediante petición ajax
		var jqxhr = $.ajax({url:_urlApi+"nuevo.php", data:cliente, method:'POST'});
		var that = this;
		jqxhr.done(function(respuesta){
			console.log('Cliente insertado en la bbdd');
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
	var _eliminarCliente = function(cliente){
		console.log('Eliminando cliente id:' + cliente.id);
		// Empiezo una peticion ajax (POR POST PARA PASAR EL ID)
		var jqxhr = $.ajax({url:_urlApi+'eliminar.php', data:{id:cliente.id}, method:'POST'});
		jqxhr.done(function(respuesta){
			// Si la 'respuesta' termina con 'correctamente' pues que notifique de la eliminacion
			if (respuesta.indexOf('correctamente') != -1){
				console.log('Cliente eliminado');
				// Busca en el listado un cliente con el cliente.id y lo elimina del array
				var indice;
				for (var i=0; i<_listaClientes.length; i++){
					if (_listaClientes[i].id == cliente.id){
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
	var _modificarCliente = function(cliente){
		console.log('Modificando cliente con id:' + cliente.id);
		// Ahora construyo los datos de la petición:
		// <Los de un cliente> + submit + sexo=alternativas
		var data = {
			submit:'submit',
			cliente_id: cliente.id,
			nombres: cliente.nombres,
			ciudad: cliente.ciudad,
			alternativas: cliente.sexo,
			telefono: cliente.telefono,
			fecha_nacimiento: cliente.fecha_nacimiento,
			direccion: cliente.direccion,
			provincia: cliente.provincia,
			fecha_alta: cliente.fecha_alta,
		}
		// Y ejecuto la petición por post
		var jqxhr = $.ajax({url:_urlApi+'actualizar.php', data:data, method:'POST'});
		// Si devuelve algo
		jqxhr.done(function(respuesta){
			// Aquí hay que comprobar si la respuesta es un listado de clientes json
			// o si por el contrario es un json con un array asociativo con indice 'error' WTF!?
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

	// RETORNO
	return {
		init: _init,
	}
})();