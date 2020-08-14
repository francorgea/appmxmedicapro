//Application Window Component Constructor
function GenericWindowSolicitar( cerrar, textoTitulo, imagen ) {
  

	//create component instance
	var self = Ti.UI.createWindow({
 	  orientationModes: [ Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT],
  		backgroundColor: params.color12,
  		navBarHidden:true,
  		exitOnClose:false,
  		fullscreen:true
	});
	

	//create object instance, a parasitic subclass of Observable
	var barraTitulo = Ti.UI.createView({
 	   top: 0,
 	   backgroundColor: params.color1,
 	   width: Ti.UI.FILL,
 	   height: '15%'
	});
	/*
	var imgFondo = Ti.UI.createImageView({
 	   top: 0,
 	   image: "/images/fondos/fondotitulo.png",
 	   width: Ti.UI.FILL,
 	   height: Ti.UI.FILL
	});
	barraTitulo.add(imgFondo);
	*/
	var iconito = Ti.UI.createImageView({  
 	   top: '30%',
 	   height: '22%',
 	   image: imagen
	});
	barraTitulo.add(iconito);
	var titulo = Ti.UI.createLabel({
 	    top: '55%',
 	   text: textoTitulo,
 	   color: params.color7,
 	   font: { fontFamily: params.fuente_primaria, fontSize: 18 }
	});
	barraTitulo.add(titulo);
	self.add(barraTitulo);





	// Colocar el titulo
	if(cerrar=="S"){
 	 var vistaCerrar = Ti.UI.createImageView({ left: 8,  width: 20, height: 20, image:  "/images/btnRegresar.png" });
 	 vistaCerrar.addEventListener("click", function(){ self.close({animate:true}); });
 	 barraTitulo.add(vistaCerrar); 
	}
	
	
	
	return self; 

}

//make constructor function the public component interface
module.exports = GenericWindowSolicitar;