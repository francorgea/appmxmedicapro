
exports.calculaUbicacionActual = function() {
    Titanium.Geolocation.getCurrentPosition( function(e){          
        try{
          latitud  = e.coords.latitude;
          longitud = e.coords.longitude;          
          if(indiceMapa==0){ 
            vistaMapa.setRegion( {latitude: latitud, longitude: longitud, latitudeDelta:0.01, longitudeDelta:0.01} );
            Ti.API.info("*** Colocando region");
            indiceMapa++;
          }           
        }
        catch(e){
          latitud  = 0;
          longitud = 0;          
          if(indiceMapa==0){ 
            Ti.API.info("*** Imposible obtener la ubicacion");
            indiceMapa++;
          }
        }
    }); 
}
// ==========================================================================================================
// Funcionalidad Left y Right
// ==========================================================================================================
exports.Left = function(str, n){
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}

exports.Right = function(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}
// ==========================================================================================================
// Obtiene la fecha final de hoy en formato Date y con 00:00:00
// ==========================================================================================================
exports.FechaCadena = function( fecha ) {
  if(fecha==""){
    return "-";
  }
  // 0123456789012345678
  // 0000-00-00 00:00:00
  var axo = fecha.substring(0,4);
  var mes = fecha.substr(5,2);
  var dia = fecha.substr(8,2);
  var fec = dia + "/" + ObtieneMes(mes) + "/" + axo;
  var hrs = "";
  if( fecha.substr(13, 1) == ":" ) {
      hrs = fecha.substr(10,6);
  }
  fec = fec + hrs ;
  return fec;
}
function ObtieneMes(mes) { 
   var texto="";
   switch(mes)  {
       case '01': texto = "Ene"; break;
       case '02': texto = "Feb"; break;
       case '03': texto = "Mar"; break;
       case '04': texto = "Abr"; break;
       case '05': texto = "May"; break;
       case '06': texto = "Jun"; break;
       case '07': texto = "Jul"; break;
       case '08': texto = "Ago"; break;
       case '09': texto = "Sep"; break;
       case '10': texto = "Oct"; break;
       case '11': texto = "Nov"; break;
       case '12': texto = "Dic"; break;
   }
   return texto;
}
// =========================================================
exports.obtenerOpcion = function (parametro) {
   return obtenerOpcion(parametro);
} 
function obtenerOpcion(parametro){
   var valor;
   if(typeof(parametro)!="string"){
     return "";
   }
   valor  = Ti.App.Properties.getString( parametro );
   if(valor==null){
     valor = "";
   }
   return valor; 
}
// =========================================================
exports.grabarOpcion = function( tipo, valor ) {
  grabarOpcion( tipo, valor )
}
function grabarOpcion(tipo,valor){
 if(typeof(valor)!="string"){
   Ti.API.info("*** " + tipo + " = " + valor );
 } 
 else{
   valor = valor.trim();
   Ti.App.Properties.setString( tipo, valor );
 }
}
// =========================================================
exports.Alerta = function(texto){
   var dialog = Ti.UI.createAlertDialog({
    message: texto,
    ok: 'OK',
    title: params.app_name
  });
  dialog.show();
}
// =========================================================
exports.MarcarNumero = function(numero){
  MarcarNumero(numero);
}
function MarcarNumero(numero){
  Ti.API.info("*** Marcando número: " + numero );
  if(Ti.Platform.osname=="android"){
       var call = "tel:" + numero;
       var intent = Ti.Android.createIntent({
            action : Ti.Android.ACTION_CALL,
            data : call
        });
        try{
          Ti.Android.currentActivity.startActivity(intent);	     
        }
        catch(e){
          Alerta("No fué posible marcar el número: " + numero + ", es posible que no haya asignado permisos a la aplicación. Por favor inténtelo manualmente.");
        }
  }
  else{
    Titanium.Platform.openURL('tel:' + numero );	
  }  
}
// ========================================================
exports.abrirEnlace = function(url) {
 var dialog = require('ti.webdialog');
 if (dialog.isSupported()) {
     dialog.open({
         url: url
     });
 }   
 else{
     Titanium.Platform.openURL(url);	  
 } 
 /*
 if(url!="" && url!=null) {
   Titanium.Platform.openURL(url);	  
 }
 else{
   alert("No hay URL especificada");
 }
 */
}
// =========================================================
exports.limpiarVariables = function() {
   limpiarVariables();
};
function limpiarVariables(){
  Utiles.grabarOpcion("conectado","N");
  Utiles.grabarOpcion("authorization","");
  Utiles.grabarOpcion("nombre","");
  Utiles.grabarOpcion("apellidos","");
  Utiles.grabarOpcion("cedula","");
  Utiles.grabarOpcion("telefono","");
  Utiles.grabarOpcion("email","");
}
//==========================================================
exports.Enc = function( valor ) {
   return valor;
}
exports.Dec = function( valor ) {
   return valor;
}
// ============================================================================================================
// Function   : 
// Parametros :
// Descripcion: 
// ============================================================================================================
exports.leer_enlace_siga = function() {
  return leer_enlace_siga()
}
function leer_enlace_siga(){
   var enlace = "http://187.188.107.45:9936/siga/asistenciamovil/generaExpediente.php";
   return enlace;
}
//
//
//
exports.leer_enlace_appmedicina = function() {
  return leer_enlace_appmedicina();
}
function leer_enlace_appmedicina(){
  var enlace = "http://187.188.107.45:9936/siga/asistenciamovil/appMedicinas.php";
  return enlace;
}
//
//
//
exports.checar_bd = function() {
	// =======================================================================================================================
	// VEHICULOS
	sql_crear="";
 sql_crear += "CREATE TABLE IF NOT EXISTS vehiculos (";
	sql_crear += "id INTEGER, uid TEXT, marca TEXT, modelo TEXT, axo TEXT, placas TEXT, color TEXT,";
	sql_crear += "PRIMARY KEY (id) )"; 
	Ti.App.db.execute( sql_crear );    
}
// =======================================================================================================================
// Obtener un UNICO ID para el dispositivo
// basandonos en la MAC Address
// =======================================================================================================================
exports.obtener_id = function(){
  return obtener_id();
}
function obtener_id() {
   if(params.isAndroid){
     valor = params.pref + Titanium.Platform.id;
   }
   else{
     valor = Titanium.Platform.id;
   }
 return valor;
}
// ==========================================================================================================
// Registrar token en servidor
// ==========================================================================================================
exports.registrarEnServidor = function(deviceToken){ 
   var servidor = params.URLmobile;
   var enlace = servidor + "?task=register&appname="+params.pref+"&appversion="+params.app_version+"&deviceuid="+Utiles.obtener_id()+"&";
   enlace = enlace + "devicetoken="+deviceToken+"&devicename="+Titanium.Platform.name+"&devicemodel="+Titanium.Platform.model+"&";
   enlace = enlace + "deviceversion="+Titanium.Platform.version+"&pushbadge=enabled&pushalert=enabled&pushsound=enabled&pref="+params.pref+"&desarrollo="+params.desarrollo; 
   var peticionHTTP = Ti.Network.createHTTPClient();
   peticionHTTP.onerror = function(e) {
       Utiles.grabarOpcion( "servidorPush1", e.error );
   };
   peticionHTTP.onload =  function()  {
       Utiles.grabarOpcion( "servidorPush1", "OK" );
   };
   Ti.API.info("*** Enlace Push: " + enlace );
   peticionHTTP.open("GET", enlace );  
   peticionHTTP.send();  
};
// ========================================================
// llenar de ceros
// ========================================================
exports.zeroFill = function(n,pad){
  return zeroFill(n,pad);
}
function zeroFill(n,pad) {
    p = Math.pow(10,pad);
    a = Math.abs(n);
    g = (n<0);
    return (a < p) ?  ((g ? '-' : '') + (p+a).toString().substring(1)) : n;
}
// =====================================================================================================================
// Valida si el email escrito es valido
// =====================================================================================================================
exports.validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //return re.test(email);
    return true;
}
// ==========================================================================================================
// Obtiene la fecha y hora actual en formato largo
// ==========================================================================================================
exports.Ahora = function() {
  var d =  new Date();
  var txtDatetime = d.toLocaleString();
  return txtDatetime;
}
// ==========================================================================================================
// Obtiene la fecha de hoy en formato yyyy-mm-dd
// ==========================================================================================================
var obtener_fecha_hoy = function() {
	var fecha = new Date();
	var y     = fecha.getFullYear();
	var m     = zeroFill(fecha.getMonth()+1,2);
	var d     = zeroFill(fecha.getDate(),2);
	var fecha_final = y + "-" + m + "-" + d;
	return fecha_final;
}
exports.obtener_fecha_hoy = obtener_fecha_hoy;
// ==========================================================================================================
// Obtiene la hora en formato hh:mm:ss
// ==========================================================================================================
var obtener_hora = function() {
	var fecha = new Date();
	var h     = zeroFill(fecha.getHours()  ,2);
	var m     = zeroFill(fecha.getMinutes(),2);
	var s     = zeroFill(fecha.getSeconds(),2);
	var hora_final = h + ":" + m + ":" + s;
	return hora_final;
}
exports.obtener_hora = obtener_hora;
//
//
//
exports.isValidDate = function(value, userFormat) {

  // Set default format if format is not provided
  userFormat = userFormat || 'mm/dd/yyyy';

  // Find custom delimiter by excluding the
  // month, day and year characters
  var delimiter = /[^mdy]/.exec(userFormat)[0];

  // Create an array with month, day and year
  // so we know the format by index
  var theFormat = userFormat.split(delimiter);

  // Get the user date now that we know the delimiter
  var theDate = value.split(delimiter);

  function isDate(date, format) {
    var m, d, y, i = 0, len = format.length, f;
    for (i; i < len; i++) {
      f = format[i];
      if (/m/.test(f)) m = date[i];
      if (/d/.test(f)) d = date[i];
      if (/y/.test(f)) y = date[i];
    }
    return (
      m > 0 && m < 13 &&
      y && y.length === 4 &&
      d > 0 &&
      // Is it a valid day of the month?
      d <= (new Date(y, m, 0)).getDate()
    );
  }

  return isDate(theDate, theFormat);

}
//
//
//
exports.sePuedePonerPin = function(){
  if(Ti.Platform.osname=='android') {
     var version = Titanium.Platform.version;
     var maxver  = version.split(".");
     maxver = parseInt(maxver);
     if(maxver==6){
       return false;
     }
     return true;
  } 
  return true;
}
// ============================================================================================================
// Function   : getLocation
// Parametros :
// Descripcion: Obtiene la posición actual 
// ============================================================================================================
exports.getLocation = function(){
   Ti.API.info("*** Obteniendo la posicion actual");
   Titanium.Geolocation.getCurrentPosition(function(e){
     try  {       
       longitud = e.coords.longitude;
 	     latitud  = e.coords.latitude;
	    }
	    catch(err)  {
       longitud = 0;
 	     latitud  = 0;
	    }
   });
}
//
//
//
//
exports.ComboBox = function( titulo, arregloOpciones, boton ) {
   var winCombo = new GenericWindow("S",titulo,"");
   var tableData = [];
   var actual = "";
   var seleccionada = boton.title;
   for(x=0;x<arregloOpciones.length;x++){
      actual = arregloOpciones[x];
      if(actual==seleccionada){
         checked = true;
      }
      else{
         checked = false;
      }
      var colorTexto =  'black'  ;
      tableData.push( {  
           title: actual, 
           hasCheck: checked, 
           color: colorTexto,
       });
   } 
   var table = Ti.UI.createTableView({
     top: '18%',
     data: tableData,
     backgroundColor: params.color7
   });
   table.addEventListener("click", function(e){
       boton.title = e.rowData.title;
       winCombo.close();
   });
   winCombo.add(table);
   winCombo.open();     
}
//
//
//
exports.SeleccionarFecha = function( fecha_actual ) {
 Ti.API.info("*** Mostrando selector de fecha");
	var winFecha = Ti.UI.createWindow({
    	orientationModes: [ Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT],
    	backgroundColor: 'transparent',
   		navBarHidden:true,
   		exitOnClose:true,
   		fullscreen:true
	});
	
	var vista = Ti.UI.createView({
 	   layout: 'vertical',
 	   backgroundColor: 'white',
 	   bottom:0,
 	   width: Ti.UI.SIZE,
 	   height: Ti.UI.SIZE,
 	   opacity: 1,
	});
 barra = Titanium.UI.createButtonBar({
     labels:['Cancelar','Aceptar'],
     backgroundColor: params.color1,
     style:Titanium.UI.iOS.SystemButtonStyle.PLAIN,
     height:25,
     width:'auto',
 });      
 vista.add(barra);    	
 var picker = Ti.UI.createPicker({
   type: Titanium.UI.PICKER_TYPE_DATE,
   selectionIndicator: true,
 });	
 vista.add(picker);
 winFecha.add(vista);
 
	winFecha.addEventListener("click", function(){
 	   winFecha.close();
	})
 winFecha.open();
 
}
// ===========================================================================
// Obtiene la imagen de la calificacion
// ===========================================================================
exports.icono_calificacion = function( calificacion ) {
  if( calificacion == null || calificacion == "" || calificacion == "." )   {
   calificacion = 0;
  }
  var imagen = "/images/calif" + calificacion + ".png";
  return imagen;
}
exports.imagen_estatus = function( estatus ) {
  var imagen;
  switch(estatus) {
	  case 0:
	  case 1:
	  case 2:
	  case 3:
	  case 4:
	  case 5:  imagen = "/images/" + estatus + ".png"; break;
	  default: imagen = "/images/0.png"; break;
  }    
  return imagen;
}
exports.quitar_espacios = function(t){
 return t;
}
exports.Pintar_Servicio = function( servicio ) {
   if( servicio == null )  {
	     servicio = " ";
   }
   if( servicio == "." )  {
       return " ";
   }
   return servicio;
}
exports.Obtiene_fecha_termina = function( fecha ) {
   if( fecha == null )  {
	   return " ";
   }
   if( fecha == "." )  {
       return " ";
   }
   return Utiles.FechaCadena(fecha);
}
exports.texto_estatus = function( estatus, coordinador ) {
  var textoCoordinador="";
  if( coordinador )   {
      textoCoordinador = coordinador;
  }
  if( textoCoordinador == "" )   {
      textoCoordinador = "coordinador";
  }
  var texto="";
  estatus = parseInt(estatus);
	 switch( estatus ) 	 {
		 case 0:  texto = "En Validación"; break;
		 case 1:  texto = "Concluida"; break;
		 case 2:  texto = "Cancelada (Al momento)"; break;
		 case 3:  texto = "Cancelada (Posterior)"; break;
		 case 4:  texto = "En Validación (Atendida por " + textoCoordinador + ")"; break;
		 case 5:  texto = "En Proceso"; break;
		 default: estatus = 0; texto = "En Validación";
	 }
	 return texto;
 }