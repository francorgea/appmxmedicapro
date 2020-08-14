//FirstView Component Constructor
function tituloPrincipal( imagenMostrar ) {

	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
 	   top: 0,
 	   backgroundColor: params.color1,
 	   width: Ti.UI.FILL,
 	   height: '20%'
	});

 var imgTitulo = Ti.UI.createImageView({
     image: imagenMostrar,
     bottom: 0,
     height: '70%'
 });
 self.add(imgTitulo);


	return self;
}

module.exports = tituloPrincipal;