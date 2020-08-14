
function ComboVista(placeholder, ancho, seleccionada) {

 var jsonCombo = {
     view: null,
     label: null,
     placeHolder: null,
 };

 jsonCombo.view = Ti.UI.createView({
     borderRadius: 2,
     backgroundColor: params.color7,
     width: ancho,
     height: 50,
	});
	
 jsonCombo.placeHolder = Ti.UI.createLabel({
     text: placeholder,
     font: { fontFamily: params.fuente_montserrat, fontSize: 10 },
     color: params.color13,
     top: 1,
     left: 5,
     right: 5,
 });
 jsonCombo.view.add(jsonCombo.placeHolder);
	
 
 var vistaImagen = Ti.UI.createView({
     right: 0,
     height: Ti.UI.FILL,
     width: '10%',
 });
 var imgCombo = Ti.UI.createImageView({
     image: "/images/imgFlechaDerechaGris.png",
     width: 20,
     height: 20,
 }); 
 vistaImagen.add(imgCombo);
 jsonCombo.view.add(vistaImagen);
 
 jsonCombo.label = Ti.UI.createLabel({
     text: seleccionada,
     left: 5,
     bottom: 9,
     width: '85%',
     height: 30,
     color: params.color6,
     font: { fontFamily: params.fuente_montserrat, fontSize: 14 }
 });
 jsonCombo.view.add(jsonCombo.label);
 
	return jsonCombo;

}
module.exports = ComboVista;