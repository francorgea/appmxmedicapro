//FirstView Component Constructor
function BarraTitulo( texto ) {

	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
 	   top: 0,
 	   backgroundColor: params.color1,
 	   width: Ti.UI.FILL,
 	   height: '10%'
	});

	self.add( Ti.UI.createView({ bottom: 0, width: Ti.UI.FILL, height: 2, backgroundColor: params.color1 }) );

 var txt = Ti.UI.createLabel({
     text: texto.toUpperCase(),
     font: { fontFamily: params.fuente_montserrat, fontSize: 15, fontWeight: 'bold' },
     color: params.color7,
     width: 'auto',
     height: 'auto'
 });
 if(Utiles.hasIOSNotch()){
   txt.bottom = 18;
 }
 self.add(txt);
	return self;
}

module.exports = BarraTitulo;