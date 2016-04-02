var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},
    init: function(){
        if(!fn.estaRegistrado())
            window.location.href = '#registro';
        // -- MANDO A LLAMAR EL BOTON QUE ESTA DENTRO DEL DIV ---
        $('#registro div[data-role=footer] a').click(fn.registrar);
        // -- MANDO A LLAMAR EL BOTON QUE ESTA DENTRO DEL DIV ---
		
		// -- MANDO A LLAMAR EL BOTON TOMAR FOTO --
		$('#tomarFoto').click(capture.takePhoto);
		// -- MANDO A LLAMAR EL BOTON TOMAR FOTO --
            },
    // --- FUNCIONES DE REGISTRO ---
    estaRegistrado: function(){
		var usr = window.localStorage.getItem("user");
		if(usr == undefined || usr ==''){			
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
        // -- SE OBTIENE VALORES DE CAMPOS --
        
        // -- COMPROBAMOS SI LOS CAMPOS NO ESTAN VACIOS --
        if(nom != '' && mail != '' && tel != '' && foto != undefined)
           $.ajax({
			  method: "POST",
			  url: "http://carlos.igitsoft.com/apps/test.php",
			  data: { nom: nom, mail: mail, tel: tel }
			}).done(function( msg ) {
				if(msg == 1){
					ft.transfer(foto);
				}
			});
        else
            alert('Todos Los Campos Son Requeridos');        
        // -- COMPROBAMOS SI LOS CAMPOS NO ESTAN VACIOS --
    }
    
    // --- FUNCIONES DE REGISTRO ---
};    
$(fn.ready);