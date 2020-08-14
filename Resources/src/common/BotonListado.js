
function BotonListado(texto,color,ancho,alto,imagen) {

 imagen = typeof imagen !== 'undefined' ? imagen : '';
 
 var vistaBoton = Ti.UI.createView({
     width: ancho,
     height: alto,
     backgroundColor: color,
 });
 
 var texto = Ti.UI.createLabel({
     text: texto,
     font: { fontFamily: params.fuente_opensans, fontSize: 10 },
     color: params.color7,
     left: '10%',
     align: 'center',
 });
 vistaBoton.add(texto);
 
 if(imagen!=""){
  
    var vistaImagen = Ti.UI.createImageView({
        width: 20,
        height: 20,
        image: imagen,
        right: '10%'
    });
    vistaBoton.add(vistaImagen);    
  
 }
 
 /*
 var btn = Ti.UI.createButton({
     title: texto,
     borderRadius: 5,
     backgroundColor: color,
     borderColor: color,     
     font: { fontFamily: params.fuente_montserrat, fontSize: 14 },
     color: params.color7,
     width: ancho,
     height: '40dp'
 });
 */
 

	return vistaBoton;

}
module.exports = BotonListado;