const urlbase = 'http://140.238.136.66:8080/api/user';
$( document ).ready(function() {
    console.log( "Estas en la página Inicio" );
    init();
});
function init()
{
    $(".confirmacionRegistro").hide();
}
function login()
{
    console.log("Mi boton Login Funciona");
    ///Variables
    var banderaLogin = 0;
    var miContador = $('.miFormLogin input').length;
    //var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    ////Recoger los valores de los inputs
    var usuario_login = $.trim($("#usr_login").val());
    var password_login = $.trim($("#pwd_login").val());
    ////
    console.log("usuario_login = "+usuario_login);
    console.log("password_login = "+password_login);
    ///
    ////validación
    console.log("contadorRegistro = "+miContador);

    $('.miFormLogin input').each(function (index){
        if($(this).val() == "")
        {
            $(this).focus();
            $('.alertaLogin').html("El campo "+$(this).attr("name")+" no puede estar vacío");
            return false;
        }
        banderaLogin = banderaLogin + 1;
        //alert("No estan vacios" + banderaRegistro);
    });
    ////Fin validación
    if(banderaLogin == miContador)
    {
        $.ajax({
            url:urlbase+"/"+usuario_login+"/"+password_login,
            type: "GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                console.log("id "+respuesta.id);
                if(respuesta.id === null)
                {
                    $("#usr_login").focus();
                    $(".alertaLogin").html("Usuario o contraseña INCORRECTOS");
                }
                else
                {
                    console.log("ENTRO");
                    validarPerfiles(respuesta.type);
                    const objetocomotexto = JSON.stringify(respuesta);
                    sessionStorage.setItem('miUser', objetocomotexto);
                }
            }
        });
    }
}
function validarPerfiles(perfil)
{
    switch (perfil) {
        case 'ADM':
          console.log('Perfil Admin');
          window.location.href = "perfilAdmin.html";
          break;
        case 'COORD':
            console.log('Perfil Coordinador');
            window.location.href = "perfilCoor.html";
            break;
        case 'ASE':
            console.log('Perfil Asesor');
            window.location.href = "perfilAsesor.html";
          break;
      }
}
$(document).on("click",".btn_login",function() {
    login();
});