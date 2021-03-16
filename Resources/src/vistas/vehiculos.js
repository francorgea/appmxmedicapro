
//
//
//
function Mostrar(win){
  
    var Button = require("src/common/Button");
    var Input = require("src/common/InputNS");
    win.addEventListener("focus", function(){
        Ti.API.info("*** Vamos a mostrar los vehiculos");
        DescargarVehiculosDeServidor(win, tablaDatos);
    });
    
    // Ponemos el botón de agregar
    var vistaBoton = Ti.UI.createView({
        height: '10%',
        top: 0,
        width: 30,
        right: 8,
    });    
    var btnAgregar = Ti.UI.createImageView({  
        width: 20, 
        height: 20, 
        image: "/images/btnAgregar.png", 
        right: 0
    });
    vistaBoton.add(btnAgregar);    
    vistaBoton.addEventListener("click", function(){
        Agregar_Vehiculo( win, true, null );
    });
    
    win.add(vistaBoton);
        
    var tablaDatos = Ti.UI.createTableView({
      data: [],
      top: '10%',
      width: Ti.UI.FILL,
      height: Ti.UI.FILL,
      backgroundColor: 'transparent',
      separatorStyle: Titanium.UI.TABLE_VIEW_SEPARATOR_STYLE_NONE
    });
    tablaDatos.addEventListener("click", function(e){ 
        Agregar_Vehiculo( win, false, e.rowData.datos );
    });
    win.add(tablaDatos);
    
}
exports.Mostrar = Mostrar;  




/*
 *
 *
 *
 */
function Agregar_Vehiculo( win, agregar, datos ){
   
   var Button = require("src/common/Button");
   var Input  = require("src/common/InputNS");
   var win = new GenericWindow("S","Datos del vehículo");
   

    // Definimos el contenedor y el scroll
    var scroll = Ti.UI.createScrollView({
        top: '10%',
        width: Ti.UI.FILL,
        width: Ti.UI.FILL,  
    });
    contenedor = Ti.UI.createView({
        top: 0,
        layout: 'vertical',
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
    });
    scroll.add(contenedor);
    win.add(scroll);
    
    // Agregamos espacio
    contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 15 }));

    // Marca del vehiculo
    var jsonMarca = new Input("Marca"  ,'90%',"A",'N');
    contenedor.add(jsonMarca.view);
    if(!agregar) jsonMarca.input.value = datos.marca;

    // Agregamos espacio
    contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 15 }));

    // Modelo del vehiculo
    var jsonModelo = new Input("Modelo",'90%',"D",'N');
    contenedor.add(jsonModelo.view);
    if(!agregar) jsonModelo.input.value = datos.modelo;

    // Agregamos espacio
    contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 15 }));

    // Año del vehiculo
    var jsonAxo = new Input("Año",'90%',"N",'N');
    contenedor.add(jsonAxo.view);
    if(!agregar) jsonAxo.input.value = datos.axo;

    // Agregamos espacio
    contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 15 }));

    // Placas del vehiculo
    var jsonPlacas = new Input("Placas",'90%',"A",'N');    
    contenedor.add(jsonPlacas.view);
    if(!agregar) jsonPlacas.input.value = datos.placa;

    // Agregamos espacio
    contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 15 }));

    // Placas del vehiculo
    var jsonColor = new Input("Color",'90%',"A",'N');
    if(!agregar) jsonColor.input.value = datos.color;
    contenedor.add(jsonColor.view);

    // Agregamos espacio
    contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 15 }));

    var btnAceptar = new Button("Registrar vehículo",params.color3,"90%");
    btnAceptar.addEventListener("click", function(){
     
       if( jsonMarca.input.value == "" || jsonColor.input.value == "" || jsonModelo.input.value == "" || jsonPlacas.input.value == "" || jsonAxo.input.value == "" ) {
          Utiles.Alerta( "Debe capturar todos los campos del vehículo" );
          return false;
       }       
       
       if(agregar) { // Agregar
        
            Ti.App.db.execute("INSERT INTO vehiculos (marca,modelo,axo,placas,color) VALUES (?,?,?,?,?)",
              jsonMarca.input.value,
              jsonModelo.input.value,
              jsonAxo.input.value,
              jsonPlacas.input.value,
              jsonColor.input.value
            );    
            win.close();
        
       }   
       else { // Actualizar

            Ti.App.db.execute("UPDATE vehiculos SET marca=?,modelo=?,axo=?,placas=?,color=? WHERE id=?",
              jsonMarca.input.value,
              jsonModelo.input.value,
              jsonAxo.input.value,
              jsonPlacas.input.value,
              jsonColor.input.value,
              datos.id
            );  
            win.close();           

       }        
  });
  contenedor.add(btnAceptar);
  
  if(!agregar){  
    contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 15 }));   
    var btnBorrar = new Button("Eliminar vehículo",params.color8,"90%");  
    btnBorrar.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
          cancel: 1,
          buttonNames: ['Si', 'No'],
          message: '¿ Desea borrar el vehículo?',
          title: 'Confirme'
        });
        dialog.addEventListener('click', function(e){
          if(e.index === e.source.cancel) {
               Ti.API.info('The cancel button was clicked');
          }
          else{         
             Ti.API.info("*** ID: " + datos.id );
             Ti.App.db.execute("DELETE FROM vehiculos WHERE id=?",datos.id);
             win.close();
          }
        });
        dialog.show();                   
    });
    contenedor.add(btnBorrar);
  }
  

  win.open();  
           
}

//
//
//
//
function DescargarVehiculosDeServidor(win, tablaDatos) {
 
 tablaDatos.data = [];
 
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
     agregarAutoListado(win, tablaDatos, json )
     rows.next();
 }
 rows.close(); 
   
}

//
//
//
//
//
function agregarAutoListado(win, tablaDatos, json ) {
   
   var row = Ti.UI.createTableViewRow({ 
       id: json.id,
       datos: json,
       height: 80, 
       width: Ti.UI.FILL,
       backgroundColor: 'transparent'
   });
   
   var vistaRenglon = Ti.UI.createView({
       width: Ti.UI.FILL,
       height: Ti.UI.FILL
   });
   row.add(vistaRenglon);
   vistaRenglon.add(Ti.UI.createImageView({ image: '/images/imgFlechaDerechaGris.png', height: 20, width: 20, right: '5%' }));
   vistaRenglon.add(Ti.UI.createView({ bottom: 0, width: '95%', right: 0, height: 1, borderColor: params.color13, borderWidth: 1 }));
   
   var texto = Ti.UI.createLabel({
       left: '5%',
       width: '70%',
       height: 'auto',
       text: json.marca + " " + json.modelo + " " + json.version + " color " + json.color + " placa " + json.placa,
       color: params.color6,
       font: { fontFamily: params.fuente_primaria, fontSize: 14 }
   });
   vistaRenglon.add(texto);
   
   tablaDatos.appendRow( row );
   
}
