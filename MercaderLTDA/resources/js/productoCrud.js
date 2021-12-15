const urlbase = 'http://140.238.136.66:8080/api/gadget'
var recuperarJson;
var miIndice;
$( document ).ready(function() {
    console.log( "Estas en el CRUD Productos" );
    init();
});
function init()
{
    var d_user = JSON.parse(sessionStorage.getItem('miUser'));
    console.log("Nombre usuario "+d_user.name);
    $(".miNombreUsuario").html("WELCOME BACK "+d_user.name);
    traerInformacion();
}
//Trae los productos almacenados en la Collection MongoDB y los llena en DataTable
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
            $('#tablaProductos').dataTable( {
                responsive: true,
                data : respuesta,
                columns: [
                    {"data": "id"},
                    {"data": "brand"},
                    {"data": "category"},
                    {"data": "name"},
                    {"data": "description"},
                    {"data": "price"},
                    {"data": "availability"},
                    {"data": "quantity"},
                    {"data": "photography"},
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
function agregarUsuario()
{
    console.log("Mi boton Registro Funciona");
    ///Variables
    var boolean = 0;
    var banderaRegistro = 0;
    ////Recoger los valores de los inputs
    var id = $.trim($("#id").val());
    var brand = $.trim($("#brand").val());
    var category = $.trim($("#category").val());
    var name = $.trim($("#name").val());
    var description = $.trim($("#description").val());
    var price = $.trim($("#price").val());
    var availability = $.trim($("#availability").val());
    var quantity= $.trim($("#quantity").val());
    var photography = $.trim($("#photography").val());
    ////
    console.log("id = "+id);
    console.log("brand = "+brand);
    console.log("category = "+category);
    console.log("name = "+name);
    console.log("description = "+description);
    console.log("price = "+price);
    console.log("availability = "+availability);
    console.log("quantity = "+quantity);
    console.log("photography = "+photography);
    if(availability==="YES"){
        boolean=true;
    }else{
        boolean=false;
    }

    ////validación
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
    ////Fin validación
    if(banderaRegistro == miContador)
    {
            let myData = {
                id:id,
                brand:brand,
                category:category,
                name:name,
                description:description,
                price:price,
                availability:boolean,
                quantity:quantity,
                photography:photography,
            }
            let dataToSend=JSON.stringify(myData);
            console.log(dataToSend);
            //Se crea el producto o Gadget. Debido a que no se es requierido verificar un existencia del mismo se procede BAU
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
    }
    function f_llenarUsuarioEditar(id)
{
    $.ajax({
        url:urlbase+"/"+id,
        type: "GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log("ID USUARIO ="+respuesta.id);
            miIndice = respuesta.id;
            //fila = $(this).closest("tr");
            var id = respuesta.id;
            var brand = respuesta.brand;
            var category = respuesta.category;
            var name = respuesta.name;
            var description = respuesta.description;
            var price = respuesta.price;
            var availability = respuesta.availability;
            var quantity = respuesta.quantity;
            var photography = respuesta.photography;

            console.log("id_edit = "+id);
            console.log("brand_edit = "+brand);
            console.log("category_edit = "+category);
            console.log("name_edit = "+name);
            console.log("description_edit = "+description);
            console.log("price_edit = "+price);
            console.log("availability_edit = "+availability);
            console.log("quantity_edit = "+quantity);
            console.log("photography_edit = "+photography)
            
            $("#id_e").val(id);
            $("#brand_e").val(brand);
            $("#category_e").val(category);
            $("#name_e").val(name);
            $("#description_e").val(description);
            $("#price_e").val(price);
            if(availability===true)
            {
                $("#availability_e").val("YES");
            }else{
                $("#availability_e").val("NO");
            }
            $("#quantity_e").val(quantity);
            $("#photography_e").val(photography);


            var myModal = new bootstrap.Modal(document.getElementById("myModalRegistroEditar"), {});
            myModal.show();
        }
    });
}
function editarInformacion()
{
    ////Recoger los valores de los inputs
    var id = $.trim($("#id_e").val());
    var brand = $.trim($("#brand_e").val());
    var category = $.trim($("#category_e").val());
    var name = $.trim($("#name_e").val());
    var description = $.trim($("#description_e").val());
    var price = $.trim($("#price_e").val());
    var availability = $.trim($("#availability_e").val());
    var quantity = $.trim($("#quantity_e").val());
    var photography = $.trim($("#photography_e").val());
    ////
    let myData = {
        id:id,
        brand:brand,
        category:category,
        name:name,
        description:description,
        price:price,
        availability:availability,
        quantity:quantity,
        photography:photography,
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:urlbase+"/update/all",
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
$(document).on("click", ".btn_agregarProducto", function(){
    agregarUsuario();
    //alert(table);
});
    /////////// EDITAR
/////Recoger datos para el modal
$(document).on("click", ".btnEditarAbrir", function(){

    fila = $(this).closest("tr");
    var id = fila.find('td:eq(0)').text();
    f_llenarUsuarioEditar(id);

});
/////Editar
$(document).on("click", ".btn_editarProducto", function(){
    editarInformacion();
});
////BORRAR
$(document).on("click", ".btn_borrar", function(){
    fila = $(this).closest("tr");
    var id = fila.find('td:eq(0)').text()
            borrarCategoria(id);
});