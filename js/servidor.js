var server = {
	pr: null,
	di: null,
	th: null,
	sincronizar: function(pr, di, th){
		server.pr = pr;
		server.di = di;
		server.th = th;
		   $.ajax({
			  method: "POST",
			  url: "http://carlos.igitsoft.com/apps/test.php",
			  data: { personas: pr, dias: di, tipo: th },
			   error: function(jq,txt){
				   navigator.notification.alert("hubo un error al intentar sincronizar los datos guardados",null,"Error","Aceptar");
			   }
			}).done(server.sincronizado);  
	},
	sincronizado : function(msg){
		if(msg == 1) {
			navigator.notification.alert("Los datos fueron sincronizados correctamente",null,"Sincronizado","Aceptar");
			almacen.guardarHistorial(server.pr,server.di,server.th);
		}
		else
			navigator.notification.alert("hubo un error al intentar sincronizar los datos guardados",null,"Error","Aceptar");
	}
}