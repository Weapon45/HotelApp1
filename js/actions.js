var fn = {
    init: function(){
        if(!fn.estaRegistrado())
            window.location.href = '#registro';
        // -- MANDO A LLAMAR EL BOTON QUE ESTA DENTRO DEL DIV ---
        $('#registro div[data-role=footer] a').click(fn.registrar);
        // -- MANDO A LLAMAR EL BOTON QUE ESTA DENTRO DEL DIV ---
            },
    // --- FUNCIONES DE REGISTRO ---
    estaRegistrado: function(){
        return false;
    },
    registrar: function(){
        // -- SE OBTIENE VALORES DE CAMPOS --
        var nom = $('#regNom').val();
        var mail = $('#regMail').val();
        var tel = $('#regTel').val();
        var foto = $('#regFoto').data('foto');
        // -- SE OBTIENE VALORES DE CAMPOS --
        
        // -- COMPROBAMOS SI LOS CAMPOS NO ESTAN VACIOS --
        if(nom != '' && mail != '' && tel != '')
            alert('Sincronizar');
        else
            alert('Todos Los Campos Son Requeridos');        
        // -- COMPROBAMOS SI LOS CAMPOS NO ESTAN VACIOS --
    }
    
    // --- FUNCIONES DE REGISTRO ---
};    
$(fn.init);