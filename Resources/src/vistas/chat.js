
var RevisaChat;
var textArea;
var expedienteChat;
var gridChat;
var contadorRenglones;

var sndEnviar;
var sndRecibir;
var sndSoltar;
//.

//
//
function Chat(win,expediente,datos){

    sndEnviar  = Ti.Media.createSound({url:"/sonidos/"+params.sonido_enviar});
    sndRecibir = Ti.Media.createSound({url:"/sonidos/"+params.sonido_recibir});
    sndSoltar  = Ti.Media.createSound({url:"/sonidos/"+params.sonido_soltar});

    win.addEventListener("close", function(){
       sndEnviar  = null;
       sndRecibir = null;
       sndSoltar  = null;
       clearInterval(RevisaChat);
    });

    win.backgroundColor = params.color7;
    var Button = require("src/common/Button");

    var vistaImagenInfo = Ti.UI.createView({
        height: '10%',
        width: '15%',
        top: 0, right: 0,
    });
    var imagenInfo = "/images/info.png";
    var btnInfo = Titanium.UI.createView({
        backgroundImage: imagenInfo,
        right: ( Utiles.hasIOSNotch() ) ? 25:5,
        width: 30,
        height: 30
    });
    vistaImagenInfo.addEventListener("click", function(){
        var winDatos = new GenericWindow("S","datos asistencia","/images/titulos/datosAsistencia.png");
    	   var vista = require("src/vistas/datosAsistencia");
    	   vista.datos( winDatos, datos, win );
   	    winDatos.open();
    });
    vistaImagenInfo.add(btnInfo);
    win.add(vistaImagenInfo);


    // Definimos el contenedor y el scroll
    var scroll = Ti.UI.createScrollView({
        top: '10%',
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
    });


    contadorRenglones = 1;
    gridChat= Titanium.UI.createTableView({
     		 separatorStyle: Ti.UI.TABLE_VIEW_SEPARATOR_STYLE_NONE,
     		 moveable: false,
     		 editable: false,
     		 top: 0,
        height: '91%'
   	});
   	gridChat.addEventListener("click", function(){
    	   Ti.API.info("*** click en la tabla");
    	   txtMensaje.fireEvent("return");
   	});
   	scroll.add(gridChat);


    // Control para capturar el texto que se enviará al chat
    var txtMensaje = Ti.UI.createTextField({
      borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
      keyboardType: Ti.UI.KEYBOARD_TYPE_ASCII,
     	color: params.color0,
     	font: { fontFamily: params.fuente_primaria, fontSize: 14 },
      hintText: 'Capture el texto para enviar al coordinador',
      hintTextColor:  params.color11,
      borderRadius: 5,
      borderWidth: 2,
      backgroundColor: params.color7,
      borderColor: params.color6,
      bottom: 3,
      left: '1%',
      width: '98%',
      height: '8%'
    });
    txtMensaje.addEventListener("return",function(){
       if( txtMensaje.value != "" ) {
        Enviar_Mensaje( txtMensaje.value, expediente );
        txtMensaje.value = '';
       }
    });
    scroll.add(txtMensaje);


    // Agregamos el scroll a la pagina
    win.add(scroll);

    // Revisamos el chat cada vez que obtenemos el foco
   	win.addEventListener("focus", function() {
        Ti.API.info("*** ventana de chat tiene el foco...");
    	   if( typeof(RevisaChat) == "undefined" ) {
           RevisaChat = setTimeout( function(){  RevisarNotificacionesChat( textArea, expediente ); }, params.tiempo_chat );
        }
   	});


    // Revisamos cada x tiempo para ver si hay que actualizar el listado
  	 RevisaChat = setTimeout( function(){  RevisarNotificacionesChat( textArea, expediente ); }, params.tiempo_chat );


    // La primera vez se tienen que descargar los mensajes
    // Revisar_Mensajes_Chat( textArea, expediente );
    Recibir_Mensajes( win, textArea, expediente );


}
exports.Chat = Chat;


// ============================================================================================================
// Function   :
// Parametros :
// Descripcion:
// ============================================================================================================
function Recibir_Mensajes( win, textArea, expediente ) {
   preloader.show(win);
   var peticionHTTP = Ti.Network.createHTTPClient();
   peticionHTTP.open( 'POST', params.URLsiga );
   var parametros = {
       tkn: Utiles.obtenerOpcion('deviceToken'),
       app: Titanium.App.name,
       ver: Titanium.App.version,
       acc: 'RCH',
       dos: Titanium.Platform.name,
       bdg: 0, // Enc(Titanium.UI.iPhone.getAppBadge()),
       exp: expediente,
      test: 1
   };
   peticionHTTP.onerror = function() {
        preloader.hide(win);
        MensajeChat("ERROR DE COMUNICACION!! NO SE PUDIERON LEER TUS MENSAJES DE CHAT!! ", "ERROR" );
        return false;
   };
   peticionHTTP.send(parametros);
   peticionHTTP.onload = function()  {
        preloader.hide(win);
        var responseText = this.responseText;
        Ti.API.info("*** Recibiendo mensajes chat del servidor : " + responseText );
        if ( Utiles.Left(responseText.toString(),5) == "ERROR") {
            MensajeChat("HUBO UN ERROR EN EL SERVIDOR Y NO SE PUDIERON RECIBIR TUS MENSAJES ! ", "ERROR");
            return false;
        }
        else  {
            if( responseText == "0" ) {
                Ti.API.info("*** No hay chats...");
                return false;
            }
            var longitud = 0;
            try {
              var json = JSON.parse(unescape(this.responseText));
   	          var json = json.datos;
   	          longitud = json.length ;
   	        }
   	        catch(err) {
    	         return false;
   	        }
   	        var pos;
   	        for( pos=0; pos < json.length; pos++) {
   	           fecha_hora   = json[pos].fecha_hora ;
   	           tipo         = json[pos].tipo ;
   	           texto        = json[pos].texto ;
   	           MensajeChat( Utiles.FechaCadena(fecha_hora), "LABEL" );
   	           if( tipo == "E" ) {
   		            MensajeChat(texto,"ENVIAR");
   	           }
   	           else {
   		            MensajeChat(texto,"RECIBIR");
   	           }
   	        }
        }
   };
}	;



// ============================================================================================================
// Function   :
// Parametros :
// Descripcion:
// ============================================================================================================
function MensajeChat( texto, tipo ) {

   var colorTexto = "";
   var colorFondo = "";
   var fuente     = "";
   var alineacion = "";

   switch(tipo){
      case "ERROR"  : alineacion =  Titanium.UI.TEXT_ALIGNMENT_CENTER ;colorTexto = "white"                  ; colorFondo="red"  ; fuente=params.fuente_primaria; break;
      case "LABEL"  : alineacion =  Titanium.UI.TEXT_ALIGNMENT_CENTER ;colorTexto = params.color11  ; colorFondo = params.color7  ; fuente=params.fuente_primaria; break;
      case "ENVIAR" : alineacion =  Titanium.UI.TEXT_ALIGNMENT_RIGHT  ;colorTexto = params.color2  ; colorFondo = params.color7  ; fuente=params.fuente_primaria      ; break;
      case "RECIBIR": alineacion =  Titanium.UI.TEXT_ALIGNMENT_LEFT   ;colorTexto = params.color3  ; colorFondo = params.color7  ; fuente=params.fuente_primaria     ; break;
   }

   var row = Ti.UI.createTableViewRow( {
      backgroundColor: colorFondo,
      height: 'auto'
    } );

   var lblChat = Ti.UI.createLabel({
   			color: colorTexto,
   			textAlign: alineacion,
   			font: { fontFamily: params.fuente_primaria, fontSize: 14  },
   			height: 'auto',
   			width: '90%',
   			text: texto
   });
   row.add(lblChat);
   try{
   gridChat.appendRow( row );
   contadorRenglones++;
   }
   catch(e){
     Ti.API.info("*** No se pudo crear el renglon");
   }

   var row = Ti.UI.createTableViewRow( { backgroundColor: params.color7, height: '20px' } );
   gridChat.appendRow( row );
   contadorRenglones++;

   gridChat.scrollToIndex( contadorRenglones-1 );

}


// ============================================================================================================
// Function   : RevisarNotificacionesChat
// Parametros : textArea=El control del chat    expediente=El numero de exp
// Descripcion: Se encarga de monitorear si han llegado PUSH de chat para actualizar el listado.
// ============================================================================================================
function RevisarNotificacionesChat( textArea, expediente )  {
  Ti.API.info("*** Revisando mensajes de chat del expediente " + expediente );
  Revisar_Mensajes_Chat( textArea, expediente );
  RevisaChat = setTimeout( function(){  RevisarNotificacionesChat( textArea, expediente ); }, params.tiempo_chat );
}
// ============================================================================================================
// Function   :
// Parametros :
// Descripcion:
// ============================================================================================================
function Revisar_Mensajes_Chat( textArea, expediente ) {
  Ti.App.Properties.setString('ActualizarChat','N');
  var peticionHTTP = Ti.Network.createHTTPClient();
   peticionHTTP.open( 'POST', params.URLsiga );
   var parametros = {
       tkn: Utiles.obtenerOpcion('deviceToken'),
       app: Titanium.App.name,
       ver: Titanium.App.version,
       dos: Titanium.Platform.name,
       acc: 'LCH',
       bdg: 0, // Enc(Titanium.UI.iPhone.getAppBadge()),
       exp: expediente,
      test: 1
   };
   peticionHTTP.onerror = function()  {
        MensajeChat("-- ERROR DE COMUNICACION!! NO SE PUDIERON LEER TUS MENSAJES DE CHAT!! ", "ERROR" );
        Ti.App.Properties.setString('ActualizarChat','N');
        return false;
   } ;
   peticionHTTP.send(parametros);
   peticionHTTP.onload = function()  {
        Ti.App.Properties.setString('ActualizarChat','N');
        var responseText = this.responseText;
        if ( Utiles.Left(responseText,5) == "ERROR") {
            MensajeChat("-- HUBO UN ERROR EN EL SERVIDOR Y NO SE PUDIERON RECIBIR TUS MENSAJES ! ", "ERROR");
            return false;
        }
        else  {
            if( responseText != "0" )  {
  	            var json = JSON.parse(unescape(this.responseText));
     		        var json = json.datos;
     		        var pos;
     		        for( pos=0; pos < json.length; pos++) {
     		           fecha_hora   = json[pos].fecha_hora ;
     		           tipo         = json[pos].tipo ;
     		           texto        = json[pos].texto ;
     		           MensajeChat( Utiles.FechaCadena(fecha_hora), "LABEL" );
     		           if( tipo == "E" ) {
     		           }
     		           else {
     			           MensajeChat(texto,"RECIBIR");
     			           sndRecibir.play();
     		           }
     		        }
	           }
	           else{
 	             Ti.API.info("*** No hay mensajes de chat");
	           }
        }
   }  ;
}
// ============================================================================================================
// Function   : Enviar_Mensaje
// Parametros : textArea=El control del chat     texto=El texto enviado      expediente=El numero de exp
// Descripcion: Envia el mensaje de chat al servidor para registrarlo
// ============================================================================================================
function Enviar_Mensaje( texto, expediente ) {

   Ti.API.info("*** Enviando mensaje del expediente: " + expediente );
   MensajeChat( Utiles.FechaCadena( Utiles.obtener_fecha_hoy() + " " + Utiles.obtener_hora()), "LABEL" );
   MensajeChat( texto,"ENVIAR" );

   var peticionHTTP = Ti.Network.createHTTPClient();
   peticionHTTP.open( 'POST', params.URLsiga );
   var parametros = {
       acc: 'ECH',
       tkn: Utiles.obtenerOpcion('deviceToken'),
       app: Titanium.App.name,
       ver: Titanium.App.version,
       exp: expediente,
       dos: Titanium.Platform.name,
       bdg: 0,
       tex: texto,
      test: 1
   };
   peticionHTTP.onerror = function() {
        MensajeChat(texto,"ERROR DE COMUNICACION!! NO SE PUDO ENVIAR TU MENSAJE DE CHAT!! ","ERROR");
        return false;
   } ;
   peticionHTTP.send(parametros);
   peticionHTTP.onload = function()  {
        var responseText = this.responseText;
        Ti.API.info("*** Respuesta servidor CHAT: " + responseText );
        if (Utiles.Left(responseText,5) == "ERROR")  {
            MensajeChat( "HUBO UN ERROR EN EL SERVIDOR Y NO SE PUDO ENTREGAR TU MENSAJE !", "ERROR" );
            return false;
        }
        if(Utiles.Left(responseText,2) == 'OK')  {
          sndEnviar.play();
        }
   };
}
