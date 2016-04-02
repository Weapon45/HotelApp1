//capture.js
var capture = {
	//FUNCION PARA TOMAR LAS FOTOS Y RECORRERLAS
    success: function(mf){
       var i, path, len;
       for (i = 0, len = mediaFiles.length; i < len; i += 1) {
           path = mediaFiles[i].fullPath;
       } 
       $('#regFoto').add('data-foto',path);
       $('#regFoto').html('<img src="'+path+'" style="width:100%;">');
    },
	//FUNCION DE ERROR
	captureError: function(error) {
    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error','Perfecto');
	},
	//FUNCION PARA INICIAR
	takePhoto: function(){
		navigator.device.capture.captureImage(capture.success, capture.captureError, {limit:2});
	}
}
