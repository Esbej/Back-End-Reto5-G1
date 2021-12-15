const urlbase = 'http://140.238.136.66:8080';

$(document).ready(()=>{
    cargarPerfil();
    console.log( "Estas en el perfil COORDINADOR" );
    init();
})
function init()
{
    var d_user = JSON.parse(sessionStorage.getItem('miUser'));
    console.log("Nombre usuario "+d_user.name);
    $(".miNombreUsuario").html("WELCOME BACK "+d_user.name);
}

const cargarPerfil = () => {
    const user = JSON.parse(sessionStorage.getItem("miUser"));
    perfilGlobal = user;
    console.log(user);

    const perfil = user.type === 'ASE' ? 'Asesor Comercial' :
        user.type === 'COORD' ? 'Coordinador de Zona' : 'Administrador';

    const tabla = `
        <table class="table">
            <tr>
                <th>identification</th>
                <th>name</th>
                <th>email</th>
                <th>perfil</th>
                <th>zone</th>
            </tr>
            <body>
                <tr>
                    <td>${user.identification}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${perfil}</td>
                    <td>${user.zone}</td>
                </tr>
            </body>
        </table>
    `;

    $("#perfil").html(tabla);

}
$(document).ready(() => {
    cargarPerfil();
})

function pintarRespuesta(respuesta) {
    // debugger
    $("#ListOrders").empty();
  
    let myTable = `
  <table class='table table-sm table-responsive' style="height: auto; width: auto">
      <thead>
          <th style='width: auto; background-color: #637007; color: white; ' scope='col'
              align='center'>
              <center>IDENTIFICATION</center>
          </th>
  
          <th style='width: auto; background-color: #637007; color: white;' scope='col'
              align='center'>
              <center>NAME</center>
          </th>
  
          <th style='width: 30%; background-color: #637007; color: white; line-height: 100%'
              scope='col' align='center'>
              <center> E-MAIL</center>
          </th>
  
          <th style='width: 30%; background-color: #637007; color: white; line-height: 100%'
              scope='col' align='center'>
              <center> DATE</center>
          </th>
  
          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
          scope='col' align='center'>
              <center> No. ORDER</center>
          </th>
  
          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
          scope='col' align='center'>
              <center> STATUS</center>
          </th>
  
        
          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
          scope='col' align='center'>
              <center> VIEW</center>
          </th>
         
      </thead>
  `;
  
    if (respuesta.length < 1) {
      myTable += "<td scope='row'>" + "THERE ARE NOT PRODUCTS" + "</td>";
      myTable += "</tr>";
    }
    else {
      // debugger
      for (i = 0; i < respuesta.length; i++) {
  
        myTable += "<td align='center'>" + respuesta[i].salesMan.identification + "</td>";
        myTable += "<td align='center'>" + respuesta[i].salesMan.name + "</td>";
        myTable += "<td align='center'>" + respuesta[i].salesMan.email + "</td>";
        myTable += "<td align='center'>" + respuesta[i].registerDay + "</td>";
        myTable += "<td align='center'>" + respuesta[i].id + "</td>";
        myTable += "<td align='center'>" + respuesta[i].status + "</td>";
  
  
        myTable += "<td align='center'><button class='btn btn-outline-success nc-icon nc-alert-circle-i' onclick='consultOrder(" + respuesta[i].id + ")'> </td>";
  
  
  
        myTable += "</tr></tbody>";
  
        myTable += "</tr>";
  
      }
    }
    myTable += "</table>";
    $("#ListOrders").append(myTable);
  }
  
  
  function pintarDetalle(respuesta) {
    // debugger
    $("#ListOrders").empty();
  
      // debugger
      let myTable =`
      <center><h4>Orders</h4></center> <br>`;
  
     myTable += `
  <table class='table table-sm table-responsive' style="height: auto; width: auto">
      <thead>
          <th style='width: 10%; background-color: #637007; color: white; ' scope='col'
              align='center'>
              <center>DATE</center>
          </th>
  
          <th style='width: 10%; background-color: #637007; color: white;' scope='col'
              align='center'>
              <center>No. ORDER</center>
          </th>
  
          <th style='width: 10%; background-color: #637007; color: white; line-height: 100%'
              scope='col' align='center'>
              <center> STATUS</center>
          </th>
  
          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
              scope='col' align='center'>
              <center> CHANGE STATUS</center>
          </th>
  
          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
          scope='col' align='center'>
              <center> SAVE</center>
          </th>
         
      </thead>
  `;
  
        myTable += "<td align='center'>" + respuesta.registerDay + "</td>";
        myTable += "<td align='center'>" + respuesta.id + "</td>";
        myTable += "<td align='center'>" + respuesta.status + "</td>";
        myTable += `
        <td align='center'>
          <select class="form-control" name="status" id="status"  >
            <option value="Aproved">
              Aproved
            </option>
            <option value="Rejected">
              Rejected
            </option>
          </select>      
        </td>`;
  
        myTable += "<td align='center'><button class='btn btn-outline-info nc-icon nc-bag-16' onclick='updateOrder(" + respuesta.id + ")'> </button></td>";
  
        myTable += "</tr></tbody>";
        myTable += "</tr>";
    myTable += "</table>";
    $("#ListOrders").append(myTable);
  
    pintarDetalleOrden(respuesta)
  }
  
  
  function pintarDetalleOrden(respuesta) {
    // debugger
    let myTable =`<br><br>
    <h4>Prodcuts Asoc No.`
  
    myTable +=respuesta.id + 
    `</h4>`;
    
    
  
   myTable += `
  <table class='table table-sm table-responsive' style="height: auto; width: auto">
      <thead>
          <th style='width: auto; background-color: #637007; color: white; ' scope='col'
              align='center'>
              <center>PHOTOGRAPHY</center>
          </th>
  
          <th style='width: auto; background-color: #637007; color: white;' scope='col'
              align='center'>
              <center>NAME</center>
          </th>
  
          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
              scope='col' align='center'>
              <center>CATEGORY</center>
          </th>
  
          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
              scope='col' align='center'>
              <center>DESCRIPTION</center>
          </th>
  
          
          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
              scope='col' align='center'>
              <center>PRICE</center>
          </th>
  
          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
          scope='col' align='center'>
          <center>QUANTITY</center>
          </th>
  
          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
              scope='col' align='center'>
              <center>STOCK</center>
          </th>
          
      </thead>
  `;
  
    if (respuesta.products.length < 1) {
      myTable += "<td scope='row'>" + "THERE ARE NOT PRODUCTS" + "</td>";
      myTable += "</tr>";
    }
    else {
      // debugger
      
      for (i = 0; i <  Object.values(respuesta.products).length; i++) {
  debugger
        myTable += "<td align='center'>" + Object.values(respuesta.products)[i].photography+ "</td>";
        myTable += "<td align='center'>" + Object.values(respuesta.products)[i].name + "</td>";
        myTable += "<td align='center'>" + Object.values(respuesta.products)[i].category + "</td>";
        myTable += "<td align='center'>" + Object.values(respuesta.products)[i].description + "</td>";
        myTable += "<td align='center'>" + Object.values(respuesta.products)[i].price + "</td>";
        myTable += "<td align='center'>" + Object.values(respuesta.products)[i].quantity + "</td>";
        myTable += "<td align='center'>" + Object.values(respuesta.products)[i].quantity + "</td>";     
  
  
        myTable += "</tr></tbody>";
  
        myTable += "</tr>";
  
      }
    }
    myTable += "</table>";
    $("#ListOrders").append(myTable);
  }
  
  
  async function autoInicioOrdenes() {
    var d_zona = JSON.parse(sessionStorage.getItem('miUser'));
    try {
      const url = urlbase+'/api/order/zona/' + d_zona.zone;
  
      const response = await fetch(url);
      const responseJson = await response.json();
      pintarRespuesta(responseJson);
      // debugger
  
    } catch (error) {
      console.log("error:", error)
    }
  }
  
  
  async function consultOrder(id) {
    $("#ListOrders").empty();
    debugger
  
    try {
  
      // debugger
      const url = urlbase+'/api/order/' + id
      // console.log(url)
      const response = await fetch(url);
      const json = await response.json();
  
      pintarDetalle(json)
    } catch (error) {
      console.log("error:", error)
    }
  
  }
  
  
  
  async function updateOrder(id) {
    
      try {
        const urlUpdate = urlbase+'/api/order/update'
  
        const fetchOptions = {
          method: "PUT",
          body: JSON.stringify({
            id: id,
            status: $("#status").val()
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
        const responseUpdate = await fetch(urlUpdate, fetchOptions);
        const responseConvertedUpdate = await responseUpdate.json();
        window.location.href = "perfilCoor.html";
  
        alert("Update successuful");
  
      } catch {
        window.location.reload()
        alert("No saved correctly, try again");
      }
  
   
  }
  
  
  