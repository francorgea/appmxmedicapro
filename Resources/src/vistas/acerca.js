
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
        layout: 'vertical',
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
    });
    scroll.add(contenedor);
    win.add(scroll);
    
    
    var nombre_app = Ti.UI.createLabel({ 
        text: params.app_name, 
        font: { fontFamily: params.fuente_primaria, fontSize: 16  } , 
        color: params.color7,
    });
    contenedor.add(nombre_app);
    
    
    // Espacio
    contenedor.add(Ti.UI.createView({ height: 10 })); 

    var version = Ti.UI.createLabel({ 
        text: "Versión " + params.app_version, 
        font: { fontFamily: params.fuente_primaria, fontSize: 16  } , 
        color: params.color10,
    });
    contenedor.add(version);
    
    // Espacio
    contenedor.add(Ti.UI.createView({ height: 40 }));  
            
    
    var gea = Ti.UI.createLabel({ 
        text: "GEA Internacional SA de CV", 
        color: params.color7,
        font: { fontFamily: params.fuente_primaria, fontSize: 16  } , 
    });
    contenedor.add(gea);
    var derechos = Ti.UI.createLabel({ 
        text: "(c) 2018 Todos los derechos reservados",
        color: params.color10, 
        font: { fontFamily: params.fuente_primaria, fontSize: 16  } , 
    });
    contenedor.add(derechos);
    
    contenedor.add(Ti.UI.createView({ height:40 }));  
    
    // Logo2
    var logo2 = Ti.UI.createImageView({ image: "/images/logoinferior.png", width: '95%' });
    contenedor.add(logo2);
    
       

}
exports.Mostrar = Mostrar;  
