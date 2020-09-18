
//
//
//
function Mostrar(win){ 
  
    var Button = require("src/common/Button");
    var Input = require("src/common/InputNS");
    win.backgroundImage =  "/images/fondos/fondo.png";
    
    
    
    // Definimos el contenedor y el scroll
    var scroll = Ti.UI.createScrollView({ 
        top: '10%',
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,  
    });
    var contenedor = Ti.UI.createView({
        // layout: 'vertical',
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
    });
    scroll.add(contenedor);
    win.add(scroll);
    
		var logo = Ti.UI.createImageView({
	  			image: 'images/logo.png',
	  			height: '15%',
	  			width: '31%',
	  			top: '50%',
	  			zIndex: 9999
  });
  
  contenedor.add(logo);

    
    var nombre_app = Ti.UI.createLabel({ 
	    			top: '70%',
        text: params.app_name, 
        font: { fontFamily: params.fuente_primaria, fontSize: 16  } , 
        color: params.color0,
    });
    contenedor.add(nombre_app);
    
    
    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 })); 

    var version = Ti.UI.createLabel({ 
	    			top: '75%',
        text: "Versión " + params.app_version, 
        font: { fontFamily: params.fuente_primaria, fontSize: 16  } , 
        color: params.color0,
    });
    contenedor.add(version);
    
    // Espacio
    contenedor.add(Ti.UI.createView({ height: 40 }));  
            
    
    var gea = Ti.UI.createLabel({ 
	    			top: '82%',
        text: "GEA Internacional SA de CV", 
        color: params.color7,
        font: { fontFamily: params.fuente_primaria, fontSize: 16  } , 
    });
    contenedor.add(gea);
    var derechos = Ti.UI.createLabel({ 
        top: '87%',
        text: "(c) 2018 Todos los derechos reservados",
        color: params.color7, 
        font: { fontFamily: params.fuente_primaria, fontSize: 16  } , 
        
    });
    contenedor.add(derechos);
    
    contenedor.add(Ti.UI.createView({ height:40 }));  
    
}
exports.Mostrar = Mostrar;  
