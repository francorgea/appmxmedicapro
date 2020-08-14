
// Variables Varias 
exports.sistema_BD  = "sefcm";
exports.desarrollo  = "production"; // production // sandbox
exports.app_name    = "Sala de Emergencia";
exports.app_version = "1.0.0"; 
exports.pref        = "SE_FCM"; 
exports.br          = "\n";
exports.piloto      = "+56228203386";
exports.isAndroid   =  ( Ti.Platform.osname=="android" ) ? true : false;
exports.iPhoneX     =  ( (Ti.Platform.osname!="android" && Ti.Platform.displayCaps.platformWidth == 375 && Ti.Platform.displayCaps.platformHeight == 812) || (Ti.Platform.osname!="android" && Ti.Platform.displayCaps.platformWidth == 414 && Ti.Platform.displayCaps.platformHeight == 896 )  ) ? true : false;

// CUENTA SIGA
exports.cuenta_siga = 'PEM';

// AIzaSyCRn0aee1T-vyinfNnWYaVx4DH-KhYwNIs

// Definimos los colores
exports.color0  = "black"  ;  // Negro
exports.color1  = "#00468a";  // Azul botones emergencias
exports.color2  = "#fc0e5d";  // Rosachillante
exports.color3  = "#99bdf4";  // Gris obscuro botones inferiores 
exports.color4  = "#FFFD38";  // Amarillo
exports.color5  = "#E51066";  // Rosa
exports.color6  = "#A4A09D";  // Gris Fuerte
exports.color7  = "white"  ;  // Blanco 
exports.color8  = "#ff0000";  // Rojo
exports.color9  = "#008000";  // Verde
exports.color10 = '#f1f1f1';  // Gris Claro
exports.color11 = '#a4a09d';  // Gris textos   
exports.color12 = '#f3f3f3';  // Gris fondo textos  
exports.color13 = '#b3b0ad';  // Gris placeholder inputs
exports.color14 = '#4C4C4C';  // Gris fuerte 1
exports.color15 = '#8B8B8B';  // Gris fuerte 2
exports.color16 = '#9E9E9E';  // Gris fuerte 3

// Estrellas
exports.estrella_off = "/images/estrella_off.png";
exports.estrella_on  = "/images/estrella_on.png";


// email y links
exports.email_contacto = "sistemas_mobile@geainternacional.com";
exports.URLweb         = "http://www.geainternacional.com";

// Estrellas
exports.estrella_on  = "/images/estrella_on.png";
exports.estrella_off = "/images/estrella_off.png";

// Chat
exports.tiempo_chat    = 15000;
exports.sonido_enviar  = "pop.wav";
exports.sonido_recibir = "pop2.wav";
exports.sonido_soltar = "pop2.wav";


// email y links
exports.email_contacto   = "sistemas_mobile@geainternacional.com";
exports.pagina_web       = "http://www.geainternacional.com";
exports.pagina_tyc       = "http://www.geainternacional.com/cl/se_fcm/tyc.html";
exports.pagina_pp        = "http://www.geainternacional.com/cl/se_fcm/pp.html";


// URL de Servicios
exports.URLsiga        = "http://mobilecl.geainternacional.com:9936/siga/asistenciamovil/generaExpediente.php";
exports.URLmobile      = "http://push.geainternacional.com:9936/siga/srvPUSH/apns.php";


// Tipografias
exports.fuente_primaria    = ( Ti.Platform.osname=='android' ) ? "OpenSans-Regular"    : "Open Sans";
exports.fuente             = ( Ti.Platform.osname=='android' ) ? "OpenSans-Regular"    : "Open Sans";
exports.fuente_input       = ( Ti.Platform.osname=='android' ) ? "OpenSans-Regular"    : "Open Sans";

