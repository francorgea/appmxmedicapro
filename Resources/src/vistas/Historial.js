
function Historial( mainView ) {  

  contenedorHistoria = Ti.UI.createView({
      width: Ti.UI.FILL,
      height: Ti.UI.FILL,   
       backgroundImage: 'images/sinasistencias.png',
       //borderColor: 'blue'   
  });  
  
  var objBarraTitulo = require("/src/common/BarraTitulo");
  var barraTitulo    = new objBarraTitulo("HISTORIAL");
  contenedorHistoria.add(barraTitulo);	

		var contenedorImagen = Ti.UI.createView({
			   width: Ti.UI.FILL,
			   height: Ti.UI.SIZE,
			   layout: 'vertical',
			   top: '10%',
			   backgroundColor: params.color7
		});
		contenedorHistoria.add(contenedorImagen);
		
		// Creamos la tabla, con el arreglo de datos 
 	
 	var data = [] ;
 	gridAsistencias= Titanium.UI.createTableView({
  	// top: '9%',
  	// bottom: 0,
 		data: [], 		
 		backgroundColor: 'transparent',
 		separatorStyle : Titanium.UI.TABLE_VIEW_SEPARATOR_STYLE_NONE,
 		moveable: false,
// 		borderColor: 'green',
 		width: Ti.UI.FILL,
 		height: Ti.UI.FILL,
 	});
  contenedorImagen.add(gridAsistencias);
  gridAsistencias.addEventListener("click", function(e){
        datos = e.rowData.datos;
        Ti.API.info("*** El servicio tiene un estatus de: " + datos.status );
	       if( parseInt(datos.status) >= 1 && parseInt(datos.status) <= 3) {
           var winDatos = new GenericWindow("S","Datos de la Asistencia");
       	   var vista = require("src/vistas/datosAsistencia");
       	   vista.datos( winDatos, datos, win );  	      	    
      	    winDatos.open();          	        
           
	       }
	       else {
           if( datos.expediente > 0 ) {
              var win = new GenericWindow("S","Chat [ Expediente " + datos.expediente + " ]");
          	   var vista = require("src/vistas/chat");
          	   vista.Chat( win, datos.expediente, datos );  	      	    
         	    win.open();          	   
  	        }
	       }  
  });



  
  return contenedorHistoria;
}
module.exports = Historial;