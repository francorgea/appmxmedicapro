
function Input(placeholder,ancho,teclado,password,imagen) {

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
   imagen: null,
 };
 
	input.view = Ti.UI.createView({
     borderRadius: 8,
     backgroundColor: params.color7,
     borderWidth: 1,
     borderColor: params.color11, 
     width: ancho,
     height: 40,
	});
 
 input.imagen = Ti.UI.createImageView({
     image: imagen,
     left: 5,
     width: 27,
     height: 27
 });
 input.view.add(input.imagen);
 
 input.input = Ti.UI.createTextField({
       autocapitalization: autocapitalization,
       font: { fontFamily: params.fuente_montserrat, fontSize: 14 },
       tintColor: params.color1,
       autocorrect: false,
       keyboardType: tipoTeclado,
       borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
       color: params.color1,
       passwordMask: esPassword,
       hintText: placeholder,
       hintTextColor: params.color13,
       left: 45,
       right: 5,
       bottom: 1,
       height: '38dp'
  });
 input.view.add(input.input);

	return input;

}
module.exports = Input;