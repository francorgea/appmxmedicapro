
function Button(texto,color,ancho) {

 
 var btn = Ti.UI.createButton({
     title: texto,
     borderRadius: 15,
     backgroundColor: color,
     borderColor: color,     
     font: { fontFamily: params.fuente_montserrat, fontSize: 14 },
     color: params.color7,
     width: ancho,
     height: '27dp'
 });
 

	return btn;

}
module.exports = Button;