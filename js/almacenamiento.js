var almacen = {
	pr: null,
	di:	null,
	th: null,
	guardarReserva : function(pr,di,th){
		almacen.pr = pr;
		almacen.di = di;
		almacen.th = th;
		
		almacen.db = window.openDatabase("hotelApp","1.0","HotelApp Storage",20000);
		almacen.db.transaction(almacen.hacerReserva,almacen.error,almacen.reservaGuardada);
	},
	hacerReserva: function(tx){
		tx.executeSql("CREATE TABLE IF NOT EXISTS reservas (pr,di,th)");
		tx.executeSql("INSERT INTO reservas (pr,di,th) VALUES ('"+ almacen.pr + "','" + almacen.di + "','" + almacen.th + "')");
	},
	error: function(){
		alert("Error al acceder a la Base de Datos");
	},
	reservaGuardada : function(){
		navigator.notification.alert("Reserva guardada en espera de sincronización",null, "Felicidades", "Aceptar");
	},
	leerReservas: function(){
		almacen.db.transaction(almacen.consultaReservas,almacen.error,null);
		
	},
	consultaReservas: function(tx){
		tx.executeSql("SELECT * FROM reservas", [], function(tx2, t){
					  for(i = 0; i < t.rows.length; i++){
						  /*navigator.notification.confirm("Personas: " + t.rows.item(i).pr + "\n" + "Dias: " + t.rows.item(i).di + "\n" + "Tipo de Habitación: " + t.rows.item(i).th,
														function(btn){
							  if(btn == 1) navigator.vibrate(1000);
							  if(btn == 2) navigator.notification.beep(1);
						  },"Tabla Reservas","Vibrar,Sonar,Cancelar");*/
						  server.sincronizar(t.rows.item(i).pr,t.rows.item(i).di,t.rows.item(i).th);
					  }
					  });
	},
	eliminarReservas: function(tx){
		tx.executeSql("DELETE FROM reservas WHERE pr= '" + almacen.pr +"' and di = '" + almacen.di + "' and th = '" + almacen.th + "'");
	},
	guardarHistorial : function(pr,di,th){
		almacen.pr = pr;
		almacen.di = di;
		almacen.th = th;
		
		almacen.db = window.openDatabase("hotelApp","1.0","HotelApp Storage",20000);
		almacen.db.transaction(almacen.insertarHistorial,almacen.error,almacen.HistorialGuardado);
	},
	insertarHistorial : function(tx){
		tx.executeSql("CREATE TABLE IF NOT EXISTS historial (pr, di, th)");
		tx.executeSql("INSERT INTO historial (pr,di,th) VALUES ('"+ almacen.pr + "','" + almacen.di + "','" + almacen.th + "')");
		almacen.eliminarReservas(tx);
	},
	HistorialGuardado: function(){
		navigator.notification.alert("Historial guardado Correctamente",null, "Felicidades", "Aceptar");
		
	},
	MostrarHistorial: function(tx){
		var grid = '';
		tx.executeSql("SELECT * FROM historial", [], function(tx2,t){
			for(i = 0; i < t.rows.length; i++){
				grid = grid + '<div class="ui-grid-b"><div class="ui-block-a"><div class="ui-bar ui-bar-a" style="height:60px">' + almacen.pr + '</div></div><div class="ui-block-b"><div class="ui-bar ui-bar-a" style="height:60px">' + almacen.di + '</div></div><div class="ui-block-c"><div class="ui-bar ui-bar-a" style="height:60px">' + almacen.th + '</div></div></div>';
			}
		});
		$("his").html(grid);		
	}
}