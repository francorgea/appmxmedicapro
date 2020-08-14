
//
//
//
function registro(win){
  
    var Button = require("src/common/Button");
    var Input = require("src/common/InputNS");
    
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
             style:Titanium.UI.iOS.SystemButtonStyle.PLAIN,
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
               if(indiceInput>=6){
                 indiceInput = 6;
               }
             }
             switch(indiceInput){
                case 0: jNombres.input.focus(); break;
                case 1: jApellidos.input.focus(); break;
                case 2: jIdentificacion.input.focus(); break;
                case 3: jTelefono.input.focus(); break;
                case 4: jEmail.input.focus(); break;
                case 5: jPassword.input.focus(); break;
                case 6: jConfirmar.input.focus(); break;             
             }
         });      
         aceptar.push(null);         
         aceptar[x] = Titanium.UI.createButtonBar({
             labels:['Aceptar'],
             backgroundColor: params.color1,
             top:100,
             style:Titanium.UI.iOS.SystemButtonStyle.PLAIN,
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
             jPassword.input.blur(); 
             jConfirmar.input.blur(); 
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
             jPassword.input.blur(); 
             jConfirmar.input.blur(); 
           }
           catch(e){
             Ti.API.info("*** Estamos iniciando");
           }
         }
      });
   }
    
    
    
        
    // Nombres 
    var jNombres = new Input("Nombres",'90%','A','N');
    if( !params.isAndroid ) jNombres.input.keyboardToolbar = [ navButtons[0], flexSpace[0], aceptar[0] ];   
    jNombres.input.addEventListener("focus", function(){  indiceInput = 0;  });
    contenedor.add(jNombres.view);    
    
    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 }));    
        
    // Apellidos 
    var jApellidos = new Input("Apellidos",'90%','A','N');
    if( !params.isAndroid ) jApellidos.input.keyboardToolbar = [ navButtons[1], flexSpace[1], aceptar[1] ];   
    jApellidos.input.addEventListener("focus", function(){  indiceInput = 1;  });                
    contenedor.add(jApellidos.view);

    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 }));             
    
    // Identificacion 
    var jIdentificacion = new Input("Código de usuario",'90%','A','N');
    if( !params.isAndroid ) jIdentificacion.input.keyboardToolbar = [ navButtons[2], flexSpace[2], aceptar[2] ];   
    jIdentificacion.input.addEventListener("focus", function(){  indiceInput = 2;  });            
    contenedor.add(jIdentificacion.view);
    
    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 })); 
    
    // Telefono 
    var jTelefono = new Input("Teléfono",'90%','T','N');
    if( !params.isAndroid ) jTelefono.input.keyboardToolbar = [ navButtons[3], flexSpace[3], aceptar[3] ];   
    jTelefono.input.addEventListener("focus", function(){  indiceInput = 3;  });                    
    contenedor.add(jTelefono.view);    
    
    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 })); 
    
    // Email 
    var jEmail = new Input("Email",'90%','E','N');
    if( !params.isAndroid ) jEmail.input.keyboardToolbar = [ navButtons[4], flexSpace[4], aceptar[4] ];   
    jEmail.input.addEventListener("focus", function(){  indiceInput = 4;  });                    
    contenedor.add(jEmail.view);

    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 }));     
            
        
    // Contraseña 
    var jPassword = new Input("Contraseña",'90%','A','S');
    if( !params.isAndroid ) jPassword.input.keyboardToolbar = [ navButtons[5], flexSpace[5], aceptar[5] ];   
    jPassword.input.addEventListener("focus", function(){  indiceInput = 5;  });    
    contenedor.add(jPassword.view);

    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 })); 
        
    // Contraseña 
    var jConfirmar = new Input("Confirmar contraseña",'90%','A','S');
    if( !params.isAndroid ) jConfirmar.input.keyboardToolbar = [ navButtons[6], flexSpace[6], aceptar[6] ];   
    jConfirmar.input.addEventListener("focus", function(){  indiceInput = 6;  });        
    contenedor.add(jConfirmar.view);
    

    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 })); 
        
    
    // Boton para registrar la cuenta
    var btnRegistrar = new Button("Registrar",params.color1,'90%');     
    btnRegistrar.addEventListener("click", function(){    
         if(jNombres.input.value==""){
            Utiles.Alerta("Debes capturar tu nombre completo");
            return false;
         }
         if(jApellidos.input.value==""){
            Utiles.Alerta("Por favor captura tus apellidos");
            return false;
         }
         if(jIdentificacion.input.value==""){
            Utiles.Alerta("Por favor captura tus código de usuario");
            return false;
         }
         if(jTelefono.input.value==""){
            Utiles.Alerta("Por favor captura tus número de teléfono");
            return false;
         }
         if(jEmail.input.value==""){
           Utiles.Alerta("Por favor captura tu email");
           return false;
         }
         if(!Utiles.validateEmail(jEmail.input.value)){
           Utiles.Alerta("El Email capturado NO es válido");
           return false;
         }         
         if(jPassword.input.value==""){
            Utiles.Alerta("Por favor captura tu contraseña");
            return false;
         }
         if(jConfirmar.input.value==""){
            Utiles.Alerta("Por favor confirma tu contraseña");
            return false;
         }
         if(jConfirmar.input.value!=jPassword.input.value){
            Utiles.Alerta("Tu contraseña y la confirmación deben ser iguales");
            return false;
         }
         preloader.show(win);
         
         var peticionHTTP = Ti.Network.createHTTPClient();
         peticionHTTP.onerror = function(e) {
             preloader.hide(win);
             Utiles.Alerta("Error de comunicación con el servidor, verifica tu conexión a internet y prueba de nuevo.");
         };
         peticionHTTP.onload =  function()      {
             var resultado = this.responseText;
             Ti.API.info(resultado);
             try{
               var json = JSON.parse(unescape(resultado));
             }
             catch(e){
               preloader.hide(win);
               Utiles.Alerta( "Error al intentar registrar tus datos" );
               return false;         
             }
             if(json.estado!=200){
               preloader.hide(win);
               Utiles.Alerta(json.noticias);
               return false;
             }
             win.close();
             Utiles.Alerta("Su registro se ha realizado de manera satisfactoria, ya puede iniciar sesión");
         };
         peticionHTTP.open("POST", params.URLregistro );  
         var parametros = {
               cedula: jIdentificacion.input.value,
                clave: jPassword.input.value,
               correo: jEmail.input.value,
               nombre: jNombres.input.value,
             apellido: jApellidos.input.value,
             telefono: jTelefono.input.value,
         };
         peticionHTTP.setRequestHeader("AppKey",params.APPkey);
         peticionHTTP.setRequestHeader("Authorization","");    
         Ti.API.info("*** URL: " + params.URLregistro );     
         peticionHTTP.send(parametros);
    });

    contenedor.add(btnRegistrar);

    // Espacio
    contenedor.add(Ti.UI.createView({ height: 50 }));     

}
exports.registro = registro;  
