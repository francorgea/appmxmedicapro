
var enlace_prevision = "http://mobilecl.geainternacional.com:9936/siga/asistenciamovil/previsionesChile.php";

function CargarListado(  win, arreglo, Combo ) {   
    
  // Listado de lugares cercanos    
  var data = [];
  var listado = Ti.UI.createTableView({
      width: Ti.UI.FILL,
      height: Ti.UI.FILL,
      top: '10%',
      data: data,
      separatorStyle: Titanium.UI.TABLE_VIEW_SEPARATOR_STYLE_NONE
  }); 
  listado.addEventListener("click", function(e){
      Combo.label.text = e.rowData.datos.texto;
      Combo.label.valor = e.rowData.datos.valor;
      win.close();
  });
  win.add(listado);
  
  CargarOpciones( listado, data, win, arreglo, Combo );  

}
exports.CargarListado = CargarListado;


//
//
//
//
function CargarOpciones( listado, data, win, arreglo, Combo ){
 
 
 var url = enlace_prevision;
 var client = Ti.Network.createHTTPClient({
     onload : function(e) {
         Ti.API.info("Received text: " + this.responseText);
         try{
           var json = JSON.parse(unescape(this.responseText));
         }
         catch(e){
           Utiles.Alerta("Imposible descargar las previsiones");
           listado.setData([]);            
         }
         var arreglo = json;
         for(x=0;x<arreglo.length;x++){
            Agregarprevision( x, arreglo, data, Combo );              
         }
         preloader.hide(win);
         listado.setData(data);
     },
     
     onerror : function(e) {
         Utiles.Alerta("No se pudieron descargar las previsiones");
         listado.setData([]);
     },
     timeout : 15000  
 });
 
 
 client.open("GET", url);
 client.send(); 
 
 
  
 
}

//
//
//
// 
function Agregarprevision( x, arreglo, data, Combo )    {
   
   var seleccionada = Combo.label.text ;
   
   var renglon = Titanium.UI.createTableViewRow({ 
       width: Ti.UI.FILL, 
       height: 60, 
       datos: arreglo[x]
   });
   
   var vistaRenglon = Ti.UI.createView({
     backgroundColor: params.color7 ,
     width: Ti.UI.FILL,
     height: Ti.UI.FILL,
   });
   
   seleccionada = seleccionada.trim();
   var colorTexto = params.color0;
   Ti.API.info("*** " + seleccionada.trim() + " = " + arreglo[x].texto.trim() );
   
   
   if( seleccionada == arreglo[x].texto ){
      Ti.API.info("*** Bien!");    
      colorTexto = params.color1;
   }   
   else{
      colorTexto = params.color6;
   }
   var lblTextoprevision = Ti.UI.createLabel({       
       text: arreglo[x].texto,
       left: 15,
       font: { fontFamily: params.fuente_monserrat, fontSize: 14 },
       color: colorTexto,
       width: 'auto',
       height: 'auto',
   });
   vistaRenglon.add(lblTextoprevision);
  
   vistaRenglon.add( Ti.UI.createView({ bottom: 0, width: '90%', height: 2, backgroundColor: params.color10 }) );
   renglon.add(vistaRenglon);
   
   data.push(renglon);
 
}

