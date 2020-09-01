
function CargarListado(  win, arreglo, Combo ) {   
  
  if(arreglo.length==0){
    win.backgroundImage = "/images/error_vehiculos.png";
    return false;
  }
  
    
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
      Ti.API.info("*** DATOS: " + JSON.stringify(e));
      Combo.label.text = e.rowData.datos.marca + " " + e.rowData.datos.modelo + " " + e.rowData.datos.placa ;
      Utiles.grabarOpcion("idauto",e.rowData.datos.uid);
      Utiles.grabarOpcion("marca",e.rowData.datos.marca);
      Utiles.grabarOpcion("modelo",e.rowData.datos.modelo);
      Utiles.grabarOpcion("axo",e.rowData.datos.version);
      Utiles.grabarOpcion("color",e.rowData.datos.color);
      Utiles.grabarOpcion("placas",e.rowData.datos.placas);
      
      // Utiles.grabarOpcion("cuenta_siga",e.rowData.datos.cuenta_siga);
      // Utiles.grabarOpcion("plan_siga",e.rowData.datos.plan_siga);
      // Utiles.grabarOpcion("Auto_siga",e.rowData.datos.Auto_siga);
      win.close();
  });
  win.add(listado);
  
  CargarAutos( listado, data, win, arreglo, Combo );  

}
exports.CargarListado = CargarListado;


//
//
//
//
function CargarAutos( listado, data, win, arreglo, Combo ){
  
 for(x=0;x<arreglo.length;x++){
    AgregarAuto( x, arreglo, data, Combo )  ;            
 }
 preloader.hide(win);
 listado.data = data;
 
}

//
//
//
// 
function AgregarAuto( x, arreglo, data, Combo )    {
   
   var seleccionado = Combo.label.text ;
   
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
   
   seleccionado = seleccionado.trim();
   var colorTexto = params.color0;
   //Ti.API.info("*** " + seleccionado + " = " + arreglo[x].Auto.trim() );
   /*
   if( seleccionado == arreglo[x] ){
      Ti.API.info("*** Bien!");    
      colorTexto = params.color1;
   }   
   else{
      colorTexto = params.color6;
   }
   */
   colorTexto = params.color6;
   
   
   var lblTextoAuto = Ti.UI.createLabel({       
       text: arreglo[x].marca + " " + arreglo[x].modelo + " " + arreglo[x].placa ,
       left: 15,
       font: { fontFamily: params.fuente_monserrat, fontSize: 14 },
       color: colorTexto,
       width: 'auto',
       height: 'auto',
   });
   vistaRenglon.add(lblTextoAuto);
  
   vistaRenglon.add( Ti.UI.createView({ bottom: 0, width: '90%', height: 2, backgroundColor: params.color10 }) );
   renglon.add(vistaRenglon);
   
   data.push(renglon);
 
}

