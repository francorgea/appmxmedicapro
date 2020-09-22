var RevisaMonitoreo;
var timer_monitoreo = 180000; // 180000;
//
//
//
function datos(win,informacion,winChat){
 
  if(!Ti.Geolocation.requestLocationPermissions.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE)) { 
     Ti.API.info("*** No hay permisos, entonces los solicitamos");
     Ti.Geolocation.requestLocationPermissions( Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function(e) {      
        if(e.success){
          Ti.API.info("*** Permiso aceptado");
          datosMostrar(win,informacion,winChat);
        }  
        else{ 
          Ti.API.info("*** Permiso rechazado");
          win.backgroundImage = "/images/error_geo.png";
        }
     })  ;
  }
  else{
     Ti.API.info("*** Ya hay permisos de geolocalzacion, mostramos la ventana");
     datosMostrar(win,informacion,winChat);
  }
 
 
}



function datosMostrar(win,informacion,winChat){
 
    var expediente = informacion.expediente;
    var estatus    = informacion.status;
    var asistencia = informacion.asistencia;
    var contadorRegion = 0;
    RevisaMonitoreo = null;
    
    // Ahora, ponemos el mapa
    var Map = require('ti.map');
    var vistaMapa = Map.createView({ 
      mapToolbarEnabled: true,
      enableZoomControls: true,
      animate : false,   
      width: Ti.UI.FILL,
      top: '10%',
      bottom: 0,
      left: 0,
      right: 0,
      userLocation: true,
      regionFit: false,
      mapType: Map.NORMAL_TYPE
    });   
    vistaMapa.addEventListener("complete", function(){
       var latitud, longitud;
       if( contadorRegion == 0 ){
          Titanium.Geolocation.getCurrentPosition( function(e) { // Mostramos la posicion actual
              latitud  = e.coords.latitude;
              longitud = e.coords.longitude;        
              vistaMapa.setRegion( {latitude: latitud, longitude: longitud, latitudeDelta:0.01, longitudeDelta:0.01} );
              pintar_monitoreo( win, vistaMapa, Map, informacion.asistencia );
          });
          contadorRegion++;
       }
    });
    
   	win.addEventListener("close",function(){
   		  clearInterval(RevisaMonitoreo);
   		  Ti.App.ventanaChat = false;
   		  RevisaMonitoreo = null;
   	});
   	/*
   	win.addEventListener("blur",function(){
   		   clearInterval(RevisaMonitoreo);
   		   RevisaMonitoreo = null;
   	});
   	*/
   	win.addEventListener("focus", function() { 
    	   Ti.API.info("*** Entrando al foco de la ventana");
    	   if( RevisaMonitoreo == null ) {
      	   Ti.API.info("*** Creando timer....");
          RevisaMonitoreo = setTimeout( function(){  RevisarNuevaUbicacion( vistaMapa, asistencia ); }, timer_monitoreo ); 
        }     
   	});
    
    
    win.add(vistaMapa);

}
exports.datos = datos;  


// ================================================================================================================================

function pintar_monitoreo( winMapa, mapview, MapModule, asistencia ) {
  var puntos = [];
  preloader.show( winMapa, "Procesando..." );
  var peticionHTTP = Ti.Network.createHTTPClient();
  peticionHTTP.onerror = function()  {
      preloader.hide( winMapa );
      Utiles.Alerta("error de comunicación con el servidor, intente mas tarde.");
      winMapa.close();
      return false;
  };
  peticionHTTP.onload =  function()  {
      preloader.hide( winMapa );
     	var doc = this.responseXML.documentElement;
     	var elements = doc.getElementsByTagName("ubicaciones");
     	var nodoUbica, contenido ;
     	nodoUbica = elements.item(0);
     	contenido = nodoUbica.text;
     	var json;
     	try {
     	  json = JSON.parse(contenido);
     	}
     	catch(err){
      	 json = [];
     	}
     	Ti.API.info("*** json.lenght = " + json.length );
     	var posActualProveedor, colorMarker;
     	for(x=0;x<json.length;x++){
           if(x==0) {
             colorMarker = "imagenes/marker_blue.png";
           }
           else{
             colorMarker = "imagenes/marker_green.png";
           }
           posActualProveedor = MapModule.createAnnotation({ 
             latitude  : json[x].latitud,
             longitude : json[x].longitud,
             pincolor  : MapModule.ANNOTATION_RED,
             title     : 'Proveedor',
             image     : colorMarker
           });
           mapview.addAnnotation(posActualProveedor);
        }
     };
      var enlace = params.URLlocator + "/Api.php?method=getLocations&asistencia=" + asistencia;
      Ti.API.info("*** Enlace para coordenadas: " + enlace );
      peticionHTTP.open("GET", enlace );  
      peticionHTTP.send();      
 }

// ========================================================================================================

function RevisarNuevaUbicacion( mapview, asistencia ) {
 
  Ti.API.info("*** Revisamos nueva ubicacion...");
  var peticionHTTP = Ti.Network.createHTTPClient();
  peticionHTTP.onerror = function()  {
      return false;
  };
  peticionHTTP.onload =  function()  {
     	var doc = this.responseXML.documentElement;
     	var elements = doc.getElementsByTagName("result");
     	var nodoUbica, contenido ;
     	nodoUbica = elements.item(0);
     	contenido = nodoUbica.text;
     	var json;
     	try {
     	  json = JSON.parse(contenido);
     	}
     	catch(err){
      	 json = [];
     	}
     	Ti.API.info("*** json.lenght = " + json.length );
     	var posActualProveedor;
     	for(x=0;x<json.length;x++){
           posActualProveedor = MapModule.createAnnotation({ 
             latitude  : json[x].latitud,
             longitude : json[x].longitud,
             pincolor  : MapModule.ANNOTATION_BLUE,
             title     : 'Proveedor'
           });
           mapview.addAnnotation(posActualProveedor);
        }
     };
      var enlace = params.URLlocator + "/Api.php?method=getLastLocation&numasistencia=" + asistencia;
      Ti.API.info("*** Revisando la nueva ubicacion: " + enlace );      
      peticionHTTP.open("GET", enlace );  
      peticionHTTP.send();      
   
 
}