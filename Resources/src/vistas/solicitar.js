
var layoutContainer;
var data;
var datosUsuario;
var arregloAutos = [];
//
//
//
function Solicitar(win, tituloAsistencia, arregloOpciones, EsAsistenciaVial ) {
 
   Ti.API.info("*** Paso 1"); 
   
   var json = { 
       id: null,
       cedula: Utiles.obtenerOpcion('cedula'),
       nombre: Utiles.obtenerOpcion('nombre'),
       apellidos: Utiles.obtenerOpcion('apellidos'),
       telefono: Utiles.obtenerOpcion('telefono'),
       correos: Utiles.obtenerOpcion('email')
   };      
   datosUsuario = json;      
   
   
   ChecarVehiculos(win, tituloAsistencia, arregloOpciones, EsAsistenciaVial);
   
}
//
//
// 
function ChecarVehiculos(win, tituloAsistencia, arregloOpciones, EsAsistenciaVial) {
   
   /*     
   var query = "SELECT * FROM vehiculos ";
   var rows = Ti.App.db.execute(query);
   var json = { id:0, marca:"", modelo:"", version:"", color:"", placa:"", axo:"" };
    
   while(rows.isValidRow()) {
       json.id     = rows.fieldByName("id") ;
       json.marca  = rows.fieldByName("marca") ;
       json.modelo = rows.fieldByName("modelo") ;
       json.axo    = rows.fieldByName("axo") ;
       json.color  = rows.fieldByName("color") ;
       json.placa  = rows.fieldByName("placas") ;
       agregarAutoListado(win, tablaDatos, json );
       arregloAutos.push( json );
       rows.next();
   }
   rows.close(); 
   */
   
   Ti.API.info("*** Paso 3");
   
   SolicitarMuestraVentana(win, tituloAsistencia, arregloOpciones, EsAsistenciaVial );
 
}
//
//
//
function SolicitarMuestraVentana(win, tituloAsistencia, arregloOpciones, EsAsistenciaVial ){
      
    var Button     = require("src/common/Button");
    var Input      = require("src/common/InputNS");
    var ComboVista = require("src/common/ComboVista");
    
    Ti.API.info("*** Paso 4");

    var scroll = Ti.UI.createScrollView({
        top: '15%',
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
    
    data = [];
    
    // Al cerrar la ventana finalizaremos el monitoreo
    win.addEventListener("close", function() {
        Ti.API.info("*** Finalizando coordenadas");
	       Titanium.Geolocation.removeEventListener("location", function(){ Ti.API.info("*** Eliminando getLocation"); });   
    });    
    
    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 }));    
    
    // Nombre 
    var jNombres = new Input("Solicita:",'90%','A','N');
    contenedor.add(jNombres.view);    
    jNombres.input.value = datosUsuario.nombre + " " + datosUsuario.apellidos;

    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 }));    

    // Telefono 
    var jTelefono = new Input("Teléfono:",'90%','A','N');
    contenedor.add(jTelefono.view);    
    jTelefono.input.value = datosUsuario.telefono;

    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 }));    

    // Necesidad 
    var jExplique = new Input("Explique su necesidad:",'90%','A','N');
    contenedor.add(jExplique.view);    
    

    if( EsAsistenciaVial ) {
       contenedor.add(Ti.UI.createView({ height: 10 }));   
       if(arregloAutos.length==0){
         Utiles.grabarOpcion("idauto","");
         Utiles.grabarOpcion("marca","");
         Utiles.grabarOpcion("modelo","");
         Utiles.grabarOpcion("axo","");
         Utiles.grabarOpcion("color","");
         Utiles.grabarOpcion("placas","");
         autoMostrar = "** Seleccione **";
       }        
       else{
         Utiles.grabarOpcion("idauto",arregloAutos[0].uid);
         Utiles.grabarOpcion("marca",arregloAutos[0].marca);
         Utiles.grabarOpcion("modelo",arregloAutos[0].modelo);
         Utiles.grabarOpcion("axo",arregloAutos[0].version);
         Utiles.grabarOpcion("color",arregloAutos[0].color);
         Utiles.grabarOpcion("placas",arregloAutos[0].placa);
         autoMostrar = arregloAutos[0].marca +  " " + arregloAutos[0].modelo + " " + arregloAutos[0].placa ;
       }
       var ComboAuto = new ComboVista( 'Vehículo:', '90%', autoMostrar );
       ComboAuto.view.addEventListener("click", function(){
          var winAutos = new GenericWindow( "S", "Seleccione su Auto" ) ;
      	   var vistaAutos = require("src/common/seleccionarAuto");
      	   vistaAutos.CargarListado( winAutos, arregloAutos , ComboAuto )  ;
          winAutos.open();             
       });
       contenedor.add(ComboAuto.view);
    }
    
    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 }));    
    
    Ti.API.info("*** Servicio Siga: " + arregloOpciones[0].servicio_siga );
    Utiles.grabarOpcion("cuenta_siga",arregloOpciones[0].cuenta_siga);    
    Utiles.grabarOpcion("servicio_siga",arregloOpciones[0].servicio_siga);    
    var plan_siga = Utiles.obtenerOpcion("plan_siga");
    Utiles.grabarOpcion("plan_siga",plan_siga);
    var ComboServicios = new ComboVista( 'Servicio:', '90%', arregloOpciones[0].servicio );
    ComboServicios.view.addEventListener("click", function(){
       var winServicios = new GenericWindow( "S", "Seleccione su servicio" ) ;
   	   var vistaServicios = require("src/common/seleccionarServicio");
   	   vistaServicios.CargarListado( winServicios, arregloOpciones , ComboServicios )  ;
       winServicios.open();     
    });
    contenedor.add(ComboServicios.view);

    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 }));    
    
    
    // Boton para registrar la cuenta
    var btnOK = new Button("Solicitar asistencia",params.color2,'90%');     
    btnOK.addEventListener("click", function(){
        
        if(jNombres.input.value==""){
          Utiles.Alerta("Por favor captura tu nombre en el campo 'Solicita'");
          return false;
        }
        if(jTelefono.input.value==""){
          Utiles.Alerta("Por favor captura tu número de teléfono");
          return false;
        }        
        
        if(EsAsistenciaVial){               
            if(Utiles.obtenerOpcion("marca")==""){
              Utiles.Alerta("Por favor seleccione el vehículo que requiere asistencia");
              return false;
            }
        }
        

     var parametros = {  
            acc: 'A',
            dsp: Utiles.obtener_id(),
            tkn: ( Utiles.obtenerOpcion('deviceToken') == "" ) ? "." : Utiles.obtenerOpcion('deviceToken') ,
            app: Titanium.App.name,
            ver: params.app_version,
            sol: jNombres.input.value,   
            ben: jNombres.input.value,
            tel: jTelefono.input.value,
            cve: Utiles.obtenerOpcion('cedula'),
            pol: Utiles.obtenerOpcion('cedula'),
            con: jTelefono.input.value,
            mot: ( jExplique.input.value == "" ) ? "-" : jExplique.input.value ,
            mar: ( Utiles.obtenerOpcion('marca') == "" )    ? "." : Utiles.obtenerOpcion('marca') ,
            sbm: ( Utiles.obtenerOpcion('submarca') == "" ) ? "." : Utiles.obtenerOpcion('submarca'),
            clr: ( Utiles.obtenerOpcion('color') == "" )    ? "." : Utiles.obtenerOpcion('color'),
            mod: ( Utiles.obtenerOpcion('modelo') == "" )   ? "." : Utiles.obtenerOpcion('modelo') ,
            plc: ( Utiles.obtenerOpcion('placas') == "" )   ? "." : Utiles.obtenerOpcion('placas'),
            eda: 0,
            cta: Utiles.obtenerOpcion("cuenta_siga"), 
            pla: Utiles.obtenerOpcion("plan_siga"),
            ser: Utiles.obtenerOpcion("servicio_siga"),
            lat: Titanium.App.latitud,
            lon: Titanium.App.longitud,
            dos: Titanium.Platform.name,
            tip: 0,
           test: 1
     };  
     preloader.show(win);
     btnOK.enabled = false;
     var peticionHTTP = Ti.Network.createHTTPClient();
     peticionHTTP.onerror = function(e) {
         preloader.hide(win);
         Utiles.Alerta( "Error de comunicación con el servidor, por favor intenta mas tarde. \n\n" + e.error  );
         btnOK.enabled = true;
         return false;
     };
     peticionHTTP.onload =  function() {
        var responseText = this.responseText;
        Ti.API.info('*** RESULTADO: ' + responseText  ); 
        if ( Utiles.Left(responseText,5) == "ERROR") {
           preloader.hide(win);
           Utiles.Alerta( "La petición de ASISTENCIA no se ha podido enviar. Revisá tu conexión de internet e intenta de nuevo.\n" + responseText );
           btnOK.enabled = true;
           return false;
        }     
        else  {
              if(Utiles.Left(responseText,2) == "OK") {
                 preloader.hide(win); 
                 win.close();   
                 var cadena_datos  = responseText;
                 var arreglo_datos = cadena_datos.split("@");
                 var numexped      = arreglo_datos[1];
                 var numasistencia = arreglo_datos[2];                 
                 var fecha_hoy     = Utiles.obtener_fecha_hoy() + " " + Utiles.obtener_hora();
                 var solicita      = jNombres.input.value;
                 var beneficiario  = jNombres.input.value;
                 var telefono      = jTelefono.input.value;
                 var motivo        = ( jExplique.input.value == "" ) ? "-" : jExplique.input.value ;
                 var marca         = Utiles.obtenerOpcion('marca');
                 var modelo        = Utiles.obtenerOpcion('modelo');
                 var placas        = Utiles.obtenerOpcion('placas');
                 // Ti.App.db.execute( "INSERT INTO historico_asistencias (numexped, numasistencia, fecha_hora, tipo, estatus, solicitante, beneficiario, telefono, motivo, marca, modelo, placas, edad, calificacion ) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,? )",numexped, numasistencia, fecha_hoy, 0 , 0, solicita, beneficiario, telefono, motivo, marca, modelo, placas, 0, 0);  
                 Utiles.Alerta( "Tu asistencia fue enviada y se generó el expediente " + numexped + ", podrás darle seguimiento en la opción Historial" );
                 return true;
              }
              else {
                 preloader.hide(win);
                 Utiles.Alerta( "Hubo un error grave al intentar enviar tu asistencia. Por favor intentá en unos minutos ==> " + responseText  );
                 btnOK.enabled = true;
                 return false;
              }
        }       
     };
     Ti.API.info(" url |||||||||||||||||" +params.URLsiga);
					Ti.API.info(" parametros |||||||||||||||||" +JSON.stringify(parametros));
     
     peticionHTTP.open("POST", params.URLsiga );  
     peticionHTTP.send(parametros);  
   
           
    }); 
    contenedor.add(btnOK);
    
}
exports.Solicitar = Solicitar;  
