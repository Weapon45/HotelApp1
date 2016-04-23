var server = {
	sincronizar: function(pr, di, th){
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
			navigator.notification.alert("Los datos fueron sincronizador correctamente",null,"Sincronizado","Aceptar");
		}
	}
}