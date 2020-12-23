
function Llamada() {

  var Button = require("/src/common/Button");

  var contenedor = Ti.UI.createView({
      width: Ti.UI.FILL,
      height: Ti.UI.FILL,
      backgroundColor: params.color7,
  });

  var objBarraTitulo = require("/src/common/BarraTitulo");
  var barraTitulo    = new objBarraTitulo("LLAMADA");
  contenedor.add(barraTitulo);


  var imgTrabajador = Ti.UI.createImageView({
      image: "/images/agentecallcenter.jpg",
      width: '70%',
      borderRadius: 20,
      top: '20%',
      borderColor: params.color2,
      borderWidth: 5
  });
  contenedor.add(imgTrabajador);


   var txt = Ti.UI.createLabel({
       top: '55%',
       text: "Soluciones las 24 horas, los 7 días de la semana, nuestro personal áltamente calificado está disponible para ayudarlo a resolver cualquier inconveniente.",
       font: { fontFamily: params.fuente_primaria, fontSize: 15 },
       color: params.color1,
       width: '70%',
       height: 'auto'
   });
   contenedor.add(txt);


   var btnLlamada = new Button("llamar",params.color2,'70%');
   btnLlamada.addEventListener("click", function(){
       Utiles.MarcarNumero( params.piloto );
   });
   btnLlamada.bottom = '10%';
   contenedor.add(btnLlamada);

  return contenedor;
}
module.exports = Llamada;


