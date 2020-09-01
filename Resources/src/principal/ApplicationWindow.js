var barraIndicaActual;
var imgAsistencias;
var imgHistorial;
var imgLlamada;
var imgOpciones;
var txtAsistencias;
var txtHistorial;
var txtLlamada;
var txtOpciones;


//Application Window Component Constructor
function ApplicationWindow() {
	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*
 * @Incluyendo firebase
 * @author TAO
 * @param string 
 * @return
 *
*/   

	Ti.API.info('antes de firebase');
	
	var core = require('firebase.core');
	var isAndroid = Ti.Platform.osname === 'android';
	// Configure core module (required for all Firebase modules)
	core.configure();
	// Important: Include cloud messaging module after the initial configure()
	var fcm = require('firebase.cloudmessaging');
	// Called when the Firebase token is ready
	fcm.addEventListener('didRefreshRegistrationToken', onToken);
		Ti.API.info('antes de recive message');
	// Called when direct messages arrive. Note that these are different from push notifications
	fcm.addEventListener('didReceiveMessage', onMessage);
	Ti.API.info('@@@@@@@@@@@@@@@@@@@@@@@fin@@@@@@@@@@@@@@@@@@@@@@@');
	function onToken(e) {
	    Ti.API.info('FCM Token: ', e.fcmToken);
	    Utiles.grabarOpcion( "deviceToken", e.fcmToken );
	    Utiles.grabarOpcion( "token", e.fcmToken );   
	    Utiles.registrarEnServidor( e.fcmToken );  
	
	}
	
	function onMessage(e) {
			Ti.API.info("Notificacion recibida dentro de onmessage");
	//   procesarMensajeRecibido(e)
	}
	
	function procesarMensajeRecibido(e){
	
		// Se actualizan los servicios
		HistorialProcesos.Actualizar();
	
		if(isAndroid){
			// este se ejecuta cuando la app esta en primer plano
				var datos1 = fcm.lastData;
					Ti.API.info("Last data1: " + JSON.stringify(datos1));
	//				Ti.API.info("accion: " + datos1.message.cuerpo);
					Ti.API.info("!!!!!!!!!!!mensaje recibido!!!!!!!!!!!");		
					//Notificamos del push recibido en primer plano
					Utiles.Alerta("Mensaje: " + datos1.message.cuerpo);
		}
		else{
			Ti.API.info("inBackground" + e.inBackground);
			if(!e.inBackground  ){
				Utiles.Alerta("Mensaje: " + e.data.cuerpo);
			}
			
		}
		
			
	}
	
	 // Registramos los PUSH
	 if( isAndroid ) {
	
	     fcm.registerForPushNotifications();
	     // este se ejecuta cuando le das clic a la notificacion y la app esta en segundo plano
	    	Ti.API.info("Last data2: " + JSON.stringify(fcm.lastData));
	    	Ti.API.info("Notificacion recibida dentro Android1");
	    	//extra1 validar cuales son las variables que envia
	    	
	    	if (fcm.lastData.message !== undefined) {
	     	    //comentado ya que no actualmente no se hace ninguna accion cuando se recibe la notificacion push
	     	    // procesarMensajeRecibido(jsonAux);
	     	    Ti.API.info("INICIO: Notificacion recibida dentro Android2");
	     	    Utiles.Alerta(fcm.lastData.message.big_text);
	     	    Ti.API.info("FIN: Notificacion recibida dentro Android2");
	    	}
	}
	 else {
		
		  Ti.App.iOS.addEventListener('usernotificationsettings', function eventUserNotificationSettings() {
	        // Eliminamos el evento para eviar duplicidad al hacer el llamado de la api
	        Ti.App.iOS.removeEventListener('usernotificationsettings', eventUserNotificationSettings);
	        // registrado notificaciones push
	        Ti.Network.registerForPushNotifications({
	            success: function () { 
	                Ti.API.info("*** La app se ha registrado para recibir notificaciones");
	            },
	            error: function (e) { 
	                Ti.API.info("*** Error al registrar para notificaciones: " + e.error );
	            }, 
	            callback: function (e) { 
	                Ti.API.info("*** Aqui procesariamos las notifcicaciones recibidas");
	                Ti.API.info("Notificacion recibida dentro de IOS");
	                Ti.API.info("Evento: " + JSON.stringify(e));
	                procesarMensajeRecibido(e);
	            } 
	        });
	    });
		
		Ti.App.iOS.registerUserNotificationSettings({
			types:	[
						Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, 
						Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
						Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
					]
		});
	
	}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 // Process incoming push notifications
 function receivePush(e){
    var msg,cveexped,tipo_push;
    msg = (Ti.Platform.name =="android") ? e.alert : e.data.alert;
    tipo_push = (Ti.Platform.name =="android") ? e.tipo_push : e.data.tipo_push;
    cveexped  = (Ti.Platform.name =="android") ? e.cveexped  : e.data.cveexped ;
    Ti.API.info("*** msg      : " + msg );
    Ti.API.info("*** tipo_push: " + tipo_push);
    Ti.API.info("*** cveexped : " + cveexped );
    Ti.App.Properties.setString('ActualizarListadoAsistencias','S');
    if(!params.isAndroid){
     Titanium.UI.iOS.setAppBadge(0);
    }
 }
 // Save the device token for subsequent API calls
 function deviceTokenSuccess(e){
    var servidor;
    var deviceToken = e.deviceToken;
    Ti.API.info("*** Token: " + deviceToken );
    Utiles.grabarOpcion( "deviceToken", deviceToken );
    Utiles.registrarEnServidor(deviceToken);
 };
 function deviceTokenError(e){
    Ti.API.info("*** No se pudo registrar el token");
    Ti.API.info( e );
 };




	var win = Ti.UI.createWindow({
 	orientationModes: [ Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT],
 	backgroundColor: params.color3,
		navBarHidden:true,
		exitOnClose:true,
		fullscreen:true
	});
	win.addEventListener("open", function(){
   if( params.isAndroid ){
       var permissions = ['android.permission.CALL_PHONE'];
       Ti.Android.requestPermissions(permissions, function(e) {
           if (e.success) {
               Ti.API.info("Permiso concedidos");
           } else {
               Ti.API.info("Error al asignar permisos: " + e.error);
           }
       });  
   }   	
	})

  // Creamos el contenedor principal
 	var mainView = Ti.UI.createView({ width: Ti.UI.FILL, height: Ti.UI.SIZE });
 	win.add(mainView);
  

  MostrarPantallaPrincipal(mainView,win);


	return win;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;


/*
 *
 *
 *
 */
function MostrarPantallaPrincipal(mainView,win) {

   mainView.removeAllChildren();

   // Contenedor principal
   var contenedor = Ti.UI.createView({  top:0, bottom: '87%', width: Ti.UI.FILL, height: '87%' });

   // Creamos la vista de las asistencias
   var objAsistencias   = require("/src/vistas/Asistencias");
   var vistaAsistencias = new objAsistencias( mainView );

   // Creamos la vista del historial
   var objHistorial    = require("/src/vistas/Historial");
   var vistaHistorial  = new objHistorial( mainView );
   HistorialProcesos   = require("/src/vistas/HistorialProcesos");

   // Creamos la vista de la llamada
   var objLlamada = require("/src/vistas/Llamada");
   var vistaLlamada  = new objLlamada( mainView );

   // Creamos la vista de opciones
   var objOpciones = require("/src/vistas/Opciones");
   var vistaOpciones  = new objOpciones( mainView, win );


   //
   // creamos el controlador de paginas
   controlPaginas = Ti.UI.createScrollableView({
       scrollingEnabled: false,
       width: Ti.UI.FILL,
       height: Ti.UI.FILL,
       views: [ vistaAsistencias, vistaHistorial, vistaLlamada, vistaOpciones ],
       showPagingControl: false
   });
   contenedor.add(controlPaginas);

   mainView.add(contenedor);

   // Contenedor del menu
   var contenedorMenu = Ti.UI.createView({
       top: '87%',
       bottom: 0 ,
       width: Ti.UI.FILL,
       height: '13%',
       backgroundColor: params.color3,
   });
   mainView.add(contenedorMenu);
   
   // Construimos la barra que indicará
   // sobre que pestaña estamos
   barraIndicaActual = Ti.UI.createView({
       width: '90%',
       height: 3,
       backgroundColor: params.color1,
       bottom: 2,
   });
			
   // Asistencias   
   contieneAsistencias = Ti.UI.createView({ left: 0, width: '25%', height: Ti.UI.FILL, backgroundColor: params.color3, layout: 'vertical'  });
   contieneAsistencias.addEventListener("click", function(){  cambiarPagina(0); cambiarMenuActual(); })
   contieneAsistencias.add(Ti.UI.createView({height: 3}));
   imgAsistencias  = Ti.UI.createImageView({ image: "/images/botonesInferiores/btnAsistenciasOn.png", height: '55%' });
   contieneAsistencias.add(imgAsistencias);
   txtAsistencias = Ti.UI.createLabel({ text: 'Asistencias', font: { fontFamily: params.fuente, fontSize: 11 }, color: params.color1 });
   contieneAsistencias.add(txtAsistencias);
   contenedorMenu.add(contieneAsistencias);


   // Historial
   contieneHistorial = Ti.UI.createView({ left: '25%', width: '25%', height: Ti.UI.FILL, backgroundColor: params.color3, layout: 'vertical'   });
   contieneHistorial.addEventListener("click", function(){  cambiarPagina(1); cambiarMenuActual(); })
   contieneHistorial.add(Ti.UI.createView({height: 3})); 
   imgHistorial      = Ti.UI.createImageView({ image: "/images/botonesInferiores/btnHistorialOff.png", height: '55%' });
   contieneHistorial.add(imgHistorial);
   txtHistorial = Ti.UI.createLabel({ text: 'Historial', font: { fontFamily: params.fuente, fontSize: 11 }, color: params.color1 });
   contieneHistorial.add(txtHistorial);
   contenedorMenu.add(contieneHistorial);


   // Llamada
   contieneLlamada = Ti.UI.createView({ left: '50%', width: '25%', height: Ti.UI.FILL, backgroundColor: params.color3, layout: 'vertical'   });
   contieneLlamada.addEventListener("click", function(){  cambiarPagina(2); cambiarMenuActual(); })
   contieneLlamada.add(Ti.UI.createView({height: 3}));
   imgLlamada      = Ti.UI.createImageView({ image: "/images/botonesInferiores/btnLlamadaOff.png", height: '55%' });
   contieneLlamada.add(imgLlamada);
   txtLlamada = Ti.UI.createLabel({ text: 'Llamada', font: { fontFamily: params.fuente, fontSize: 11 }, color: params.color1 });
   contieneLlamada.add(txtLlamada);
   contenedorMenu.add(contieneLlamada);


   // Mas opciones
   contieneOpciones = Ti.UI.createView({ left: '75%', width: '25%', height: Ti.UI.FILL, backgroundColor: params.color3, layout: 'vertical'   });
   contieneOpciones.addEventListener("click", function(){  cambiarPagina(3);cambiarMenuActual();  })
   contieneOpciones.add(Ti.UI.createView({height: 3}));
   Ti.API.info("Opciones!!! " + contieneOpciones);
   imgOpciones      = Ti.UI.createImageView({ image: "/images/botonesInferiores/btnOpcionesOff.png", height: '55%' });
   contieneOpciones.add(imgOpciones);
   txtOpciones = Ti.UI.createLabel({ text: 'Opciones', font: { fontFamily: params.fuente, fontSize: 11 }, color: params.color1 });
   contieneOpciones.add(txtOpciones);
   contenedorMenu.add(contieneOpciones);

   // Revisamos cual es la opcion actual, para mostrarla
   cambiarMenuActual();


}

//
//
//
//
function cambiarMenuActual() {
   var colorBorde = params.color0;
   apagarTodoElMenu();
   switch(paginaActual){
      case 0: 
      							imgAsistencias.image = "/images/botonesInferiores/btnAsistenciasOn.png"; 
      							txtAsistencias.color = params.color1;
      							break;
      case 1: 
      							imgHistorial.image =  "/images/botonesInferiores/btnHistorialOn.png"; 
      							txtHistorial.color = params.color1;
      							break;
      case 2: 
      							imgLlamada.image =  "/images/botonesInferiores/btnLlamadaOn.png"; 
      							txtLlamada.color = params.color1;
      							break;
      case 3: 
      							imgOpciones.image =  "/images/botonesInferiores/btnOpcionesOn.png"; 
      							txtOpciones.color = params.color1;
      							break;
   }
}
function apagarTodoElMenu(){
   imgAsistencias.image = "/images/botonesInferiores/btnAsistenciasOff.png";
   imgHistorial.image =  "/images/botonesInferiores/btnHistorialOff.png";
   imgLlamada.image =  "/images/botonesInferiores/btnLlamadaOff.png";
   imgOpciones.image =  "/images/botonesInferiores/btnOpcionesOff.png";
   txtAsistencias.color = params.color9;
   txtHistorial.color = params.color9;
   txtLlamada.color = params.color9;
   txtOpciones.color = params.color9;
}


//
//
//
//
function cambiarPagina(pagina){
   if(pagina==paginaActual){
     return false;
   }
   Ti.API.info("*** Cambiando la pagina actual: " + pagina );
   paginaActual = pagina;
   if(paginaActual==1){
     HistorialProcesos.Actualizar();
   }
   controlPaginas.currentPage = paginaActual;
}
