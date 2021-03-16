
function Opciones( mainView, winPrincipal ) {   
 
  var contenedor = Ti.UI.createView({
      width: Ti.UI.FILL,
      height: Ti.UI.FILL,
      layout: 'vertical', 
      backgroundColor: params.color7
  });  
  
  var objBarraTitulo = require("/src/common/BarraTitulo");
  var barraTitulo    = new objBarraTitulo("OPCIONES");
  contenedor.add(barraTitulo);	


 var altoRenglonConfig = 60;

 // Separador
 contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 5, backgroundColor: params.color10   }));
 
 // Perfil
 var vistaPerfil = Ti.UI.createView({
     width: Ti.UI.FILL,
     height: altoRenglonConfig,     
 });
 vistaPerfil.addEventListener("click", function(){
 });
 vistaPerfil.add(Ti.UI.createImageView({ image: '/images/icoUsuario.png', height: 20, width: 20, left: '5%' }));
 vistaPerfil.add(Ti.UI.createImageView({ image: '/images/imgFlechaDerechaGris.png', height: 20, width: 20, right: '2%' }));
 vistaPerfil.add(Ti.UI.createLabel({ text: "Mi Perfil", font: { fontFamily: params.fuente_primaria, fontSize: 13 },color: params.color6, left: '15%', width: 'auto', height: 'auto' 	}));
 vistaPerfil.add(Ti.UI.createView({ bottom: 0, width: '95%', right: 0, height: 1, borderColor: params.color10, borderWidth: 1 }));
 vistaPerfil.addEventListener("click", function(){
    var win = new GenericWindow( "S", "Perfil" ) ;
	   var perfil = require("src/vistas/perfil");
	   perfil.Mostrar( win );
    win.open();             
 });
 contenedor.add(vistaPerfil);

 // Separador
 contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 5, backgroundColor: params.color10   }));

 // Políticas de privacidad
 var vistaPP = Ti.UI.createView({
     width: Ti.UI.FILL,
     height: altoRenglonConfig,     
 });
 vistaPP.addEventListener("click", function(){
     Utiles.abrirEnlace(params.pagina_pp);
 });
 vistaPP.add(Ti.UI.createImageView({ image: '/images/icoTerminos.png', height: 20, width: 20, left: '5%' }));
 vistaPP.add(Ti.UI.createImageView({ image: '/images/imgFlechaDerechaGris.png', height: 20, width: 20, right: '2%' }));
 vistaPP.add(Ti.UI.createLabel({ text: "Políticas de Privacidad", font: { fontFamily: params.fuente_primaria, fontSize: 13 },color: params.color6, left: '15%', width: 'auto', height: 'auto' 	}));
 vistaPP.add(Ti.UI.createView({ bottom: 0, width: '95%', right: 0, height: 1, borderColor: params.color10, borderWidth: 1  }));
 contenedor.add(vistaPP);
	
	// Términos y condiciones producto GOLD
 var vistaTerminosGold = Ti.UI.createView({
     width: Ti.UI.FILL,
     height: altoRenglonConfig,     
 });
 vistaTerminosGold.addEventListener("click", function(){
     Utiles.abrirEnlace("https://www.geainternacional.com/mx/gelthy/ANEXO_C_PLAN_BLACK.pdf");
 });
 vistaTerminosGold.add(Ti.UI.createImageView({ image: '/images/icoTerminos.png', height: 20, width: 20, left: '5%' }));
 vistaTerminosGold.add(Ti.UI.createImageView({ image: '/images/imgFlechaDerechaGris.png', height: 20, width: 20, right: '2%' }));
 vistaTerminosGold.add(Ti.UI.createLabel({ text: "Términos y Condiciones GOLD", font: { fontFamily: params.fuente_primaria, fontSize: 13 },color: params.color6, left: '15%', width: 'auto', height: 'auto' 	}));
 vistaTerminosGold.add(Ti.UI.createView({ bottom: 0, width: '95%', right: 0, height: 1, borderColor: params.color10, borderWidth: 1  }));
 contenedor.add(vistaTerminosGold);
	
	// Términos y condiciones producto BLACK
 var vistaTerminosBlack = Ti.UI.createView({
     width: Ti.UI.FILL,
     height: altoRenglonConfig,     
 });
 vistaTerminosBlack.addEventListener("click", function(){
     Utiles.abrirEnlace("https://www.geainternacional.com/mx/gelthy/ANEXO_B_PLAN_PLATINUM.pdf");
 });
 vistaTerminosBlack.add(Ti.UI.createImageView({ image: '/images/icoTerminos.png', height: 20, width: 20, left: '5%' }));
 vistaTerminosBlack.add(Ti.UI.createImageView({ image: '/images/imgFlechaDerechaGris.png', height: 20, width: 20, right: '2%' }));
 vistaTerminosBlack.add(Ti.UI.createLabel({ text: "Términos y Condiciones BLACK", font: { fontFamily: params.fuente_primaria, fontSize: 13 },color: params.color6, left: '15%', width: 'auto', height: 'auto' 	}));
 vistaTerminosBlack.add(Ti.UI.createView({ bottom: 0, width: '95%', right: 0, height: 1, borderColor: params.color10, borderWidth: 1  }));
 contenedor.add(vistaTerminosBlack);
	
	// Términos y condiciones producto PLATINO
 var vistaTerminosPlatino = Ti.UI.createView({
     width: Ti.UI.FILL,
     height: altoRenglonConfig,     
 });
 vistaTerminosPlatino.addEventListener("click", function(){
     Utiles.abrirEnlace("https://www.geainternacional.com/mx/gelthy/ANEXO_A_PLAN_GOLD.pdf");
 });
 vistaTerminosPlatino.add(Ti.UI.createImageView({ image: '/images/icoTerminos.png', height: 20, width: 20, left: '5%' }));
 vistaTerminosPlatino.add(Ti.UI.createImageView({ image: '/images/imgFlechaDerechaGris.png', height: 20, width: 20, right: '2%' }));
 vistaTerminosPlatino.add(Ti.UI.createLabel({ text: "Términos y Condiciones PLATINO", font: { fontFamily: params.fuente_primaria, fontSize: 13 },color: params.color6, left: '15%', width: 'auto', height: 'auto' 	}));
 vistaTerminosPlatino.add(Ti.UI.createView({ bottom: 0, width: '95%', right: 0, height: 1, borderColor: params.color10, borderWidth: 1  }));
 contenedor.add(vistaTerminosPlatino);

 // Separador
 contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 5, backgroundColor: params.color10   }));


 // Página Web
 var vistaWeb = Ti.UI.createView({
     width: Ti.UI.FILL,
     height: altoRenglonConfig,     
 });
 vistaWeb.addEventListener("click", function(){
    Utiles.abrirEnlace(params.pagina_web);
 });
 vistaWeb.add(Ti.UI.createImageView({ image: '/images/icoPaginaWeb.png', height: 20, width: 20, left: '5%' }));
 vistaWeb.add(Ti.UI.createImageView({ image: '/images/imgFlechaDerechaGris.png', height: 20, width: 20, right: '2%' }));
 vistaWeb.add(Ti.UI.createLabel({ text: "Página Web", font: { fontFamily: params.fuente_primaria, fontSize: 13 },color: params.color6, left: '15%', width: 'auto', height: 'auto' 	}));
 vistaWeb.add(Ti.UI.createView({ bottom: 0, width: '95%', right: 0, height: 1, borderColor: params.color10, borderWidth: 1  }));
 contenedor.add(vistaWeb);


 // Acerca de
 var vistaInfo = Ti.UI.createView({
     width: Ti.UI.FILL,
     height: altoRenglonConfig,     
 });
 vistaInfo.addEventListener("click", function(){
    var win = new GenericWindow( "S", "Información" ) ;
	   var acerca = require("src/vistas/acerca");
	   acerca.Mostrar( win );
    win.open();               
 });
 vistaInfo.add(Ti.UI.createImageView({ image: '/images/icoInformacion.png', height: 20, width: 20, left: '5%' }));
 vistaInfo.add(Ti.UI.createImageView({ image: '/images/imgFlechaDerechaGris.png', height: 20, width: 20, right: '2%' }));
 vistaInfo.add(Ti.UI.createLabel({ text: "Información", font: { fontFamily: params.fuente_primaria, fontSize: 13 },color: params.color6, left: '15%', width: 'auto', height: 'auto' 	}));
 vistaInfo.add(Ti.UI.createView({ bottom: 0, width: '95%', right: 0, height: 1, borderColor: params.color10, borderWidth: 1  }));
 contenedor.add(vistaInfo);

  return contenedor;
}
module.exports = Opciones;


