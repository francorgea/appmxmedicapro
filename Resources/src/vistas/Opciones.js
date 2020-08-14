
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


 var altoRenglonConfig = 70;

 // Separador
 contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 20, backgroundColor: params.color10   }));
 
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

 // Vehículos
 /*
 var vistaVehiculos = Ti.UI.createView({
     width: Ti.UI.FILL,
     height: altoRenglonConfig,     
 });
 vistaVehiculos.addEventListener("click", function(){
 });
 vistaVehiculos.add(Ti.UI.createImageView({ image: '/images/icoVehiculos.png', height: 20, width: 20, left: '5%' }));
 vistaVehiculos.add(Ti.UI.createImageView({ image: '/images/imgFlechaDerechaGris.png', height: 20, width: 20, right: '2%' }));
 vistaVehiculos.add(Ti.UI.createLabel({ text: "Mis Vehículos", font: { fontFamily: params.fuente_primaria, fontSize: 13 },color: params.color6, left: '15%', width: 'auto', height: 'auto' 	}));
 vistaVehiculos.add(Ti.UI.createView({ bottom: 0, width: '95%', right: 0, height: 1, borderColor: params.color10, borderWidth: 1  }));
 vistaVehiculos.addEventListener("click", function(){
    var win = new GenericWindow( "S", "Mis vehículos" ) ;
	   var vehiculos = require("src/vistas/vehiculos");
	   vehiculos.Mostrar( win );
    win.open();             
 }); 
 contenedor.add(vistaVehiculos);
 */

 // Separador
 contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 20, backgroundColor: params.color10   }));

 // Términos y condiciones
 var vistaTerminos = Ti.UI.createView({
     width: Ti.UI.FILL,
     height: altoRenglonConfig,     
 });
 vistaTerminos.addEventListener("click", function(){
     Utiles.abrirEnlace(params.pagina_tyc);
 });
 vistaTerminos.add(Ti.UI.createImageView({ image: '/images/icoTerminos.png', height: 20, width: 20, left: '5%' }));
 vistaTerminos.add(Ti.UI.createImageView({ image: '/images/imgFlechaDerechaGris.png', height: 20, width: 20, right: '2%' }));
 vistaTerminos.add(Ti.UI.createLabel({ text: "Términos y Condiciones", font: { fontFamily: params.fuente_primaria, fontSize: 13 },color: params.color6, left: '15%', width: 'auto', height: 'auto' 	}));
 vistaTerminos.add(Ti.UI.createView({ bottom: 0, width: '95%', right: 0, height: 1, borderColor: params.color10, borderWidth: 1  }));
 contenedor.add(vistaTerminos);


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


 // Separador
 contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 20, backgroundColor: params.color10   }));


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

 // Separador
 contenedor.add(Ti.UI.createView({ width: Ti.UI.FILL, height: 20, backgroundColor: params.color10   }));

  
  return contenedor;
}
module.exports = Opciones;


