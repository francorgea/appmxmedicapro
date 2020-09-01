
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
      Combo.label.text = e.rowData.datos.servicio;
      Utiles.grabarOpcion("cuenta_siga",e.rowData.datos.cuenta_siga);
      Utiles.grabarOpcion("plan_siga",e.rowData.datos.plan_siga);
      Utiles.grabarOpcion("servicio_siga",e.rowData.datos.servicio_siga);
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
  
 for(x=0;x<arreglo.length;x++){
    AgregarServicio( x, arreglo, data, Combo );              
 }
 preloader.hide(win);
 listado.data = data;
 
}

//
//
//
// 
function AgregarServicio( x, arreglo, data, Combo )    {
   
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
   Ti.API.info("*** " + seleccionada.trim() + " = " + arreglo[x].servicio.trim() );
   
   
   if( seleccionada == arreglo[x].servicio ){
      Ti.API.info("*** Bien!");    
      colorTexto = params.color1;
   }   
   else{
      colorTexto = params.color6;
   }
   var lblTextoServicio = Ti.UI.createLabel({       
       text: arreglo[x].servicio,
       left: 15,
       font: { fontFamily: params.fuente_monserrat, fontSize: 14 },
       color: colorTexto,
       width: 'auto',
       height: 'auto',
   });
   vistaRenglon.add(lblTextoServicio);
  
   vistaRenglon.add( Ti.UI.createView({ bottom: 0, width: '90%', height: 2, backgroundColor: params.color10 }) );
   renglon.add(vistaRenglon);
   
   data.push(renglon);
 
}

