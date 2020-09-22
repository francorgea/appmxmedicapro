
var e1, e2,e3,e4,e5;
var calificacion;
//
//
//
function Calificar(win,expediente,servicio,winAnterior){ 
  
    calificacion = 0;
    win.backgroundColor = params.color7;
    var Button = require("src/common/Button");
    
    // Definimos el contenedor y el scroll
    var scroll = Ti.UI.createScrollView({
        top: '10%',
        width: '98%',
        width: Ti.UI.FILL,  
    });
    var contenedor = Ti.UI.createView({
        top: 0,
        layout: 'vertical',
        width: '98%',
        height: Ti.UI.SIZE,
    });
    scroll.add(contenedor);
    win.add(scroll);
    

    // 
    // Espaciado
    contenedor.add( Ti.UI.createView({ width: Ti.UI.FILL, height: '25dp' })  );    

    // Version de la app
    var lblTexto = Ti.UI.createLabel({
        width: '90%',
        text: "¿ Cómo te atendimos ?  Por favor califica la atención recibida.",
        color: params.color1,
        font: { fontFamily: params.fuente_primaria, fontSize: 18  }
    });
    contenedor.add(lblTexto);
    
    
    // 
    // Espaciado
    contenedor.add( Ti.UI.createView({ width: Ti.UI.FILL, height: '20dp' })  );    
    
    
    
  	 // Estrellas para calificar	
  	 var contenedorEstrellas = Ti.UI.createView({
   	    width: '90%',
   	    height: Ti.UI.SIZE,
   	    layout: 'horizontal',
  	 });
  	 contenedor.add(contenedorEstrellas);
   	e1 = Ti.UI.createImageView({
     		image: params.estrella_off,
     		//left:2,
     		height:55,
     		width:55
   	});
    contenedorEstrellas.add(e1);
    e1.addEventListener("click", function() {
   	   encender_estrellas(1);
    });
    e2 = Ti.UI.createImageView({
     		image: params.estrella_off,
     		//left:62,
     		height:55,
     		width:55
   	});
    e2.addEventListener("click", function() {
   	   encender_estrellas(2);
    });
    contenedorEstrellas.add(e2);
    e3 = Ti.UI.createImageView({
     		image: params.estrella_off,
     		//left:122,
     		height:55,
     		width:55
   	});
    e3.addEventListener("click", function() {
   	   encender_estrellas(3);
    });
    contenedorEstrellas.add(e3);
    e4 = Ti.UI.createImageView({
     		image: params.estrella_off,
     		// left:182,
     		height:55,
     		width:55
   	});
    e4.addEventListener("click", function() {
   	   encender_estrellas(4);
    });		
    contenedorEstrellas.add(e4);
    e5 = Ti.UI.createImageView({
     		image: params.estrella_off,
     		// left:242,
     		height:55,
     		width:55
   	});
    e5.addEventListener("click", function() {
   	   encender_estrellas(5);
    });
    contenedorEstrellas.add(e5);	 	 
    

    // 
    // Espaciado
    contenedor.add( Ti.UI.createView({ width: Ti.UI.FILL, height: '20dp' })  );    



   	// Mas información
   	var lblMas = Ti.UI.createLabel({
   	 	 text: 'Comentarios:' ,
   	 	 color: params.color1, // IsAndroid() ? color_texto_titulo : color_barra,			
   	 	 width: '90%',
   	 	 height: 'auto',
   	 	 textAlign: 'left',
   	});
   	contenedor.add(lblMas);

    // Marco para el input
   	var viewInput = Ti.UI.createView({
        borderRadius: 5,
        borderWidth: 2,
        backgroundColor: params.color7,
        borderColor: params.color6,
        width: '90%',
        height: 150,
   	});
   	contenedor.add(viewInput); 
   	
    var textMas = Ti.UI.createTextArea({
          font: { fontFamily: params.fuente_primaria, fontSize: 14 },
          tintColor: params.color0,
          autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
          autocorrect: false,
          borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
          color: params.color0,
          width: '90%',
          height: '90%'
     });
     viewInput.add(textMas);
   	
    // 
    // Espaciado
    contenedor.add( Ti.UI.createView({ width: Ti.UI.FILL, height: '20dp' })  );    

    btnEnviar = new Button("Enviar Calificación",params.color1,'90%');
    btnEnviar.addEventListener("click", function(){
     
     
     
          if( calificacion == 0 ) {
     	      Utiles.Alerta("Selecciona una o mas estrellas para la calificación");
     	      return false;
          }  
          preloader.show(win);
          var peticionHTTP = Ti.Network.createHTTPClient();
          peticionHTTP.onerror = function() {
              preloader.hide(win);
              Utiles.Alerta(  "Error de comunicación con el servidor, por favor intentá de nuevo.");
          };
          peticionHTTP.onload =  function()  {
             var responseText = this.responseText;
             if ( Utiles.Left(responseText,5) == "ERROR") {
                preloader.hide( win );
                Utiles.Alerta(  "No se registró la calificación. Por favor intentá de nuevo.");
             }     
             else {
                preloader.hide( win );
                winAnterior.close();
                win.close();
                // Ti.App.db.execute("DELETE FROM llegada_push WHERE numexped=?",expediente);
                require("/src/vistas/HistorialProcesos").Actualizar();
                Utiles.Alerta(  "Gracias por tu evaluación y comentarios.");          
             }       
          };
          peticionHTTP.open("POST", params.URLsiga );  
          var parametros = {  
              acc: 'C',
              tkn: Utiles.obtenerOpcion('deviceToken'),
              app: Titanium.App.name,
              ver: Titanium.App.version,
              cal: calificacion,
              tex: textMas.value,
              dos: Titanium.Platform.name,
              exp: expediente,
              srv: servicio,
              ben: Utiles.obtenerOpcion('nombre'),
              ced: Utiles.obtenerOpcion('cedula'),
              tel: Utiles.obtenerOpcion('telefono'),
              bdg: 0, // Enc(Titanium.UI.iPhone.getAppBadge())
             test: 1
          };  
          peticionHTTP.send(parametros);  
          



     
     
     
     
    });
    
    
    
    contenedor.add(btnEnviar);
    
    contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 250  }));

    

}
exports.Calificar = Calificar;  





// **************************************************************************	 
function apagar_estrellas() {
  e1.image = params.estrella_off;
  e2.image = params.estrella_off;
  e3.image = params.estrella_off;
  e4.image = params.estrella_off;
  e5.image = params.estrella_off;
}	 
// **************************************************************************
function encender_estrellas(n) { 
    apagar_estrellas();
    switch(n) {
	    case 1: e1.image = params.estrella_on; 
	            calificacion = 1;
	            break;
	    case 2: e1.image = params.estrella_on;
	            e2.image = params.estrella_on;
	            calificacion = 2;
	            break;
	    case 3: e1.image = params.estrella_on;
	            e2.image = params.estrella_on;
	            e3.image = params.estrella_on;
	            calificacion = 3;
	            break;        
	    case 4: e1.image = params.estrella_on;
	            e2.image = params.estrella_on;
	            e3.image = params.estrella_on;
	            e4.image = params.estrella_on;
	            calificacion = 4;
	            break;
	    case 5: e1.image = params.estrella_on;
	            e2.image = params.estrella_on;
	            e3.image = params.estrella_on;
	            e4.image = params.estrella_on;
	            e5.image = params.estrella_on;
	            calificacion = 5;
	            break;
    }
}

