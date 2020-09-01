//
// Asistencia Veterinaria
//
exports.servicios = function() {
 var servicios = [];  
 servicios.push( {servicio:'ASISTENCIA VETERINARIA TELEFONICA', cuenta_siga: 'ONE', plan_siga: '030',  servicio_siga: '086' }) ;
 servicios.push( {servicio:'CONSULTA VETERINARIA EN CLINICAS DE LA RED', cuenta_siga: 'ONE', plan_siga: '030',  servicio_siga: 'T01' }) ;
 servicios.push( {servicio:'VACUNA ANTIRRABICA PARA CACHORROS MENORES A 6 MESES', cuenta_siga: 'ONE', plan_siga: '030',  servicio_siga: 'T18' }) ;
 return servicios;
};
