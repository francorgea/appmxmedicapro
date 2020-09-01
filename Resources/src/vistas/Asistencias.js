
function Asistencias() {  
 
  var BotonListado = require("src/common/BotonListado");
  
//  var Ambulancia   = require("src/common/asistenciaAmbulancia");
//  var Emergencia   = require("src/common/asistenciaEmergencia");
  var Button = require("/src/common/Button");
 
  var contenedor = Ti.UI.createView({
      top: 0, 
      width: Ti.UI.FILL,
      height: Ti.UI.FILL,
      backgroundImage: '/images/fondos/fondo.png'
  });  
  
  var logo = Ti.UI.createImageView({
	  			image: 'images/logo.png',
	  			height: '15%',
	  			width: '25%',
	  			top: '5%',
	  			right: 15
  });
  contenedor.add(logo);
  
  var scrollBotones = Ti.UI.createScrollView({
	     top: '52%',
	     height: Ti.UI.FILL,
	     width: Ti.UI.FILL,
  });
  contenedor.add(scrollBotones);

  var contenedorBotones = Ti.UI.createView({
	  			width: Ti.UI.FILL,
	  			height: Ti.UI.SIZE,
	  			layout: "vertical",
//	  			borderColor: "blue"
  });
  
  //Boton Medica
		var btnMedica = new Button("ASISTENCIA MÉDICA",params.color1,'80%');    
  btnMedica.addEventListener("click", function(){
	     var asistencia =  require("/src/common/asistenciaMedica");
      PedirAsistencia( "Asistencia Médica", "/images/icoMedica.png", asistencia.servicios(), false  );
  });
  contenedorBotones.add(btnMedica);
  contenedorBotones.add(Ti.UI.createView( {height:10} ));
  
  //Boton Dental
		var btnDental = new Button("ASISTENCIA DENTAL",params.color1,'80%');    
  btnDental.addEventListener("click", function(){
      var asistencia =  require("/src/common/asistenciaDental");
      PedirAsistencia( "Asistencia Dental", "/images/icoDental.png", asistencia.servicios(), false  );
  });
  contenedorBotones.add(btnDental);
  contenedorBotones.add(Ti.UI.createView( {height:10} ));
  
  //Boton Optica
  var btnOptica = new Button("ASISTENCIA ÓPTICA",params.color1,'80%');    
  btnOptica.addEventListener("click", function(){
	  			var asistencia =  require("/src/common/asistenciaOptica");
      PedirAsistencia( "Asistencia Optica", "/images/icoOptica.png", asistencia.servicios(), false  );
  });
  contenedorBotones.add(btnOptica);
  contenedorBotones.add(Ti.UI.createView( {height:10} ));
  
  //Boton Veterinaria
  var btnVeterinaria = new Button("ASISTENCIA VETERINARIA",params.color1,'80%');    
  btnVeterinaria.addEventListener("click", function(){
	  		 var asistencia =  require("/src/common/asistenciaVeterinaria");
      PedirAsistencia( "Asistencia Veterinaria", "/images/icoVeterinaria.png", asistencia.servicios(), false  );
  });
  contenedorBotones.add(btnVeterinaria);
  contenedorBotones.add(Ti.UI.createView( {height:10} ));
  
  //Boton Funeraria
  var btnFuneraria = new Button("ASISTENCIA FUNERARIA",params.color1,'80%');    
  btnFuneraria.addEventListener("click", function(){
	  			var asistencia =  require("/src/common/asistenciaFuneraria");
      PedirAsistencia( "Asistencia Funeraria", "/images/icoFuneraria.png", asistencia.servicios(), false  );
  });
  contenedorBotones.add(btnFuneraria);
  contenedorBotones.add(Ti.UI.createView( {height:10} ));  
  
  //Boton Funeraria
  var btneDoctor = new Button("e-Doctor",params.color1,'80%');    
  btneDoctor.addEventListener("click", function(){
      var edoctorgea = "edoctorgea://";
       if(params.isAndroid){
           try{
               var intent = Ti.Android.createIntent({
                   action: Ti.Android.ACTION_MAIN,
                   className: "videoconference.geainternacional.com.telemedicina.activities.PresentacionActivity",
                   packageName: "videoconference.geainternacional.com.telemedicina",
               });
               intent.addCategory(Ti.Android.CATEGORY_LAUNCHER);
               intent.setFlags(Ti.Android.FLAG_ACTIVITY_NEW_TASK);
               Ti.Android.currentActivity.startActivity(intent);    
           }    
           catch(e){
               Titanium.Platform.openURL(params.URLedoctorANDROID);              
           }             
       }
       else{
	       		Titanium.Platform.openURL(params.URLedoctorIOS);
/*	       		 
          try{
            var resultado = Titanium.Platform.openURL(edoctorgea);
            Ti.API.info("*** Resultado de lanzar: " + resultado );
            if(!resultado){
              Titanium.Platform.openURL(params.URLedoctorIOS);  
            }
          }
          catch(e){
            Ti.API.info("*** No se pudo conectar");
            Titanium.Platform.openURL(params.URLedoctorIOS);
          }
*/        
       }
  });
  contenedorBotones.add(btneDoctor);
  
  scrollBotones.add(contenedorBotones);
    
  return contenedor;
}
module.exports = Asistencias;

/*
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
		
  contieneLogoMenu.add(btnMedica);
		contieneLogoMenu.add(espacioMini);
		
  contieneLogoMenu.add(espacioMini);
  
  contieneLogoMenu.add(espacioMini);
	
	*/


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
