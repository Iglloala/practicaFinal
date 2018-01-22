var PubSub = (function(){
	// defino topics como objeto vacío
	var topics = {};
	// creamos un alias para topics.hasOwnProperty
	var hOP = topics.hasOwnProperty;
	// El retorno del módulo
	return {
		// Método subscribe
		subscribe: function(topic, listener){
			// Creamos el objeto 'topic' si no está creado
			if(!hOP.call(topics, topic)){
				topics[topic] = [];
			}
			// Añadimos el listener a la cola, siendo topic el nombre del evento
			// Aquí el -1 es para quedarse con el índice del listener que acabamos de meter y no el tamaño actualizado del array
			var index = topics[topic].push(listener) -1;
			// Y el subscribe pues retorna la función para eliminar la subscripción
			return {
				remove: function(){
					delete topics[topic][index];
				}
			};
		},
		// Método publish
		publish: function(topic, info){
			// Si el 'topic' no existe o no hay subscribers en la cola pues return sin hacer nada
			if (!hOP.call(topics, topic)){
				return;
			}
			// Si no pues ya itera sobre los topics y dispara los eventos
			topics[topic].forEach(function(item){
				// "item" será una función que hemos publicado para que se dispare
				// "info" serán los datos que hemos pasado, u objeto vacío si no hay datos
				item(info!=undefined ? info : {});
			});
		},
		topics: topics
	};
})();