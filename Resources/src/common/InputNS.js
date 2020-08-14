
function Input(placeholder,ancho,teclado,password) {

 var tipoTeclado;
 var esPassword;
 var autocapitalization;
 switch(teclado){
    case "N": tipoTeclado=Titanium.UI.KEYBOARD_TYPE_NUMBER_PAD; break;
    case "T": tipoTeclado=Titanium.UI.KEYBOARD_TYPE_PHONE_PAD; break;
    case "E": tipoTeclado=Titanium.UI.KEYBOARD_TYPE_EMAIL; break;
    default: Titanium.UI.KEYBOARD_TYPE_DEFAULT;
 }
 
 if(password=="S"){
    esPassword = true;
    autocapitalization = Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE;
 }
 else{
    esPassword = false;
    autocapitalization = Titanium.UI.TEXT_AUTOCAPITALIZATION_WORDS;
    if(teclado=="E"){
      autocapitalization = Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE;
    }
 }
 autocapitalization = Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE;

 var input = { 
   view: null,
   input: null,
   label: null,
 };
 
	input.view = Ti.UI.createView({
     borderRadius: 2,
     backgroundColor: params.color7,
     width: ancho,
     height: 50,
	});
 
 input.label = Ti.UI.createLabel({
     text: placeholder,
     font: { fontFamily: params.fuente_montserrat, fontSize: 10 },
     color: params.color13,
     top: 1,
     left: 5,
     right: 5,
 });
 input.view.add(input.label);
 
 input.input = Ti.UI.createTextField({
       autocapitalization: autocapitalization,
       font: { fontFamily: params.fuente_montserrat, fontSize: 14 },
       tintColor: params.color0,
       autocorrect: false,
       keyboardType: tipoTeclado,
       borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
       color: params.color0,
       passwordMask: esPassword,
       left: 5,
       right: 5,
       bottom: 1,
       height: '38dp'
  });
 input.view.add(input.input);
 

	return input;

}
module.exports = Input;