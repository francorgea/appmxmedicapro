// Cargamos Modulos 
global.params        = require("src/common/parametros");   
global.GenericWindow = require("src/common/ventanaGenerica");   
global.Utiles        = require("src/common/utiles");   
global.preloader     = require("src/common/preloader"); 
global.imgUsuario;


// Cerramos la BD cuando cerremos la aplicación
Titanium.App.db = Titanium.Database.open( params.sistema_BD );
Titanium.App.addEventListener('close',function(e) {
    if ( Titanium.App.db ) {
        Titanium.App.db.close();
    }
});
Utiles.checar_bd();


// Variables
global.paginaActual = 0;
global.contieneAsistencias;
global.contieneHistorial;
global.contieneLlamada;
global.contieneOpciones;
global.barraIndicaActual;
global.contenedorHistoria;
global.HistorialProcesos;
global.gridAsistencias;
global.latitud  = 0;
global.longitud = 0;


// This is a single context application with multiple windows in a stack
(function() {
  var mainWindow = require('src/principal/ApplicationWindow');
  new mainWindow().open();
})();