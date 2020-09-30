
//
//
//
function Mostrar(win){
 
  var json = { 
      id: null,
      cedula: Utiles.obtenerOpcion('cedula'),
      nombre: Utiles.obtenerOpcion('nombre'),
      apellidos: Utiles.obtenerOpcion('apellidos'),
      telefonos: Utiles.obtenerOpcion('telefono'),
      correos: Utiles.obtenerOpcion('email'),
      firmado: Utiles.obtenerOpcion('firmado'),
  };
  MostrarDatos(win,json);
 
 
}

//
//
//
function MostrarDatos(win,json){
 
    var mensajeOK = "\nServicio activo, puedes solicitar asistencias.\n";
  
    var id = json.id;
  
    var Button = require("src/common/Button");
    var Input = require("src/common/InputNS");
    var ComboVista = require("src/common/ComboVista");
    
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
    
    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 })); 
    
    
   // Control del teclado, anterior, siguiente, aceptar 
   if( !params.isAndroid )  {
      var navButtons = [];
      var aceptar = [];
      var flexSpace = [];
      for(x=0;x<=6;x++){
         flexSpace.push(null);
         flexSpace[x] = Titanium.UI.createButton({
             systemButton: Ti.UI.iOS.SystemButton.FLEXIBLE_SPACE
         }); 
         navButtons.push(null);
         navButtons[x] = Titanium.UI.createButtonBar({
             labels:['Anterior','Siguiente'],
             backgroundColor: params.color1,
             top:100,
             height:25,
             width:'auto'
         });      
         navButtons[x].addEventListener("click",function(e){
             if(e.index==0){
               indiceInput--;
               Ti.API.info("*** Regresar");
               if(indiceInput<=0){
                 indiceInput = 0;
               }
             }
             if(e.index==1){
               indiceInput++;
               Ti.API.info("*** Avanzar");
               if(indiceInput>4){
                 indiceInput = 4;
               }
             }
             switch(indiceInput){
                case 0: jIdentificacion.input.focus(); break;
                case 1: jNombres.input.focus(); break;
                case 2: jApellidos.input.focus(); break;                
                case 3: jTelefono.input.focus(); break;
                case 4: jEmail.input.focus(); break;
             }
         });      
         aceptar.push(null);         
         aceptar[x] = Titanium.UI.createButtonBar({
             labels:['Aceptar'],
             backgroundColor: params.color1,
             top:100,
             height:25,
             width:'auto',
         });      
         aceptar[x].addEventListener("click", function(){
             Ti.API.info("*** Cerrar todos los teclados");
             jNombres.input.blur(); 
             jApellidos.input.blur(); 
             jIdentificacion.input.blur(); 
             jTelefono.input.blur();
             jEmail.input.blur();
             jIdentificacion.input.fireEvent("return");
         });
      }
      contenedor.addEventListener("click", function(e){
         Ti.API.info(e);
         if(e.source != "[object TiUITextField]" ){
          try{
             jNombres.input.blur(); 
             jApellidos.input.blur();      
             jIdentificacion.input.blur();  
             jTelefono.input.blur();
             jEmail.input.blur();   
           }
           catch(e){
             Ti.API.info("*** Estamos iniciando");
           }
         }
      });
   }
    

    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 }));        
    
    var vistaInfo = Ti.UI.createView({
        width: '90%',
        height: Ti.UI.SIZE,
        backgroundColor: '#fef0bb',
        borderColor: '#e1d6a6',
        borderRadius: 10,
    });
    var lblInfo = Ti.UI.createLabel({
        text: "\nCaptura tu código de usuario para validarlo y verificar que puedas solicitar asistencias\n",
        font: { fontFamily: params.fuente, fontSize: 12 },
        color: params.color0,
        textAlign: 'center',
        width: '90%',
        height: Ti.UI.SIZE
    });
    if(json.firmado=="S"){
      lblInfo.text = mensajeOK;
    }    
    /*
    if(Utiles.obtenerOpcion("resultado_registro")==""){
      lblInfo.text = "\nCaptura tu código de usuario para validarlo y verificar que puedas solicitar asistencias\n";
    }
    */
    vistaInfo.add(lblInfo);
    contenedor.add(vistaInfo);     
    
    contenedor.add(Ti.UI.createView({ height: 10 }));             
         
    
    // Identificacion 
    var jIdentificacion = new Input("Código de usuario",'90%','A','N');
    if( !params.isAndroid ) jIdentificacion.input.keyboardToolbar = [ navButtons[0], flexSpace[0], aceptar[0] ];   
    jIdentificacion.input.addEventListener("focus", function(){  indiceInput = 0;  });            
    jIdentificacion.input.value = json.cedula;
    jIdentificacion.input.addEventListener("return", function(){
       
       
    });
    /*
    if(json.firmado=="S"){
      jIdentificacion.input.enabled = false;
    }
    */
    contenedor.add(jIdentificacion.view);    

    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 }));                 
    
            
    // Nombres 
    var jNombres = new Input("Nombres",'90%','A','N');
    if( !params.isAndroid ) jNombres.input.keyboardToolbar = [ navButtons[1], flexSpace[1], aceptar[1] ];   
    jNombres.input.addEventListener("focus", function(){  indiceInput = 1;  });
    jNombres.input.value = json.nombre;
    // jNombres.input.enabled = ( json.firmado=="S" ) ? true : false;
    contenedor.add(jNombres.view);    
    
    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 }));    
        
    // Apellidos 
    var jApellidos = new Input("Apellidos",'90%','A','N');
    if( !params.isAndroid ) jApellidos.input.keyboardToolbar = [ navButtons[2], flexSpace[2], aceptar[2] ];   
    jApellidos.input.addEventListener("focus", function(){  indiceInput = 2;  });                
    jApellidos.input.value = json.apellidos;
    // jApellidos.input.enabled = ( json.firmado=="S" ) ? true : false;
    contenedor.add(jApellidos.view);

    
    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 })); 
    
    // Telefono 
    var jTelefono = new Input("Teléfono",'90%','T','N');
    if( !params.isAndroid ) jTelefono.input.keyboardToolbar = [ navButtons[3], flexSpace[3], aceptar[3] ];   
    jTelefono.input.addEventListener("focus", function(){  indiceInput = 3;  });                    
    jTelefono.input.value = json.telefonos;
    // jTelefono.input.enabled = ( json.firmado=="S" ) ? true : false;
    contenedor.add(jTelefono.view);    
    
    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 })); 
    
    // Email 
    var jEmail = new Input("Email",'90%','E','N');
    if( !params.isAndroid ) jEmail.input.keyboardToolbar = [ navButtons[4], flexSpace[4], aceptar[4] ];   
    jEmail.input.addEventListener("focus", function(){  indiceInput = 4;  }); 
    jEmail.input.value = json.correos; 
    // jEmail.input.enabled = ( json.firmado=="S" ) ? true : false;                  
    contenedor.add(jEmail.view);
    

    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 }));     
              
    // Boton para registrar la cuenta
    var btnRegistrar = new Button("Actualizar datos",params.color1,'90%');     
    btnRegistrar.enabled = true; // ( json.firmado=="S" ) ? true : false;
    btnRegistrar.addEventListener("click", function(){    
     
         if(jIdentificacion.input.value==""){
            Utiles.Alerta("Debes capturar tu código de usuario");
            return false;
         }
         if(jNombres.input.value==""){
            Utiles.Alerta("Debes capturar tu nombre");
            return false;
         }
         if(jApellidos.input.value==""){
            Utiles.Alerta("Por favor captura tus apellidos");
            return false;
         }         
         if(jTelefono.input.value==""){
            Utiles.Alerta("Por favor captura tu número de teléfono");
            return false;
         }
         if(jEmail.input.value!=""){
            if(!Utiles.validateEmail(jEmail.input.value)){
              Utiles.Alerta("El Email capturado NO es válido");
              return false;
            }        
         }         
         preloader.show(win);
         var peticionHTTP = Ti.Network.createHTTPClient();
         peticionHTTP.onerror = function(e)   {             
             preloader.hide(win);
             Utiles.Alerta( "Error de comunicación con el servidor, por favor intenta mas tarde. \n\n" +   + e.error );             
         };
         peticionHTTP.onload =  function() 
         {
            var resultado = this.responseText;
            preloader.hide(win);
		          Ti.API.info("*** RESULTADO: " + resultado );
		          if(resultado=='NX'){
               lblInfo.text = "\nEl código de usuario proporcionado no coincide con nuestros registros. Asegúrate de capturarlo correctamente e intenta de nuevo\n";
               lblInfo.color = params.color8;
   		          Utiles.grabarOpcion('firmado','N');
   		          Utiles.grabarOpcion('plan_siga','');        
   		          Utiles.grabarOpcion('resultado_registro',resultado);
               return false;
		          }		          
		          var datos   = resultado.split('@');
		          var estatus = datos[0];
		          if(estatus!="AC"){
               lblInfo.text = "\nEl código de usuario proporcionado no se encuentra activo!\n";
               lblInfo.color = params.color8;
               Utiles.grabarOpcion('resultado_registro',estatus);
   		          Utiles.grabarOpcion('firmado','N');
   		          Utiles.grabarOpcion('plan_siga','');                       
               return false; 		          
		          }
		          var plan    = datos[1];
		          var mensaje = mensajeOK;
		          lblInfo.text = mensaje;
		          lblInfo.color = params.color0;
		          Utiles.grabarOpcion('firmado','S');
		          Utiles.grabarOpcion('plan_siga',plan);
		          Utiles.grabarOpcion('resultado_registro','AC');		          
            Utiles.grabarOpcion("nombre"    , jNombres.input.value   );
            Utiles.grabarOpcion("apellidos" , jApellidos.input.value   );
            Utiles.grabarOpcion("cedula"    , jIdentificacion.input.value   );
            Utiles.grabarOpcion("telefono"  , jTelefono.input.value );     	 
            Utiles.grabarOpcion("email"     , jEmail.input.value );  
		          json.firmado = "S";
		          jNombres.input.enabled = true;
		          jApellidos.input.enabled = true;
		          jTelefono.input.enabled = true;
		          jEmail.input.enabled = true;
		          btnRegistrar.enabled = true;		          
		          win.close();
         };
         peticionHTTP.open("POST", params.URLsiga );  
         var parametros = {  
                acc: 'VLDT',
                tkn: Utiles.obtenerOpcion('deviceToken'),
                app: Titanium.App.name,
                ver: Titanium.App.version,
                dsp: Utiles.obtener_id(),
                dos: Titanium.Platform.name,
                tel: jIdentificacion.input.value,
                cta: params.cuenta_siga,
                bdg: 0,
                test:1
         };  
         peticionHTTP.send(parametros);      

    });
    contenedor.add(btnRegistrar);

    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 }));     
    
    // Boton para cerrar sesion
    var btnCerrarSesion = new Button("Cerrar sesión",params.color8,'90%');
    btnCerrarSesion.addEventListener("click", function(){
         Utiles.grabarOpcion("nombre"    , '' );
         Utiles.grabarOpcion("apellidos" , '' );
         Utiles.grabarOpcion("cedula"    , '' );
         Utiles.grabarOpcion("telefono"  , '' );     	 
         Utiles.grabarOpcion("email"     , '' );        
         Utiles.grabarOpcion('firmado'   , '' );
         Utiles.grabarOpcion('plan_siga' , '' );
         win.close();
         Utiles.Alerta("Sesión concluida");
    })
    
//    Utiles.registrarEnServidor( 'xxx' );
    
    if(json.firmado=="S"){
      contenedor.add(btnCerrarSesion);
    }
    

    // Espacio
    contenedor.add(Ti.UI.createView({ height: 50 }));     

}
exports.Mostrar = Mostrar;  
