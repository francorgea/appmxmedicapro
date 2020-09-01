
//
//
//
function datos(win,informacion,winChat ){
 
    var expediente = informacion.expediente;
    var estatus    = informacion.status;
    fecha         = informacion.fechainicio;
    estatus       = informacion.status;
    solicita      = informacion.nomcontacto ;
    benef         = informacion.nomcontacto ;
    telefono      = informacion.tel;
    motivo        = informacion.descocurrio;
    marca         = "" ;
    modelo        = "" ;
    placas        = "" ;
    edad          = "" ;
    calificacion  = informacion.evaluacion;
    texto_calif   = informacion.comenafil;
    fecha_fin     = informacion.fechaultima;
    informacionx  = informacion.informacion_extra; 
    servicio      = informacion.servicio; 
    if(calificacion==""){
      calificacion=0;
    }
    if(marca!="."){
       datosVehiculo = "";
    }

  
    win.backgroundColor = params.color7;
    var Button = require("src/common/Button");
    
    Ti.API.info("**********************************");
    Ti.API.info("*** Calificacion: " + calificacion );    
    Ti.API.info("*** estatus     : " + estatus  );    
    Ti.API.info( JSON.stringify(informacion)  );
    if(calificacion<=0){   
       if(estatus>=1 && estatus <= 3){        
          var vistaCalifica = Ti.UI.createView({
              height: '10%',
              width: 50,
              top: 0, 
              right: 0,
              zIndex: 1000,
          });                    
          var imagenInfo = "/images/estrella.png";
          var btnCalif = Titanium.UI.createView({
              backgroundImage: imagenInfo,
              right: 5,
              width: 30,
              height: 30
          });
          btnCalif.addEventListener("click", function(){
                var winCalif = new GenericWindow("S","Calificar");
            	   var vista = require("src/vistas/calificar");
            	   vista.Calificar( winCalif, expediente, servicio, win );  	      	    
           	    winCalif.open();          	            
          });
          vistaCalifica.add(btnCalif);          
          win.add(vistaCalifica);
       }  
    };
    
    
    // Definimos el contenedor y el scroll
    var scroll = Ti.UI.createScrollView({
        top: '10%',
        width: Ti.UI.FILL,
        width: Ti.UI.FILL,  
    });
    var contenedor = Ti.UI.createView({
        top: 0,
        layout: 'vertical',
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
    });
    scroll.add(contenedor);
    win.add(scroll);    

    // 
    // Espaciado
    contenedor.add( Ti.UI.createView({ width: Ti.UI.FILL, height: '15dp' })  );        
    
    // Servicio solicitado
    contenedor.add( Ti.UI.createLabel({ 
          text: "Servicio Solicitado: ",
          width: '90%',
          color: params.color0,
          font: { fontFamily: params.fuente_primaria, fontSize: 16, fontWeight: 'bold' },
          textAlign: 'left',
    }));
    contenedor.add( Ti.UI.createLabel({ 
          text: servicio,
          width: '90%',
          color: params.color3,
          font: { fontFamily: params.fuente_primaria, fontSize: 14 },
          textAlign: 'left',
    }));
    
    // 
    // Espaciado
    contenedor.add( Ti.UI.createView({ width: Ti.UI.FILL, height: '15dp' })  );        
    
    // Estatus
    contenedor.add( Ti.UI.createLabel({ 
          text: "Estatus: ",
          width: '90%',
          color: params.color0,
          font: { fontFamily: params.fuente_primaria, fontSize: 16, fontWeight: 'bold' },
          textAlign: 'left',
    }));
    contenedor.add( Ti.UI.createLabel({ 
          text: Utiles.texto_estatus( estatus ),
          width: '90%',
          color: params.color3,
          font: { fontFamily: params.fuente_primaria, fontSize: 14 },
          textAlign: 'left',
    }));
    

    // 
    // Espaciado
    contenedor.add( Ti.UI.createView({ width: Ti.UI.FILL, height: '15dp' })  );        
    
    // Fecha de solicitud
    contenedor.add( Ti.UI.createLabel({ 
          text: "Fecha Solicitud: ",
          width: '90%',
          color: params.color0,
          font: { fontFamily: params.fuente_primaria, fontSize: 16, fontWeight: 'bold' },
          textAlign: 'left',
    }));
    contenedor.add( Ti.UI.createLabel({ 
          text: Utiles.FechaCadena(fecha),
          width: '90%',
          color: params.color3,
          font: { fontFamily: params.fuente_primaria, fontSize: 14 },
          textAlign: 'left',
    }));

    // 
    // Espaciado
    contenedor.add( Ti.UI.createView({ width: Ti.UI.FILL, height: '15dp' })  );        
    
    // Fecha de terminada
    contenedor.add( Ti.UI.createLabel({ 
          text: "Fecha de conclusión: ",
          width: '90%',
          color: params.color0,
          font: { fontFamily: params.fuente_primaria, fontSize: 16, fontWeight: 'bold' },
          textAlign: 'left',
    }));
    contenedor.add( Ti.UI.createLabel({ 
          text: Utiles.Obtiene_fecha_termina(fecha_fin),
          width: '90%',
          color: params.color3,
          font: { fontFamily: params.fuente_primaria, fontSize: 14 },
          textAlign: 'left',
    }));


    // 
    // Espaciado
    contenedor.add( Ti.UI.createView({ width: Ti.UI.FILL, height: '15dp' })  );        
    
    // Expediente
    contenedor.add( Ti.UI.createLabel({ 
          text: "Expediente: ",
          width: '90%',
          color: params.color0,
          font: { fontFamily: params.fuente_primaria, fontSize: 16, fontWeight: 'bold' },
          textAlign: 'left',
    }));
    contenedor.add( Ti.UI.createLabel({ 
          text: expediente,
          width: '90%',
          color: params.color3,
          font: { fontFamily: params.fuente_primaria, fontSize: 14 },
          textAlign: 'left',
    }));



    // 
    // Espaciado
    contenedor.add( Ti.UI.createView({ width: Ti.UI.FILL, height: '15dp' })  );        
    
    // Quien Solicito
    contenedor.add( Ti.UI.createLabel({ 
          text: "Quien solicitó: ",
          width: '90%',
          color: params.color0,
          font: { fontFamily: params.fuente_primaria, fontSize: 16, fontWeight: 'bold' },
          textAlign: 'left',
    }));
    contenedor.add( Ti.UI.createLabel({ 
          text: solicita,
          width: '90%',
          color: params.color3,
          font: { fontFamily: params.fuente_primaria, fontSize: 14 },
          textAlign: 'left',
    }));

    // Si se envio vehiculo, entonces lo pintams
    if(datosVehiculo!=""){
        contenedor.add( Ti.UI.createView({ width: Ti.UI.FILL, height: '15dp' })  );            
        contenedor.add( Ti.UI.createLabel({ 
              text: "Vehículo: ",
              width: '90%',
              color: params.color0,
              font: { fontFamily: params.fuente_primaria, fontSize: 16, fontWeight: 'bold' },
              textAlign: 'left',
        }));
        contenedor.add( Ti.UI.createLabel({ 
              text: datosVehiculo,
              width: '90%',
              color: params.color3,
              font: { fontFamily: params.fuente_primaria, fontSize: 14 },
              textAlign: 'left',
        }));     
    }
 

    // 
    // Espaciado
    contenedor.add( Ti.UI.createView({ width: Ti.UI.FILL, height: '15dp' })  );        
    
    // Motivo
    contenedor.add( Ti.UI.createLabel({ 
          text: "Motivo: ",
          width: '90%',
          color: params.color0,
          font: { fontFamily: params.fuente_primaria, fontSize: 16, fontWeight: 'bold' },
          textAlign: 'left',
    }));
    contenedor.add( Ti.UI.createLabel({ 
          text: motivo,
          width: '90%',
          color: params.color3,
          font: { fontFamily: params.fuente_primaria, fontSize: 14 },
          textAlign: 'left',
          height: Ti.UI.SIZE
    }));


    // 
    // Espaciado
    contenedor.add( Ti.UI.createView({ width: Ti.UI.FILL, height: '15dp' })  );        
    
    // Calificacion
    contenedor.add( Ti.UI.createLabel({ 
          text: "Calificacion: ",
          width: '90%',
          color: params.color0,
          font: { fontFamily: params.fuente_primaria, fontSize: 16, fontWeight: 'bold' },
          textAlign: 'left',
    }));
    var imageCalif = Utiles.icono_calificacion( calificacion );
    var vistaCalif = Ti.UI.createImageView({
        left: '5%',
        image: imageCalif,
        height: 20
    });
    contenedor.add(vistaCalif);
    

    // Motivo
    if( texto_calif != "" ) {

        // Espaciado
        contenedor.add( Ti.UI.createView({ width: Ti.UI.FILL, height: '15dp' })  );        
        
        contenedor.add( Ti.UI.createLabel({ 
              text: "Comentarios de la calificación: ",
              width: '90%',
              color: params.color0,
              font: { fontFamily: params.fuente_primaria, fontSize: 16, fontWeight: 'bold' },
              textAlign: 'left',
        }));
        contenedor.add( Ti.UI.createLabel({ 
              text: texto_calif,
              width: '90%',
              color: params.color3,
              font: { fontFamily: params.fuente_primaria, fontSize: 14 },
              textAlign: 'left',
              height: Ti.UI.SIZE
        }));
    
    }
    

    // 
    // Espaciado
    contenedor.add( Ti.UI.createView({ width: Ti.UI.FILL, height: '15dp' })  );        

     
     if(estatus != 1 && estatus != 2 && estatus != 3)  {
         var btnCancela = Button("Cancelar Asistencia",'red','90%');
         btnCancela.addEventListener("click", function(){
       	    var titulo;
       	    if( params.isAndroid ) {
        	     titulo = "CUIDADO! SE CANCELARÁ LA ASISTENCIA!";
       	    }
       	    else{
        	     titulo = "CUIDADO! SE CANCELARÁ LA ASISTENCIA, Esto hará que no se le brinde la ayuda que está requiriendo...... ¿REALMENTE DESEA CANCELARLA?";
       	    }
         		 var opts = {	  
         		  options: ['SI, cancelar la asistencia', 'No, no quiero cancelar'],
         		  cancel: 1,
         		  destructive: 0,
         		  title: titulo
         		};
         		var dialog = Ti.UI.createOptionDialog(opts);
         		dialog.addEventListener('click',function(e) {
         		   if( e.index == 0 ) {
         			    Proceso_Cancelacion_Asistencia( win, expediente, winChat );
         			    return true;
         		   }
         	  });
         	  dialog.show();            
         });
         contenedor.add(btnCancela);
     }

    // 
    // Espaciado
    contenedor.add( Ti.UI.createView({ width: Ti.UI.FILL, height: '20dp' })  );        




}
exports.datos = datos;  




// ============================================================================================================
// Function   : 
// Parametros :
// Descripcion:
// ============================================================================================================
function Proceso_Cancelacion_Asistencia( win, expediente, winChat ) {


  preloader.show(win);
  var peticionHTTP = Ti.Network.createHTTPClient();
  peticionHTTP.onerror = function() {
	  			var responseText = this.responseText;
	  			Ti.API.info("Respuesta onerror: " + responseText);
	  			preloader.hide(win);
      Utiles.Alerta( "Error de comunicación con el servidor, por favor intentá mas tarde. \r\r");
  };
  peticionHTTP.onload =  function()  {
     var responseText = this.responseText;
     Ti.API.info('*** Respuesta de cancelacion: ' +  this.responseText + " = " + responseText );  
     if ( Utiles.Left(responseText,5) == "ERROR") {
        preloader.hide(win);
        Utiles.Alerta( "Ha ocurrido un error al intentar cancelar la asistencia..");
        return false;
     }     
     else  {         
         if( Utiles.Left(responseText,2) == "OK" ) {
            preloader.hide(win);
            try{
             winChat.close();
            }
            catch(e){
             Ti.API.info("*** No se pudo cerrar la ventana de chat");
            }
            try{
              win.close();
            }
            catch(e){
              Ti.API.info("*** No se pudo cerrar la ventana de datos");
            }
            Utiles.Alerta( "Su asistencia ha sido cancelada. \r\rExpediente: " + expediente );
            return true;   
         }
         else    {
            if( Utiles.Left(responseText,2) == "NO"  )  { 
               preloader.hide(win);
               var arrdatos = responseText.split("@");
               require("/src/vistas/HistorialProcesos").Actualizar();
               Utiles.Alerta( "No se pudo cancelar la asistencia debido a : " + arrdatos[1]);
               return true;
            }
            else  {
             preloader.hide(win);
             Utiles.Alerta( "Error desconocido, por favor intentá mas tarde");
             return false;   
            }
         }
     }       
  };
  peticionHTTP.open("POST", params.URLsiga );  
  var parametros = {  
         acc: 'CNC',
         tkn: Utiles.obtenerOpcion('deviceToken'),
         app: Titanium.App.name,
         ver: Titanium.App.version,
         exp: expediente,
         dsp: Utiles.obtener_id(),
         dos: Titanium.Platform.name,
         ced: Utiles.obtenerOpcion('cedula'),
         bdg: 0, // Enc(Titanium.UI.iPhone.getAppBadge())
        test: 1
  }; 
  peticionHTTP.send(parametros);  



}
