//
//
//
function datos(win,informacion,winChat) {
 
   win.backgroundColor = params.color7; 
   var expediente = informacion.expediente;
   var asistencia = informacion.asistencia; 

   // Definimos el contenedor y el scroll
   var scroll = Ti.UI.createScrollView({ 
       top: '9%',
       width: Ti.UI.FILL,
       height: Ti.UI.FILL,  
   });
   var contenedor = Ti.UI.createView({
       top: 0,
       layout: 'vertical',
       width: Ti.UI.FILL,
       height: Ti.UI.SIZE,
   });
   scroll.add(contenedor);
   win.add(scroll);

   preloader.show(win);
   var peticionHTTP = Ti.Network.createHTTPClient({ timeout: 30000 });
   peticionHTTP.onerror = function(e) {   
       win.backgroundImage = "/images/error_servidor.png";
       var resultado = this.responseText;
       try{
         var json = JSON.parse(unescape(resultado));
       }
       catch(e){        
         preloader.hide(win);
         gridAsistencias.data = [];
         Utiles.Alerta( "Error grave al conectar con el servidor" );
         return false;         
       }      
       preloader.hide(win);     
       Utiles.Alerta( json.noticias );
   };
   peticionHTTP.onload =  function() {
       var resultado = this.responseText;
       preloader.hide(win);
       try{
         var json = JSON.parse(unescape(resultado));
       }
       catch(e){
         preloader.hide(win);
         gridAsistencias.data = [];
         win.backgroundImage = "/images/error_servidor.png";
         Utiles.Alerta( "Error grave al conectar con el servidor" );
         return false;         
       };
       Ti.API.info("*** resultado de cabecera: " + JSON.stringify(json));
       if(json.estado!=200){
         win.backgroundImage = "/images/error_servidor.png";
         preloader.hide(win);
         Utiles.Alerta(json.noticias);
         return false;
       }               
       Ti.API.info("*** Mostramos los datos de la cabecera");
       datosMostrar(win,json,winChat,contenedor,asistencia); 
   };
   var enlace = params.URLtallerCabecera;
   enlace = enlace.replace("XXXXX", asistencia );
   Ti.API.info("*** Enlace taller: " + enlace );
   peticionHTTP.open("GET", enlace );       
   peticionHTTP.setRequestHeader("AppKey",params.APPkey);
   peticionHTTP.setRequestHeader("Authorization",Utiles.obtenerOpcion("authorization"));
   peticionHTTP.send();   
}

//
//
//
function datosMostrar(win,informacion,winChat,contenedor,asistencia){
 
 
    // Separador
    contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 20, backgroundColor: params.color10   }));
 
    // Fecha Siniestro
    var vistaFecha = Ti.UI.createView({ layout: 'vertical', width: Ti.UI.FILL, height: Ti.UI.SIZE, });
    vistaFecha.add(Ti.UI.createView({ height: 10 }));
    vistaFecha.add(Ti.UI.createLabel({ text: "Fecha del Siniestro: ", left: 12, textAlign: 'left' ,font: { fontFamily: params.fuente_primaria, fontSize: 16 },color: params.color6, width: 'auto', height: 'auto' 	}));
    vistaFecha.add(Ti.UI.createView({ height: 5 }));
    var fecha_siniestro = Ti.UI.createLabel({ text: informacion.data.fecha_siniestro, left: 12, width: '90%', height: Ti.UI.SIZE, color: params.color6, font: { fontFamily: params.fuente_primaria, fontSize: 14 }, textAlign: 'left', });
    vistaFecha.add(fecha_siniestro);  
    vistaFecha.add(Ti.UI.createView({ height: 10 }));  
    vistaFecha.add(Ti.UI.createView({ bottom: 0, width: '95%', right: 0, height: 1, borderColor: params.color10, borderWidth: 1 }));
    contenedor.add(vistaFecha);
 
    // Ubicacion Siniestro
    var vistaUbicacion = Ti.UI.createView({ layout: 'vertical', width: Ti.UI.FILL, height: Ti.UI.SIZE, });
    vistaUbicacion.add(Ti.UI.createView({ height: 10 }));
    vistaUbicacion.add(Ti.UI.createLabel({ text: "Ubicación del Siniestro: ", left: 12, textAlign: 'left' ,font: { fontFamily: params.fuente_primaria, fontSize: 16 },color: params.color6, width: 'auto', height: 'auto' 	}));
    vistaUbicacion.add(Ti.UI.createView({ height: 5 }));
    var ubicacion_siniestro = Ti.UI.createLabel({ text: informacion.data.direccion_siniestro, left: 12, width: '90%', height: Ti.UI.SIZE, color: params.color6, font: { fontFamily: params.fuente_primaria, fontSize: 14 }, textAlign: 'left', });
    vistaUbicacion.add(ubicacion_siniestro);  
    vistaUbicacion.add(Ti.UI.createView({ height: 10 }));  
    vistaUbicacion.add(Ti.UI.createView({ bottom: 0, width: '95%', right: 0, height: 1, borderColor: params.color10, borderWidth: 1 }));
    contenedor.add(vistaUbicacion);

    // Ubicacion Taller
    var vistaUbicacionTaller = Ti.UI.createView({ layout: 'vertical', width: Ti.UI.FILL, height: Ti.UI.SIZE, });
    vistaUbicacionTaller.add(Ti.UI.createView({ height: 10 }));
    vistaUbicacionTaller.add(Ti.UI.createLabel({ text: "Ubicación del Taller: ", left: 12, textAlign: 'left' ,font: { fontFamily: params.fuente_primaria, fontSize: 16 },color: params.color6, width: 'auto', height: 'auto' 	}));
    vistaUbicacionTaller.add(Ti.UI.createView({ height: 5 }));
    var ubicacion_taller = Ti.UI.createLabel({ text: informacion.data.direccion_taller, left: 12, width: '90%', height: Ti.UI.SIZE, color: params.color6, font: { fontFamily: params.fuente_primaria, fontSize: 14 }, textAlign: 'left', });
    vistaUbicacionTaller.add(ubicacion_taller);  
    vistaUbicacionTaller.add(Ti.UI.createView({ height: 10 }));  
    vistaUbicacionTaller.add(Ti.UI.createView({ bottom: 0, width: '95%', right: 0, height: 1, borderColor: params.color10, borderWidth: 1 }));
    contenedor.add(vistaUbicacionTaller);
   
    // Correo Taller
    var vistaCorreoTaller = Ti.UI.createView({ layout: 'vertical', width: Ti.UI.FILL, height: Ti.UI.SIZE, });
    vistaCorreoTaller.add(Ti.UI.createView({ height: 10 }));
    vistaCorreoTaller.add(Ti.UI.createLabel({ text: "Email del taller: ", left: 12, textAlign: 'left' ,font: { fontFamily: params.fuente_primaria, fontSize: 16 },color: params.color6, width: 'auto', height: 'auto' 	}));
    vistaCorreoTaller.add(Ti.UI.createView({ height: 5 }));
    var correo_taller = Ti.UI.createLabel({ text: informacion.data.email_taller, left: 12, width: '90%', height: Ti.UI.SIZE, color: params.color6, font: { fontFamily: params.fuente_primaria, fontSize: 14 }, textAlign: 'left', });
    vistaCorreoTaller.add(correo_taller);  
    vistaCorreoTaller.add(Ti.UI.createView({ height: 10 }));  
    vistaCorreoTaller.add(Ti.UI.createView({ bottom: 0, width: '95%', right: 0, height: 1, borderColor: params.color10, borderWidth: 1 }));
    contenedor.add(vistaCorreoTaller);

    // Nombre Taller
    var vistaNombreTaller = Ti.UI.createView({ layout: 'vertical', width: Ti.UI.FILL, height: Ti.UI.SIZE, });
    vistaNombreTaller.add(Ti.UI.createView({ height: 10 }));
    vistaNombreTaller.add(Ti.UI.createLabel({ text: "Nombre del taller: ", left: 12, textAlign: 'left' ,font: { fontFamily: params.fuente_primaria, fontSize: 16 },color: params.color6, width: 'auto', height: 'auto' 	}));
    vistaNombreTaller.add(Ti.UI.createView({ height: 5 }));
    var nombre_taller = Ti.UI.createLabel({ text: informacion.data.nombre_taller, left: 12, width: '90%', height: Ti.UI.SIZE, color: params.color6, font: { fontFamily: params.fuente_primaria, fontSize: 14 }, textAlign: 'left', });
    vistaNombreTaller.add(nombre_taller);  
    vistaNombreTaller.add(Ti.UI.createView({ height: 10 }));  
    vistaNombreTaller.add(Ti.UI.createView({ bottom: 0, width: '95%', right: 0, height: 1, borderColor: params.color10, borderWidth: 1 }));
    contenedor.add(vistaNombreTaller);

    // Inspector
    var vistaInspector = Ti.UI.createView({ layout: 'vertical', width: Ti.UI.FILL, height: Ti.UI.SIZE, });
    vistaInspector.add(Ti.UI.createView({ height: 10 }));
    vistaInspector.add(Ti.UI.createLabel({ text: "Inspector: ", left: 12, textAlign: 'left' ,font: { fontFamily: params.fuente_primaria, fontSize: 16 },color: params.color6, width: 'auto', height: 'auto' 	}));
    vistaInspector.add(Ti.UI.createView({ height: 5 }));
    var inspector = Ti.UI.createLabel({ text: informacion.data.nombre_inspector, left: 12, width: '90%', height: Ti.UI.SIZE, color: params.color6, font: { fontFamily: params.fuente_primaria, fontSize: 14 }, textAlign: 'left', });
    vistaInspector.add(inspector);  
    vistaInspector.add(Ti.UI.createView({ height: 10 }));  
    vistaInspector.add(Ti.UI.createView({ bottom: 0, width: '95%', right: 0, height: 1, borderColor: params.color10, borderWidth: 1 }));
    contenedor.add(vistaInspector);
    
    // Separador
    contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 20, backgroundColor: params.color10   }));

    // Descargamos los datos de los avances
    DescargarAvances( win, contenedor, informacion.data.id_siniestro );

}
exports.datos = datos;  


//
//
//
function DescargarAvances( win, contenedor, siniestro ){
 
   preloader.show(win);
   var peticionHTTP = Ti.Network.createHTTPClient({ timeout: 30000 });
   peticionHTTP.onerror = function(e) {   
       var resultado = this.responseText;
       Ti.API.info("*** a) Resultado de SINIESTRO: " + JSON.stringify(resultado) );
       try{
         var json = JSON.parse(unescape(resultado));
       }
       catch(e){        
         preloader.hide(win);
         gridAsistencias.data = [];
         Utiles.Alerta( "Error grave al conectar con el servidor" );
         return false;         
       }      
       preloader.hide(win);     
       Utiles.Alerta( json.noticias );
   };
   peticionHTTP.onload =  function() {
       var resultado = this.responseText;
       preloader.hide(win);
       try{
         var json = JSON.parse(unescape(resultado));
       }
       catch(e){
         preloader.hide(win);
         gridAsistencias.data = [];
         Utiles.Alerta( "Error grave al conectar con el servidor" );
         return false;         
       };
       Ti.API.info("*** b) Resultado de SINIESTRO: " + JSON.stringify(resultado) );
       if(json.estado!=200){
         preloader.hide(win);
         Utiles.Alerta(json.noticias);
         return false;
       }               
       Ti.API.info("*** Mostramos los datos de los avances");
       var total = json.data.length;
       for(x=0;x<total;x++){
          AgregarAvance( win, x, contenedor, json.data[x], siniestro );
       }
       // Separador
       contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 20, backgroundColor: params.color10   }));
   };
   var enlace = params.URLtallerAvances;
   enlace = enlace.replace("XXXXX", siniestro );
   Ti.API.info("*** Enlace avances taller: " + enlace );
   peticionHTTP.open("GET", enlace );       
   peticionHTTP.setRequestHeader("AppKey",params.APPkey);
   peticionHTTP.setRequestHeader("Authorization",Utiles.obtenerOpcion("authorization"));
   peticionHTTP.send();   
}

//
//
//
function AgregarAvance( win, indice, contenedor, datos, siniestro ){ 
  Ti.API.info("*** "+ indice +" SINIESTRO :" + JSON.stringify(datos) );   
  var vistaSiniestro = Ti.UI.createView({ id_registro: datos.id_registro,  width: Ti.UI.FILL, height: 60 });
  vistaSiniestro.add(  Ti.UI.createImageView({ id_registro: datos.id_registro,left: 10, width: 35, height: 35, image: datos.icono  })   );
  vistaSiniestro.add(Ti.UI.createLabel({ id_registro: datos.id_registro,text: "Nombre de Gestión: ", top: 10, left: 60, textAlign: 'left' ,font: { fontFamily: params.fuente_primaria, fontSize: 16 },color: params.color6, right: 10, height: 'auto' 	}));
  var tipo_gestion = Ti.UI.createLabel({ id_registro: datos.id_registro,text: datos.tipo_gestion   , top: 30, left: 60,  height: Ti.UI.SIZE, color: params.color6, font: { fontFamily: params.fuente_primaria, fontSize: 14 }, right: 10, textAlign: 'left', });
  vistaSiniestro.add(tipo_gestion);  
  vistaSiniestro.add(Ti.UI.createView({ id_registro: datos.id_registro,bottom: 0, width: '95%', right: 0, height: 1, borderColor: params.color10, borderWidth: 1 }));
  if(datos.indicador_tipo_gestion=="AR" ){
    vistaSiniestro.add(  Ti.UI.createImageView({ id_registro: datos.id_registro,right: 10, width: 25, height: 25, image: "images/icoGaleria.png"  })   );
    vistaSiniestro.addEventListener("click", function(e){
         Ti.API.info("*** Siniestro  : " + siniestro );
         Ti.API.info("*** id_registro: " + e.source.id_registro );
         VerificarImagenes( win, siniestro, e.source.id_registro );
    });      
  }
  contenedor.add(vistaSiniestro);
}

//
//
//
function VerificarImagenes( win, siniestro, avance ){

   preloader.show(win);
   var peticionHTTP = Ti.Network.createHTTPClient({ timeout: 30000 });
   peticionHTTP.onerror = function(e) {   
       var resultado = this.responseText;
       Ti.API.info("*** a) Resultado de IMAGENES: " + JSON.stringify(resultado) );
       try{
         var json = JSON.parse(unescape(resultado));
       }
       catch(e){        
         preloader.hide(win);
         gridAsistencias.data = [];
         Utiles.Alerta( "Error grave al conectar con el servidor" );
         return false;         
       }      
       preloader.hide(win);     
       Utiles.Alerta( json.noticias );
   };
   peticionHTTP.onload =  function() {
       var resultado = this.responseText;
       preloader.hide(win);
       try{
         var json = JSON.parse(unescape(resultado));
       }
       catch(e){
         preloader.hide(win);
         gridAsistencias.data = [];
         Utiles.Alerta( "Error grave al conectar con el servidor" );
         return false;         
       };
       Ti.API.info("*** b) Resultado de IMAGENES: " + JSON.stringify(resultado) );
       if(json.estado!=200){
         preloader.hide(win);
         Utiles.Alerta(json.noticias);
         return false;
       }               
       Ti.API.info("*** Mostramos las imagenes");
       MostrarImagenesAvances( win, json.data );
   };
   var enlace = params.URLtallerImagenes;
   enlace = enlace.replace("XXXXX", siniestro );
   enlace = enlace.replace("YYYYY", avance );
   Ti.API.info("*** Enlace imagenes taller: " + enlace );
   Ti.API.info("*** Authtorization        : " + Utiles.obtenerOpcion("authorization") );
   peticionHTTP.open("GET", enlace );       
   peticionHTTP.setRequestHeader("AppKey",params.APPkey);
   peticionHTTP.setRequestHeader("Authorization",Utiles.obtenerOpcion("authorization"));
   peticionHTTP.send();   



}

//
//
//
function MostrarImagenesAvances( win, imagenes ) {

   var win = new GenericWindow("S","Imágenes");
   win.backgroundColor = params.color10; 

   // Definimos el contenedor y el scroll
   var scroll = Ti.UI.createScrollView({ 
       top: '10%',
       width: Ti.UI.FILL,
       height: Ti.UI.FILL,  
   });
   var contenedor = Ti.UI.createView({
       top: 0,
       layout: 'vertical',
       width: Ti.UI.FILL,
       height: Ti.UI.SIZE,
   });
   scroll.add(contenedor);
   win.add(scroll);   
   
   // Separador
   contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 20, backgroundColor: params.color10   }));      
   
   for(x=0;x<imagenes.length;x++){      
      var renglon = Ti.UI.createImageView({
          defaultImage: "/images/imagendefault.png", 
          borderRadius: 10,
          layout: 'vertical',
          width: '80%',
          height: Ti.UI.SIZE,
          backgroundColor: params.color7,
          borderColor: params.color12
      });            
      var imagen = Ti.UI.createImageView({
          image: imagenes[x].ruta_imagen ,
          width: Ti.UI.FILL,
          height: Ti.UI.SIZE
      });
      imagen.addEventListener("click", function(){
          Utiles.abrirEnlace( imagen.getImage() );
      });
      renglon.add(imagen);
      // Separador
      renglon.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 20, backgroundColor: params.color7   }));   
      renglon.add(Ti.UI.createLabel({ text: imagenes[x].tipo_imagen, textAlign: 'center' ,font: { fontFamily: params.fuente_primaria, fontSize: 14 },color: params.color11,  height: 'auto' 	}));      
      // Separador
      renglon.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 20, backgroundColor: params.color7   }));         
      contenedor.add(renglon);
      // Separador
      contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 40, backgroundColor: params.color10   }));         
   }   
   
   win.open();          	                        
}
