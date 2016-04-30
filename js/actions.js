var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},
    init: function(){
		// -- FUNCION PARA REGISTRO --
        if(!fn.estaRegistrado())
            window.location.href = '#registro';
        $('#registro div[data-role=footer] a').click(fn.registrar);
		$('#tomarFoto').click(capture.takePhoto);	
		
		// -- FUNCION PARA RESERVAR --
		$('#nr1 div[data-role=navbar] a:eq(0)').tap(fn.siguientePaso);
		$('#nr2 ul[data-role=listview] a').tap(fn.seleccionaHabitacion);
		$('#nr2 div[data-role=navbar] a:eq(0)').tap(fn.obtenerReserva);
		$('#historial').click(almacen.MostrarHistorial);
		
		// -- SINCRONIZAR AUTOMATICAMENTE CUANDO SE CONECTE A INTERNET
		document.addEventListener("online",almacen.leerReservas,false);
            },
    // --- FUNCIONES DE VALIDACION DE REGISTRO ---
    estaRegistrado: function(){
		var usr = window.localStorage.getItem("user");
		if(usr == undefined || usr == ''){			
        	return false;
		}
		else{
			return true;
		}
    },
    registrar: function(){
        // -- SE OBTIENE VALORES DE CAMPOS --
        var nom = $('#regNom').val();
        var mail = $('#regMail').val();
        var tel = $('#regTel').val();
        var foto = $('#regFoto').data('foto');
        
        // -- COMPROBAMOS SI LOS CAMPOS NO ESTAN VACIOS --
        if(nom != '' && mail != '' && tel != '' && foto != undefined){
			$.mobile.loading("show", {
				theme: 'b'
			});
           $.ajax({
			  method: "POST",
			  url: "http://carlos.igitsoft.com/apps/test.php",
			  data: { nom: nom, mail: mail, tel: tel },
			   error: function(jq,txt){
				   $.mobile.loading("hide");
				   alert(jq+txt);
			   }
			}).done(function( msg ) {
			   //alert(msg);
				if(msg == 1){
					ft.transfer(foto);
				}
			});
		}else
            alert('Todos Los Campos Son Requeridos');        
    },
	// -- FUNCIONES DE RESERVA --
	per: '',
	dia: '',
	th: '',
	siguientePaso: function(){
		fn.per	=	$('#nrPer').val();
		fn.dia	=	$('#nrDia').val();
		if (fn.per != '' && fn.dia != '' )
			window.location.href="#nr2";
		else
			//alert("todos");
			navigator.notification.alert("Todos los campos son requeridos",null,"Error al llenar","Aceptar");
	},
	seleccionaHabitacion: function(){
		$(this).parent().parent().find('a').css('background-color','transparent');
		$(this).css('background-color','green');
		fn.th = $(this).parent().index();
		//alert(fn.th);
		
	},
	obtenerReserva: function(){
		if(fn.th != ''){
			if(navigator.connection.type != Connection.NONE)
				server.sincronizar(fn.per,fn.dia,fn.th);
				//navigator.notification.alert("Envia a Servidor",null,"Aviso","Aceptar");
				//alert("Envia a servidor");
				else
					almacen.guardarReserva(fn.per,fn.dia,fn.th);
					//navigator.notification.alert("Guarda Localmente",null,"Aviso","Aceptar");
				    //alert("Guardar Localmente");
		}
		else
			//alert("Todos");
			navigator.notification.alert("Debe seleccionar tipo de habitacion",null,"Error al llenar","Aceptar");
	}
};    
$(fn.ready);