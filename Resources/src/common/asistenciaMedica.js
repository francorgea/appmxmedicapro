//
// Asistencia Medica
//
exports.servicios = function() {
 var servicios = [];  
 servicios.push( {servicio:'ORIENTACION MEDICA TELEFONICA', cuenta_siga: 'ONE', plan_siga: '030',  servicio_siga: '044' }) ;
 servicios.push( {servicio:'ORIENTACION NUTRICIONAL TELEFONICA', cuenta_siga: 'ONE', plan_siga: '030',  servicio_siga: '156' }) ;
 servicios.push( {servicio:'ORIENTACION PSICOLOGICA TELEFONICA', cuenta_siga: 'ONE', plan_siga: '030',  servicio_siga: '157' }) ;
 servicios.push( {servicio:'CONSULTA MEDICA GENERAL A DOMICILIO', cuenta_siga: 'ONE', plan_siga: '030',  servicio_siga: '124' }) ;
 servicios.push( {servicio:'ENVIO DE ENFERMERA A DOMICILIO', cuenta_siga: 'ONE', plan_siga: '030',  servicio_siga: '252' }) ;
 servicios.push( {servicio:'TRASLADO MEDICO TERRESTRE (AMBULANCIA)', cuenta_siga: 'ONE', plan_siga: '030',  servicio_siga: '002' }) ;
 servicios.push( {servicio:'CHECK UP QUIMICA DE 6 ELEMENTOS ', cuenta_siga: 'ONE', plan_siga: '030',  servicio_siga: 'M01' }) ;
 servicios.push( {servicio:'CONSULTA MEDICA GENERAL EN CLINICAS DE LA RED', cuenta_siga: 'ONE', plan_siga: '030',  servicio_siga: '045' }) ;
 servicios.push( {servicio:'CONSULTA MEDICA CON ESPECIALISTA EN CLINICAS DE LA RED', cuenta_siga: 'ONE', plan_siga: '030',  servicio_siga: '253' }) ;
 servicios.push( {servicio:'DESCUENTO Y PRECIOS PREFERENCIALES EN RED DE HOSPITALES, CLINICAS Y DOCTORES', cuenta_siga: 'ONE', plan_siga: '030',  servicio_siga: 'M22' }) ;
 servicios.push( {servicio:'DESCUENTO Y PRECIOS PREFERENCIALES EN LABORATORIOS Y CENTROS DE ANALISIS Y ESTUDIOS', cuenta_siga: 'ONE', plan_siga: '030',  servicio_siga: '126' }) ;
 return servicios;
};
