const urlbase = 'http://140.238.136.66:8080/api/user'
var recuperarJson;
var miIndice;
$( document ).ready(function() {
    console.log( "Estas en el perfil ADMIN" );
    init();
});
function init()
{
    var d_user = JSON.parse(sessionStorage.getItem('miUser'));
    console.log("Nombre usuario "+d_user.name);
    $(".miNombreUsuario").html("WELCOME BACK "+d_user.name);
    traerInformacion();
}
function traerInformacion(){

    urlString = urlbase+"/all";
    $.ajax({
        method: "GET",
        url: urlString
    })
    .done(
        function(respuesta)
        {
            //alert("Datos"+respuesta);
            recuperarJson = respuesta;
            $('#tablaUsuarios').dataTable( {
                responsive: true,
                data : respuesta,
                columns: [
                    {"data": "identification"},
                    {"data": "name"},
                    {"data": "address"},
                    {"data": "cellPhone"},
                    {"data": "email"},
                    {"data": "password"},
                    {"data": "zone"},
                    {"data": "type"},
                    {"defaultContent": "<div class='text-center'><div class='btn-group'><button type='button' class='btn btn-primary btnEditarAbrir'>Edit</button><button type='button' class='btn btn-danger btn_borrar'>Delete</button></div></div>"}
                ],
            });
        }
    )
    .fail(
        function()
        {
            //alert("Error servidor");
        }
    )
    .always(
        function()
        {
            //alert("siempre ejecutandose")
        }
    )
    ;
}
/////Agregar usuario
function agregarUsuario(_id)
{
    console.log("Mi boton Registro Funciona");
    ///Variables
    var banderaRegistro = 0;
    ////Recoger los valores de los inputs
    var id = _id;
    var identification = $.trim($("#identificacion").val());
    var name = $.trim($("#nombre").val());
    var address = $.trim($("#direccion").val());
    var cellPhone = $.trim($("#celular").val());
    var email = $.trim($("#mail").val());
    var password = $.trim($("#pwd").val());
    var password_r= $.trim($("#pwr_r").val());
    var zone = $.trim($("#zona").val());
    var type = $.trim($("#type").val());
    ////
    console.log("id = "+id);
    console.log("identification = "+identification);
    console.log("name = "+name);
    console.log("address = "+address);
    console.log("cellPhone = "+cellPhone);
    console.log("email = "+email);
    console.log("password = "+password);
    console.log("password_r = "+password_r);
    console.log("zone = "+zone);
    console.log("type = "+type);

    ////validaci??n
    var miContador = $('.miFormRegistro input').length;
    console.log("contadorRegistro = "+miContador);

    $('.miFormRegistro input').each(function (index){
        if($(this).val() == "")
        {
            $(this).focus();
            $('.alertaRegistro').html("This field "+$(this).attr("name")+" should not be empty");
            return false;
        }
        banderaRegistro = banderaRegistro + 1;
    });
    ////Fin validaci??n
    if(banderaRegistro == miContador)
    {
        if(password != password_r)
        {
            $('.alertaRegistro').html("Passwords must match");
        }
        else
        {
            let myData = {
                id:id,
                identification:identification,
                name:name,
                address:address,
                cellPhone:cellPhone,
                email:email,
                password:password,
                zone:zone,
                type:type,
                name:name
            }
            let dataToSend=JSON.stringify(myData);
            console.log(dataToSend);
            /////Verificar si usuario Existe
            $.ajax({
                url:urlbase+"/"+email+"/"+password,
                type: "GET",
                datatype:"JSON",
                success:function(respuesta){
                    console.log("Respuesta ="+respuesta.id);
                    var respuestaVariable = respuesta.id;
                    var Bandera = respuestaVariable === null;
                    console.log("validacion "+ Bandera);
                    if(respuesta.id === null)
                    {
                        ///// Se crea usuario
                        $.ajax({
                            type: "POST",
                            contentType: "application/json",
                            url:urlbase+"/new",
                            data: dataToSend,
                            datatype:"json",
                            cache: false,
                            timeout: 600000,
                            success:function(respuesta){
                                location.reload();
                            },
                            error : function(e) {
                                alert("No FUNCIONA");
                            },
                            done : function(e) {
                                alert("No FUNCIONA");
                            }
                        });
                    }
                    else
                    {
                        $("#mail").focus();
                        $('.alertaRegistro').html("User already registered");
                    }
                }
            });

        }
    }

}
/////Funcion capturar ID
function f_llenarUsuarioEditar(correo,pass)
{
    $.ajax({
        url:urlbase+"/"+correo+"/"+pass,
        type: "GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log("ID USUARIO ="+respuesta.id);
            miIndice = respuesta.id;
            //fila = $(this).closest("tr");
            var id = respuesta.id;
            var identification = respuesta.identification;
            var name = respuesta.name;
            var address = respuesta.address;
            var cellPhone = respuesta.cellPhone;
            var email = respuesta.email;
            var password = respuesta.password;
            var zone = respuesta.zone;
            var type = respuesta.type;

            console.log("id_edit = "+id);
            console.log("identification_edit = "+identification);
            console.log("name_edit = "+name);
            console.log("address_edit = "+address);
            console.log("cellPhone_edit = "+cellPhone);
            console.log("email_edit = "+email);
            console.log("password_edit = "+password);
            console.log("zone_edit = "+zone);
            console.log("type_edit = "+type);

            $("#identificacion_e").val(identification);
            $("#nombre_e").val(name);
            $("#direccion_e").val(address);
            $("#celular_e").val(cellPhone);
            $("#mail_e").val(email);
            $("#pwd_e").val(password);
            $("#zona_e").val(zone);
            $("#type_e").val(type);

            var myModal = new bootstrap.Modal(document.getElementById("myModalRegistroEditar"), {});
            myModal.show();
        }
    });
}
function editarInformacion()
{
    ////Recoger los valores de los inputs
    var id = miIndice;
    var identification = $.trim($("#identificacion_e").val());
    var name = $.trim($("#nombre_e").val());
    var address = $.trim($("#direccion_e").val());
    var cellPhone = $.trim($("#celular_e").val());
    var email = $.trim($("#mail_e").val());
    var password = $.trim($("#pwd_e").val());
    var zone = $.trim($("#zona_e").val());
    var type = $.trim($("#type_e").val());
    ////
    let myData = {
        id:id,
        identification:identification,
        name:name,
        address:address,
        cellPhone:cellPhone,
        email:email,
        password:password,
        zone:zone,
        type:type,
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:urlbase+"/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            location.reload();

        }
    });
}
function borrarCategoria(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:urlbase+"/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){

            location.reload();
        }
    });

}

/////Eventos
$(document).on("click", ".btn_agregarUsuario", function(){
    //// Dato para recoger el Id por las filas
    var count_table = ($('#tablaUsuarios').DataTable().data().count())+1;
    agregarUsuario(count_table);
    //alert(table);
});
/////////// EDITAR
/////Recoger datos para el modal
$(document).on("click", ".btnEditarAbrir", function(){

    fila = $(this).closest("tr");
    var email = fila.find('td:eq(4)').text();
    var password = fila.find('td:eq(5)').text();
    f_llenarUsuarioEditar(email,password);

});
/////Editar
$(document).on("click", ".btn_editarUsuario", function(){
    editarInformacion();
});
////BORRAR
$(document).on("click", ".btn_borrar", function(){
    fila = $(this).closest("tr");
    var email = fila.find('td:eq(4)').text();
    var password = fila.find('td:eq(5)').text();
    $.ajax({
        url:urlbase+"/"+email+"/"+password,
        type: "GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log("ID USUARIO ="+respuesta.id);
            miIndice = respuesta.id;
            borrarCategoria(miIndice);
        }
    });
});
