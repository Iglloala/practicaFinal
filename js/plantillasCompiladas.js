(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['cliente'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "						Modificar cliente\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "						Nuevo cliente\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div  id='clienteView' class=\"modal fade\">\r\n	<div class=\"modal-dialog\">\r\n		<div class=\"modal-content\">\r\n			<div class=\"modal-header\">\r\n				<h5 class=\"modal-title\" id=\"exampleModalLabel\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "				</h5>\r\n		        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Cerrar\">\r\n		          <span aria-hidden=\"true\">&times;</span>\r\n		        </button>\r\n			</div>\r\n			<div class=\"modal-body\">\r\n				<form action=\"\">\r\n					<!-- id -->\r\n					<input type=\"hidden\" name='id' value="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ">\r\n					<!-- Nombres -->\r\n					<div class=\"form-group\">\r\n						<label for=\"nombres\">Nombres</label>\r\n						<input type=\"text\" class=\"form-control\" name='nombres' value=\""
    + alias4(((helper = (helper = helpers.nombres || (depth0 != null ? depth0.nombres : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nombres","hash":{},"data":data}) : helper)))
    + "\">\r\n					</div>\r\n					<!-- Ciudad -->\r\n					<div class=\"form-group\">\r\n						<label for=\"ciudad\">Ciudad</label>\r\n						<input type=\"text\" class=\"form-control\" name='ciudad' value=\""
    + alias4(((helper = (helper = helpers.ciudad || (depth0 != null ? depth0.ciudad : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ciudad","hash":{},"data":data}) : helper)))
    + "\">\r\n					</div>\r\n					<!-- Sexo -->\r\n					<div class=\"form-group\">\r\n						<label for=\"\">Sexo</label>\r\n						<div class=\"form-group\">\r\n							<div class=\"form-check form-check-inline\">\r\n								<input id='sexoMasculino' type=\"radio\" class=\"form-check-input\" name='sexo' value='M' "
    + ((stack1 = (helpers.marcarRadiobutton || (depth0 && depth0.marcarRadiobutton) || alias2).call(alias1,"M",(depth0 != null ? depth0.sexo : depth0),{"name":"marcarRadiobutton","hash":{},"data":data})) != null ? stack1 : "")
    + ">\r\n								<label for=\"sexoMasculino\" class=\"form-check-label\">Masculino</label>\r\n								&nbsp;\r\n								<input id='sexoFemenino' type=\"radio\" class=\"form-check-input\" name='sexo' value='F' "
    + ((stack1 = (helpers.marcarRadiobutton || (depth0 && depth0.marcarRadiobutton) || alias2).call(alias1,"F",(depth0 != null ? depth0.sexo : depth0),{"name":"marcarRadiobutton","hash":{},"data":data})) != null ? stack1 : "")
    + ">\r\n								<label for=\"sexoFemenino\" class=\"form-check-label\">Femenino</label>\r\n							</div>\r\n						</div>\r\n					</div>\r\n					<!-- Teléfono -->\r\n					<div class=\"form-group\">\r\n						<label for=\"nombres\">Teléfono</label>\r\n						<input type=\"text\" class=\"form-control\" name='telefono' value=\""
    + alias4(((helper = (helper = helpers.telefono || (depth0 != null ? depth0.telefono : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"telefono","hash":{},"data":data}) : helper)))
    + "\">\r\n					</div>\r\n					<!-- Fecha nacimiento -->\r\n					<div class=\"form-group\">\r\n						<label for=\"nombres\">Fecha nacimiento</label>\r\n						<input  id='inputFecha' type=\"text\" class=\"form-control\" name='fecha_nacimiento' value=\""
    + alias4(((helper = (helper = helpers.fechaNacimiento || (depth0 != null ? depth0.fechaNacimiento : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fechaNacimiento","hash":{},"data":data}) : helper)))
    + "\">\r\n					</div>\r\n				</form>\r\n			</div>\r\n			<div class=\"modal-footer\">\r\n				<!-- Controles -->\r\n				<button id=\"btEnviar\" class=\"btn btn-primary\">Enviar</button>				\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
},"useData":true});
templates['listaClientes'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "					<tr>\r\n						<td>"
    + alias4(((helper = (helper = helpers.nombres || (depth0 != null ? depth0.nombres : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nombres","hash":{},"data":data}) : helper)))
    + "</td>\r\n						<td>"
    + alias4(((helper = (helper = helpers.ciudad || (depth0 != null ? depth0.ciudad : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ciudad","hash":{},"data":data}) : helper)))
    + "</td>\r\n						<td>"
    + alias4(((helper = (helper = helpers.sexo || (depth0 != null ? depth0.sexo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sexo","hash":{},"data":data}) : helper)))
    + "</td>\r\n						<td>"
    + alias4(((helper = (helper = helpers.telefono || (depth0 != null ? depth0.telefono : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"telefono","hash":{},"data":data}) : helper)))
    + "</td>\r\n						<td>"
    + alias4(((helper = (helper = helpers.fechaNacimiento || (depth0 != null ? depth0.fechaNacimiento : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fechaNacimiento","hash":{},"data":data}) : helper)))
    + "</td>\r\n						<td>"
    + alias4(((helper = (helper = helpers.btEditar || (depth0 != null ? depth0.btEditar : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"btEditar","hash":{},"data":data}) : helper)))
    + alias4(((helper = (helper = helpers.btEliminar || (depth0 != null ? depth0.btEliminar : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"btEliminar","hash":{},"data":data}) : helper)))
    + "</td>\r\n					</tr>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id='fila-contenido' class=\"row\">\r\n	<div class=\"col-12\">\r\n		<button class='btn btn-primary' id='btNuevoCliente' style=\"margin: 1rem 0\">Nuevo Cliente</button>\r\n		<table class='table'>\r\n			<thead class='thead-dark'>\r\n				<tr>\r\n					<th>Nombres</th>\r\n					<th>Ciudad</th>\r\n					<th>Sexo</th>\r\n					<th>Teléfono</th>\r\n					<th>Fecha nacimiento</th>\r\n					<th>Controles</th>\r\n				</tr>\r\n			</thead>\r\n			<tbody>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.clientes : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</tbody>\r\n		</table>\r\n	</div>\r\n</div>";
},"useData":true});
})();