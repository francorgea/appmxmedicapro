
function Asistencias() {  
 
  var BotonListado = require("src/common/BotonListado");
  
  var Ambulancia   = require("src/common/asistenciaAmbulancia");
  var Emergencia   = require("src/common/asistenciaEmergencia");
  var Button = require("/src/common/Button");
 
  var contenedor = Ti.UI.createView({
      top: 0, 
      width: Ti.UI.FILL,
      height: Ti.UI.FILL,
      backgroundImage: '/images/fondos/fondo.png'
  });  
  
  var contieneLogoMenu = Ti.UI.createView({
      top: 0,
      width: Ti.UI.FILL,
      height: '100%',
      layout: 'vertical',
  });
  
  if(params.iPhoneX){
    contieneLogoMenu.add(Ti.UI.createView({height:30}));
  }

  contenedor.add(contieneLogoMenu);
  
  var espacioAlto = Ti.UI.createView({
      width: Ti.UI.FILL,
      height: '59.491%',
      bottom: 0,
  });
  
  var espacioMini = Ti.UI.createView({
      width: Ti.UI.FILL,
      height: '1.83%',
      bottom: 0,
  });
  //Largo de los botones de asistencia
		var largoBtn = '56%';
		//Espacio	Principal
  contieneLogoMenu.add(espacioAlto);
		//Boton Medica
		var btnMedica = new Button("ASISTENCIA MÉDICA",params.color1,largoBtn);    
  btnMedica.addEventListener("click", function(){
      PedirAsistencia( "Asistencia Médica", "/images/icoMedica.png", 'MEDICA', true  );
  });
  contieneLogoMenu.add(btnMedica);
		contieneLogoMenu.add(espacioMini);
		//Boton Dental
		var btnDental = new Button("ASISTENCIA DENTAL",params.color1,largoBtn);    
  btnDental.addEventListener("click", function(){
      PedirAsistencia( "Asistencia Dental", "/images/icoDental.png", 'DENTAL', true  );
  });
  contieneLogoMenu.add(btnDental);
  contieneLogoMenu.add(espacioMini);
  //Boton Optica
  var btnOptica = new Button("ASISTENCIA ÓPTICA",params.color1,largoBtn);    
  btnOptica.addEventListener("click", function(){
      PedirAsistencia( "Asistencia Optica", "/images/icoOptica.png", 'OPTICA', true  );
  });
  contieneLogoMenu.add(btnOptica);
  contieneLogoMenu.add(espacioMini);
  //Boton Veterinaria
  var btnVeterinaria = new Button("ASISTENCIA VETERINARIA",params.color1,largoBtn);    
  btnVeterinaria.addEventListener("click", function(){
      PedirAsistencia( "Asistencia Veterinaria", "/images/icoVeterinaria.png", 'VETERINARIA', true  );
  });
  contieneLogoMenu.add(btnVeterinaria);
  contieneLogoMenu.add(espacioMini);
  //Boton Funeraria
  var btnFuneraria = new Button("ASISTENCIA FUNERARIA",params.color1,largoBtn);    
  btnFuneraria.addEventListener("click", function(){
      PedirAsistencia( "Asistencia Funeraria", "/images/icoVeterinaria.png", 'FUNERARIA', true  );
  });
  contieneLogoMenu.add(btnFuneraria);
  contieneLogoMenu.add(espacioMini);
  
  return contenedor;
}
module.exports = Asistencias;




//
//
//     
function PedirAsistencia( texto, imagen, arreglo, lvial ){ 
   
   Ti.API.info("*** Nombre   : " + Utiles.obtenerOpcion('nombre') );
   Ti.API.info("*** Apellidos: " + Utiles.obtenerOpcion('apellidos') );
   Ti.API.info("*** Cédula   : " + Utiles.obtenerOpcion('cedula') );   
   
   if(Utiles.obtenerOpcion('cedula')=="" ){
      Utiles.Alerta("Por favor configure su perfil antes de solicitar asistencia, se requiere el campo CODIGO DE USUARIO.");
      return false; 
   }
   if(Utiles.obtenerOpcion('nombre')=="" ){
      Utiles.Alerta("Por favor configure su perfil antes de solicitar asistencia, se requiere el campo NOMBRE.");
      return false; 
   }
   if(Utiles.obtenerOpcion('apellidos')=="" ){
      Utiles.Alerta("Por favor configure su perfil antes de solicitar asistencia, se requiere el campo APELLIDOS.");
      return false; 
   }   
   
   // Iniciamos el monitoreo de coordenadas en caso de que el usuario acepte
   // los permisos correspondientes
   if(!Titanium.Geolocation.hasLocationPermissions( Titanium.Geolocation.AUTHORIZATION_ALWAYS ) && !Titanium.Geolocation.hasLocationPermissions( Titanium.Geolocation.AUTHORIZATION_WHEN_IN_USE )) {
       Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function(e) {
            Ti.API.info("*** E");
            if(e.success){
               Ti.API.info("*** F");
               Titanium.Geolocation.addEventListener('location', getLocation );
               IniciarProceso();
            }
            else{
               Ti.API.info("*** G");
               IniciarProceso();
            }
        }) ;    
   }     
   else{
      Titanium.Geolocation.addEventListener('location', getLocation );
      IniciarProceso();
   }
   
   
   Ti.API.info("Adentro!!");
   
   
   function IniciarProceso() {
      var GenericWindowSolicitar = require("src/common/ventanaGenericaSolicitar");   
      var win = new GenericWindowSolicitar("S",texto,imagen);
      var vista = require("src/vistas/solicitar");
      vista.Solicitar( win, texto, arreglo, lvial );  	      	    
      win.open();               
   }
   
} 

//
//
//
function getLocation(){
  Utiles.getLocation();
}

//
//
//
function MostrarExplicacion( dirfondo ){
 
 var fondo = "/images/fondos/" + dirfondo + "/fondo.jpg";
  
	var win = Ti.UI.createWindow({
 	orientationModes: [ Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT],
 	backgroundColor: params.color1,
		navBarHidden:true,
		exitOnClose:false,
		fullscreen:true,
		backgroundImage: fondo
	});
	
	var vistaRegresar = Ti.UI.createView({
 	   width: '20%',
 	   height: '17%',
 	   left: 0, top: 0
	});
	vistaRegresar.add(Ti.UI.createImageView({ image: "/images/btnRegresar.png", width: 30, height: 30 }));
	vistaRegresar.addEventListener("click", function(){
 	   win.close();
	}); 
	win.add(vistaRegresar);

 win.open();   
  
}
