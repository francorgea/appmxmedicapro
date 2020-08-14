var barraIndicaActual;

//Application Window Component Constructor
function ApplicationWindow() {


 // Registramos los PUSH
 if( Ti.Platform.name =="android") {
  
   
  

 }
 else
 {

      var registerForPush = function(){
       Ti.Network.registerForPushNotifications({
          success: deviceTokenSuccess,
          error: deviceTokenError,
          callback: receivePush
       });
      }
      Ti.App.iOS.addEventListener('usernotificationsettings', registerForPush);
      Ti.App.iOS.registerUserNotificationSettings({
         types:[Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE]
      });

 }

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
   var imgAsistencias  = Ti.UI.createImageView({ image: "/images/botonesInferiores/btnAsistencias.png", height: '55%' });
   contieneAsistencias.add(imgAsistencias);
   contieneAsistencias.add(Ti.UI.createLabel({ text: 'Asistencias', font: { fontFamily: params.fuente, fontSize: 11 }, color: params.color7 }));
   contenedorMenu.add(contieneAsistencias);


   // Historial
   contieneHistorial = Ti.UI.createView({ left: '25%', width: '25%', height: Ti.UI.FILL, backgroundColor: params.color3, layout: 'vertical'   });
   contieneHistorial.addEventListener("click", function(){  cambiarPagina(1); cambiarMenuActual(); })
   contieneHistorial.add(Ti.UI.createView({height: 3})); 
   var imgHistorial      = Ti.UI.createImageView({ image: "/images/botonesInferiores/btnHistorial.png", height: '55%' });
   contieneHistorial.add(imgHistorial);
   contieneHistorial.add(Ti.UI.createLabel({ text: 'Historial', font: { fontFamily: params.fuente, fontSize: 11 }, color: params.color7 }));
   contenedorMenu.add(contieneHistorial);


   // Llamada
   contieneLlamada = Ti.UI.createView({ left: '50%', width: '25%', height: Ti.UI.FILL, backgroundColor: params.color3, layout: 'vertical'   });
   contieneLlamada.addEventListener("click", function(){  cambiarPagina(2); cambiarMenuActual(); })
   contieneLlamada.add(Ti.UI.createView({height: 3}));
   var imgLlamada      = Ti.UI.createImageView({ image: "/images/botonesInferiores/btnLlamada.png", height: '55%' });
   contieneLlamada.add(imgLlamada);
   contieneLlamada.add(Ti.UI.createLabel({ text: 'Llamada', font: { fontFamily: params.fuente, fontSize: 11 }, color: params.color7 }));
   contenedorMenu.add(contieneLlamada);


   // Mas opciones
   contieneOpciones = Ti.UI.createView({ left: '75%', width: '25%', height: Ti.UI.FILL, backgroundColor: params.color3, layout: 'vertical'   });
   contieneOpciones.addEventListener("click", function(){  cambiarPagina(3);cambiarMenuActual();  })
   contieneOpciones.add(Ti.UI.createView({height: 3}));
   var imgOpciones      = Ti.UI.createImageView({ image: "/images/botonesInferiores/btnOpciones.png", height: '55%' });
   contieneOpciones.add(imgOpciones);
   contieneOpciones.add(Ti.UI.createLabel({ text: 'Opciones', font: { fontFamily: params.fuente, fontSize: 11 }, color: params.color7 }));
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
      case 0: contieneAsistencias.add(barraIndicaActual); break;
      case 1: contieneHistorial.add(barraIndicaActual); break;
      case 2: contieneLlamada.add(barraIndicaActual); break;
      case 3: contieneOpciones.add(barraIndicaActual); break;
   }
}
function apagarTodoElMenu(){
   try{ contieneAsistencias.remove(barraIndicaActual) } catch(e) {  Ti.API.info("*** 0 - no esta");  };
   try{ contieneHistorial.remove(barraIndicaActual)   } catch(e) {  Ti.API.info("*** 1 - no esta");  };
   try{ contieneLlamada.remove(barraIndicaActual)     } catch(e) {  Ti.API.info("*** 2 - no esta");  };
   try{ contieneOpciones.remove(barraIndicaActual)    } catch(e) {  Ti.API.info("*** 3 - no esta");  };
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
