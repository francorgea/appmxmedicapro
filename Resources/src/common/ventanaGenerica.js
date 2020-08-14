//Application Window Component Constructor
function GenericWindow( cerrar, textoTitulo ) {
  

	//create component instance
	var self = Ti.UI.createWindow({
 	  orientationModes: [ Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT],
  		backgroundColor: params.color12,
  		navBarHidden:true,
  		exitOnClose:false,
  		fullscreen:true
	});
	
  var objBarraTitulo = require("/src/common/BarraTitulo");
  var barraTitulo    = new objBarraTitulo(textoTitulo);
  self.add(barraTitulo);	

	// Colocar el titulo
	if(cerrar=="S"){
 	 var vistaCerrar = Ti.UI.createImageView({ height: Ti.UI.FILL, width: '15%', left: 0 });  	 
 	 var imgCerrar = Ti.UI.createImageView({ left: (params.iPhoneX ) ? 15 : 8,  width: 30, height: 30, image:  "/images/btnRegresar.png" });
 	 barraTitulo.add(imgCerrar);
 	 vistaCerrar.addEventListener("click", function(){ self.close({animate:true}); });
 	 barraTitulo.add(vistaCerrar);
	}
	
	
	
	return self; 

}

//make constructor function the public component interface
module.exports = GenericWindow;