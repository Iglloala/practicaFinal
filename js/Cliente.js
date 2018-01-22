var Cliente = (function(id, nombres, ciudad, sexo, telefono, fecha_nacimiento){
	// Defino las propiedades
	this._id = id;
	this._nombres = nombres;
	this._ciudad = ciudad;
	this._sexo = sexo;
	this._telefono = telefono;
	this._fecha_nacimiento = fecha_nacimiento;

	// Retorna un objeto cliente
	return {
		id: this._id,
		nombres:this. _nombres,
		ciudad: this._ciudad,
		sexo: this._sexo,
		telefono: this._telefono,
		fecha_nacimiento: this._fecha_nacimiento
	}
})