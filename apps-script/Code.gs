/** Sistema académico de evaluación de exposición VPH.
 * En Google Sheets: Extensiones > Apps Script, pegue este código.
 * Implante como aplicación web: ejecutar como YO, acceso CUALQUIER PERSONA.
 * Nunca publique los datos individuales de la planilla.
 */
const HEADERS = ['Fecha y hora','Nombre','Claridad (1-5)','Expositores (1-5)','Utilidad (1-5)','Comprendió prevención','Recomienda','Comentario','Promedio (1-5)'];
const SHEET_NAME = 'Evaluaciones VPH';
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Abre Apps Script desde la hoja de cálculo.');
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  sheet.setFrozenRows(1);
  sheet.getRange(1,1,1,HEADERS.length).setFontWeight('bold').setBackground('#163b68').setFontColor('white');
  sheet.autoResizeColumns(1,HEADERS.length);
  return 'Lista para recibir respuestas en: ' + ss.getUrl();
}
function doGet() {
  return ContentService.createTextOutput('Formulario VPH: endpoint activo.');
}
function doPost(e) {
  try {
    const lock = LockService.getScriptLock();
    if (!lock.tryLock(12000)) throw new Error('Sistema ocupado');
    try {
      const data = JSON.parse(e.postData.contents);
      if (data.website) return json({ok:true});
      const nombre = clean(data.nombre,100);
      const a = grade(data.claridad), b = grade(data.expositores), c = grade(data.utilidad);
      const prevencion = choose(data.prevencion,['Sí','Parcialmente','No']);
      const recomendacion = choose(data.recomendacion,['Sí','Tal vez','No']);
      const comentario = clean(data.comentario,500);
      if (!nombre) throw new Error('Nombre requerido');
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      if (!ss) throw new Error('No se encontró la planilla vinculada');
      const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
      if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
      sheet.appendRow([new Date(),nombre,a,b,c,prevencion,recomendacion,comentario,Math.round(((a+b+c)/3)*100)/100]);
      return json({ok:true});
    } finally {lock.releaseLock()}
  } catch (error) {console.error(error);return json({ok:false,error:'Datos inválidos o error de servidor'})}
}
function grade(v) {const n=Number(v);if(!Number.isInteger(n)||n<1||n>5)throw new Error('Calificación inválida');return n}
function choose(v,values){if(!values.includes(v))throw new Error('Opción inválida');return v}
function clean(v,max){let s=String(v||'').trim().slice(0,max);if(/^[=+@\-\t\r]/.test(s))s="'"+s;return s}
function json(obj){return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)}
