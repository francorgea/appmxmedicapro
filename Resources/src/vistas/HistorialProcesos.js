
var Actualizar = function(mostrar) { 
  							mostrar = (typeof mostrar !== 'undefined') ?  mostrar : true;
         if(!params.isAndroid){
           Titanium.UI.iOS.appBadge = 0; 
         }
         Ti.App.Properties.setString('ActualizarListadoAsistencias','N');
         Ti.API.info("inicio...");
         if(mostrar){
	         preloader.show(contenedorHistoria);
         }
         
         gridAsistencias.data = [];
         
         var peticionHTTP = Ti.Network.createHTTPClient();
         peticionHTTP.onerror = function(e)   {
	         			Ti.API.info("line 15...");
             var resultado = this.responseText;
             Ti.API.info("*** ERROR: " + resultado );
             Utiles.Alerta( "Error de comunicación con el servidor, por favor intenta mas tarde. \n\n" +   + e.error );
             gridAsistencias.data = [];
             Ti.App.Properties.setString('ActualizarListadoAsistencias','N');
             preloader.hide(contenedorHistoria);
         };
         peticionHTTP.onload =  function() 
         {
	         	Ti.API.info("line 25...");
		          //Ti.API.info("*** RESULTADO: " + this.responseText );
		          if( this.responseText == "0" ) {
			          		Ti.API.info("line 28...");
               //Ti.App.db.execute("DELETE FROM historico_asistencias"); 
               // Ti.App.db.execute("DELETE FROM llegada_push"); 
               Ti.API.info("No hay registros por procesar..");
               gridAsistencias.data = [];
               Ti.App.Properties.setString('ActualizarListadoAsistencias','N');
               preloader.hide(contenedorHistoria);
               return false;
            }
            if( Utiles.Left(this.responseText,5) == "ERROR" ) {
	            		Ti.API.info("line 38...");
               preloader.hide(contenedorHistoria);
               Utiles.Alerta("No se ha podido accesar al servidor, por favor intentá mas tarde. \r\r");
               gridAsistencias.data =  [];
               Ti.App.Properties.setString('ActualizarListadoAsistencias','N');               
               return false;
            }     
            else
            {        
	            		Ti.API.info("line 47...");
                var json = JSON.parse(unescape(this.responseText));        
   	            var json = json.datos;     
      		        var pos;  
                  if(json.length>0){
	                  		Ti.API.info("line 52...");
                     contenedorHistoria.backgroundImage = null;
                     gridAsistencias.data = [];
                     for(x=0;x<json.length;x++){
                        gridAsistencias.appendRow( agregarRegistro(contenedorHistoria, gridAsistencias, json, x, 'white' ) );
                     }         
                  }
                  else{
	                  	Ti.API.info("line 60...");
                     gridAsistencias.data = [];
                     contenedorHistoria.backgroundImage = "/images/sinasistencias.png";
                  }
                  Ti.API.info("line 64...");
                  preloader.hide(contenedorHistoria);
                  preloader.hide(contenedorHistoria);
                  preloader.hide(contenedorHistoria);
                  preloader.hide(contenedorHistoria);
                  Ti.App.Properties.setString('ActualizarListadoAsistencias','N');
            }     
            
         };
         peticionHTTP.open("POST", params.URLsiga );  
         var parametros = {  
                acc: 'L',
                tkn: Utiles.obtenerOpcion('deviceToken'),
                app: Titanium.App.name,
                ver: Titanium.App.version,
                dsp: Utiles.obtener_id(),
                dos: Titanium.Platform.name,
                ced: Utiles.obtenerOpcion('cedula'),
                cta: params.cuenta_siga,
                bdg: 0,
                test:1
         };  
         peticionHTTP.send(parametros);      
  
    
};
exports.Actualizar = Actualizar;

//
//
//
function agregarRegistro(contenedorHistoria, gridAsistencias, json, x, colorRenglon ){
 
 /*
  expediente   = Utiles.Dec((json[pos].expediente) );
  fecha        = Utiles.Dec((json[pos].fechainicio) );
  estatus      = Utiles.Dec((json[pos].status));
  tipo         = Utiles.Dec((json[pos].tipo));  
  solicita     = Utiles.Dec((json[pos].nomafiliado));
  bene         = Utiles.Dec((json[pos].nomcontacto));
  marca        = Utiles.Dec((json[pos].marca));
  modelo       = Utiles.Dec((json[pos].modelo));
  placas       = Utiles.Dec((json[pos].placas)); 
  motivo       = Utiles.Dec((json[pos].descocurrio)); 
  calificacion = Utiles.Dec((json[pos].evaluacion)); 
  texto_calif  = Utiles.Dec((json[pos].comenafil)); 
  telefono     = Utiles.Dec((json[pos].tel));
  fecha_fin    = Utiles.Dec((json[pos].fechaultima)); 
  informacion  = Utiles.Dec((json[pos].informacion_extra));
  puede_calif  = Utiles.Dec((json[pos].puede_calif));
  servicio     = Utiles.Dec((json[pos].servicio));
  coordinador  = "coordinador";
  
 */ 
 Ti.API.info(JSON.stringify(json[x]));
   var renglon = Ti.UI.createTableViewRow({
     		datos          : json[x],
       height         : 120,
       backgroundColor: colorRenglon
   });
   var vistaRenglon = Ti.UI.createView({
       borderColor: params.color6,
       width:  Ti.UI.FILL,
       height: Ti.UI.FILL,
   });
   var vistaSuperior = Ti.UI.createView({
       top: 0,
       width: Ti.UI.FILL,       
       height: 30,
       backgroundColor: params.color10,
   });
   vistaRenglon.add(vistaSuperior);   
   var vistaEstrellas = Ti.UI.createView({
       right: 3, 
       width: '30%',
       height: Ti.UI.FILL,
       //borderColor: "red"
   });
   var imgEstrellas = Ti.UI.createImageView({
       image: Utiles.icono_calificacion(  json[x].evaluacion  ),
       right: 3,
       height: '95%'
   });
   vistaEstrellas.add(imgEstrellas);
   var vistaImgEstatus = Ti.UI.createView({
       left: 3,
       width: 30,       
       height: 30
   });
   var imagenParaStatus = Utiles.imagen_estatus( parseInt(json[x].status) ); 
   var imgEstatus = Ti.UI.createImageView({
       image: imagenParaStatus,
       width: 20,
       height: 20,
   });
   var lblSolicita = Ti.UI.createLabel({
       text: "Solicita: " + Utiles.FechaCadena( json[x].fechainicio ),
       font: { fontFamily: params.fuente_primaria, fontSize: 14 },
       width: 'auto',
       color: params.color0,       
       left: 35,
       //borderColor: "red"
   });   
   vistaRenglon.add( Ti.UI.createView({ width: Ti.UI.FILL, height: '5' })  );
   var lblTermina = Ti.UI.createLabel({
       text: "Termina: ",
       font: { fontFamily: params.fuente_primaria, fontSize: 14 },
       width: 'auto',
       color: params.color0,       
       top: 35,       
       left: 25
   });
   vistaRenglon.add(lblTermina);
   var lblTerminaValor = Ti.UI.createLabel({
       text: Utiles.Obtiene_fecha_termina( json[x].fechaultima ),
       font: { fontFamily: params.fuente_primaria, fontSize: 14 },
       width: 'auto',
       textAlign: 'left',
       color: params.color0,       
       width: '70%',
       top: 35,       
       left: 100
   });
   vistaRenglon.add(lblTerminaValor);
   var lblServicio = Ti.UI.createLabel({
       text: "Servicio:",
       font: { fontFamily: params.fuente_primaria, fontSize: 14 },
       width: 'auto',
       color: params.color0,   
       top: 55,                  
       left: 25
   });
   vistaRenglon.add(lblServicio);
   var lblServicioValor = Ti.UI.createLabel({
       text: Utiles.quitar_espacios(Utiles.Pintar_Servicio( json[x].servicio )),
       font: { fontFamily: params.fuente_primaria, fontSize: 14 },
       textAlign: 'left',
       maxLines: 1,
       color: params.color0,       
       width: '70%',
       height: '16',
       top: 55,       
       left: 100
   });
   vistaRenglon.add(lblServicioValor);
   var lblEstatus = Ti.UI.createLabel({
       text: "Estatus:",
       font: { fontFamily: params.fuente_primaria, fontSize: 14 },
       width: 'auto',
       color: params.color0,       
       top: 75,              
       left: 25
   });
   vistaRenglon.add(lblEstatus);  
   var lblEstatusValor = Ti.UI.createLabel({
       text: Utiles.texto_estatus(  parseInt(json[x].status) ) ,
       font: { fontFamily: params.fuente_primaria, fontSize: 14 },
       width: 'auto',
       textAlign: 'left',
       maxLines: 1,
       color: params.color0,      
       width: '80%',
       height: 16,
       top: 75,       
       left: 100
   });
   vistaRenglon.add(lblEstatusValor);
   var lblMotivo = Ti.UI.createLabel({
       text: "Motivo:",
       font: { fontFamily: params.fuente_primaria, fontSize: 14 },
       width: 'auto',
       color: params.color0,  
       height: 16,     
       top: 95,              
       left: 25
   });
   vistaRenglon.add(lblMotivo);
   var lblMotivoValor = Ti.UI.createLabel({
       text: json[x].descocurrio ,
       font: { fontFamily: params.fuente_primaria, fontSize: 14 },
       width: 'auto',
       textAlign: 'left',
       maxLines: 1,
       color: params.color0,       
       width: '80%',
       height: 19,
       top: 95,       
       left: 100
   });
   vistaRenglon.add(lblMotivoValor);
   vistaSuperior.add(lblSolicita);
   vistaImgEstatus.add(imgEstatus);
   vistaSuperior.add(vistaImgEstatus);
   vistaSuperior.add(vistaEstrellas);      
   renglon.add(vistaRenglon);   
   return renglon;
 
}
