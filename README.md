# Evaluación de la exposición — VPH

Sitio público para recibir evaluaciones durante la Feria de Promoción de la Salud. Diseño móvil en español, preguntas rápidas, nombre del participante y almacenamiento privado en Google Sheets.

## 1. Publicar la página
En GitHub → **Settings → Pages**, seleccione **Deploy from a branch**, rama **main**, carpeta **/(root)**, y guarde. La URL esperada es:
https://delta-1.github.io/Evaluaci-n-de-la-exposici-n-/

*La URL solamente funcionará después de activar GitHub Pages. Verifique en el móvil antes de imprimir el QR.*

## 2. Conectar Google Sheets (necesario para guardar respuestas)
1. Cree una planilla nueva en Google Sheets, con un nombre como `Evaluaciones VPH - Feria UPDS`.
2. En la planilla: **Extensiones → Apps Script**.
3. Sustituya el contenido por el código de `apps-script/Code.gs`.
4. Ejecute la función **setup** una vez y autorice los permisos. Se creará la pestaña `Evaluaciones VPH`.
5. Pulse **Implementar → Nueva implementación → Aplicación web**.
6. Seleccione **Ejecutar como: Yo**, **Quién tiene acceso: Cualquier persona** (si aparece esa opción), e implemente. Copie la URL terminada en `/exec`.
7. En GitHub edite `config.js` y complete `scriptUrl` con esa URL. Guarde.
8. Pruebe una evaluación desde un teléfono y **verifique que aparece una nueva fila** en la planilla, antes de compartir el código QR.

**Importante:** la respuesta del navegador se envía con `no-cors`: mostrar la pantalla de agradecimiento no prueba que Sheets haya guardado la fila. Para validar la instalación haga una prueba real y compruebe el registro en la planilla. Solo comparta el sitio público, nunca la planilla que contiene nombres.

## 3. Logotipo
Coloque la imagen oficial provista por el organizador en `assets/logo-upds.png` y cambie `logoUrl` en `config.js` a `"assets/logo-upds.png"`. Antes de recibir ese archivo, hay un espacio neutral marcado UPDS.

## 4. Código QR
Use la URL pública de GitHub Pages anterior. **No** apunte el QR a la dirección de GitHub del repositorio ni a Google Sheets. Puede crear el QR con una herramienta local o un editor y colocarlo en un cartel o PDF. Confirme primero que la página y la planilla funcionan.

## Preguntas y datos
Nombre, claridad 1-5, expositores 1-5, utilidad 1-5, comprensión de prevención, recomendación, comentario opcional, fecha/hora y media de tres notas. No se solicitan datos médicos personales.

**Nota:** esta versión básica no incluye un panel administrador ni autenticación. El endpoint público podría recibir envíos indebidos; supervise la hoja durante el evento y comparta el enlace únicamente en el contexto de la feria.
