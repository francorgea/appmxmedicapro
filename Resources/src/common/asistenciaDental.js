//
// Asistencia Dental
//
exports.servicios = function() {
 var servicios = [];  
 servicios.push( {servicio:'LIMPIEZA DENTAL', cuenta_siga: 'ONE', plan_siga: '030',  servicio_siga: '303' }) ;
 servicios.push( {servicio:'DESCUENTO EN PROCEDIMIENTOS DENTALES', cuenta_siga: 'ONE', plan_siga: '030',  servicio_siga: 'D01' }) ;
 return servicios;
};
