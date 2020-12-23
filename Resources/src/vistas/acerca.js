
//
//
//
function Mostrar(win){

    var Button = require("src/common/Button");
    var Input = require("src/common/InputNS");
    win.backgroundImage =  "/images/fondos/fondo.png";

    // Definimos el contenedor y el scroll
    var scroll = Ti.UI.createScrollView({
        top: '48%',
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
    });
    var contenedor = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: 'vertical'
    });
    scroll.add(contenedor);
    win.add(scroll);

    contenedor.add(Ti.UI.createView({ height: 20 }));

  		var logo = Ti.UI.createImageView({
  	  			image: 'images/logo.png',
  	  			width: '31%',
  	  			zIndex: 9999
    });
    contenedor.add(logo);

    // Espacio
    contenedor.add(Ti.UI.createView({ height: 20 }));

    var version = Ti.UI.createLabel({
        text: "Versión " + params.app_version,
        font: { fontFamily: params.fuente_primaria, fontSize: 16  } ,
        color: params.color0,
    });
    contenedor.add(version);

    contenedor.add(Ti.UI.createView({ height: 40 }));

    var logogea = Ti.UI.createImageView({
     image: 'images/logogea.png',
     width: '31%',
     zIndex: 9999
    });
    contenedor.add(logogea);

    // Espacio
    contenedor.add(Ti.UI.createView({ height: 20 }));

    var gea = Ti.UI.createLabel({
        text: "GEA Internacional SA de CV",
        color: params.color0,
        font: { fontFamily: params.fuente_primaria, fontSize: 16  } ,
    });
    contenedor.add(gea);

    contenedor.add(Ti.UI.createView({ height: 10 }));

    var derechos = Ti.UI.createLabel({
        text: "(c) 2021 Todos los derechos reservados",
        color: params.color0,
        font: { fontFamily: params.fuente_primaria, fontSize: 16  } ,

    });
    contenedor.add(derechos);

    contenedor.add(Ti.UI.createView({ height:40 }));

}
exports.Mostrar = Mostrar;
