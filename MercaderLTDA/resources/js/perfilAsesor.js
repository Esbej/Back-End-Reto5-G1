const urlbase = 'http://140.238.136.66:8080';

$(document).ready(()=>{
    cargarPerfil();
    console.log( "Estas en el perfil ASESOR" );
    init();
})
function init()
{
    var d_user = JSON.parse(sessionStorage.getItem('miUser'));
    console.log("Nombre usuario "+d_user.name);
    $(".miNombreUsuario").html("WELCOME BACK "+d_user.name);
}

let perfilGlobal;

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

async function addOrder() {
    const products = new Map();
    const quantity = new Map()
  
    try {
      const url = urlbase+'/api/gadget/all'
      // console.log(url)
      const response = await fetch(url);
      const responseJson = await response.json();
  
      for (let index = 0; index < responseJson.length; index++) {
        if (responseJson[index].quantity > 0 && responseJson[index].availability == true) {
          cantidad = document.getElementById(responseJson[index].id).value
          if (cantidad != '0') {
            products.set(responseJson[index].id, responseJson[index]);
            quantity.set(responseJson[index].id, cantidad)
          }
        }
      }
  
  //autoincremento
      const urlOrder = urlbase+'/api/order/all'
      // console.log(url)
      const responseOrder = await fetch(urlOrder);
      const responseJsonOrder = await responseOrder.json();
      id = responseJsonOrder.length + 1
  // fin autoincremento
  
      const urlSave = urlbase+'/api/order/new'
  
      let hoy = new Date()
  
      const fetchOptions = {
        method: "POST",
        body: JSON.stringify({
          id: id,
          registerDay: hoy,
          status: 'Pending',
          salesMan: JSON.parse(sessionStorage.getItem('miUser')),
          products: Object.fromEntries(products),
          quantities: Object.fromEntries(quantity),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const responseUpdate = await fetch(urlSave, fetchOptions);
      const responseConvertedUpdate = await responseUpdate.json();
      // debugger
      alert('CONFIRMATION CODE : ' + responseConvertedUpdate.id)
  
  
      window.location.href = "perfilAsesor.html"
    } catch (error) {
      console.log("error:", error)
    }
  }
  
  
  async function autoInicioProducts() {
  
    try {
      const url = urlbase+'/api/gadget/all'
      // console.log(url)
      const response = await fetch(url);
      const responseJson = await response.json();
  
      drawProducts(responseJson)
  
    } catch (error) {
      console.log("error:", error)
    }
  }
  
  function drawProducts(respuesta) {
    // debugger
    $("#resultProductsOrden").empty();
  
    let myTable = `
  <table class='table table-sm table-responsive' style="height: auto; width: auto">
      <thead>
          <th style='width: auto; background-color: #637007; color: white; ' scope='col'
              align='center'>
              <center>REFERENCE</center>
          </th>
  
          <th style='width: auto; background-color: #637007; color: white;' scope='col'
              align='center'>
              <center>CATEGORY</center>
          </th>
  
          <th style='width: 30%; background-color: #637007; color: white; line-height: 100%'
              scope='col' align='center'>
              <center> DESCRIPTION</center>
          </th>
  
          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
              scope='col' align='center'>
              <center> PRICE</center>
          </th>
  
          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
          scope='col' align='center'>
              <center> PHOTOGRAPHY</center>
          </th>
  
          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
          scope='col' align='center'>
              <center> STOCK</center>
          </th>
  
          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
          scope='col' align='center'>
              <center> QUANTITY</center>
          </th>
  
          <th style='width: auto; background-color: #637007; color: white; line-height: 100%'
          scope='col' align='center'>
              <center> UNDO</center>
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
        if (respuesta[i].quantity > 0 && respuesta[i].availability == true) {
  
          myTable += "<td align='center'>" + respuesta[i].id + "</td>";
          myTable += "<td align='center'>" + respuesta[i].category + "</td>";
          myTable += "<td align='center'>" + respuesta[i].description + "</td>";
          myTable += "<td align='center'>" + respuesta[i].price + "</td>";
          myTable += "<td align='center'>" + respuesta[i].photography + "</td>";
          myTable += "<td align='center'>" + respuesta[i].quantity + "</td>";
  
          // myTable += "<td align='center'>" + respuesta[i].quantity + "</td>";
  
          sessionStorage.setItem('id', respuesta[i].id)
  
  
  
  
          myTable += "<td align='center'>  <input type='number' class='form-control  products' id='" + respuesta[i].id + "' value = 0 ></td>";
  
          myTable += "<td align='center'><button class='btn btn-outline-danger' onclick='cleanProduct(" + respuesta[i].price + ",\"" + respuesta[i].id + "\")'> <img src='https://img.icons8.com/wired/64/000000/filled-trash.png' width='20' height='20'/>UNDO</button></td>";
  
  
  
          myTable += "</tr></tbody>";
  
          myTable += "</tr>";
        }
      }
    }
    myTable += "</table>";
    $("#resultProductsOrden").append(myTable);
  }
  
  
  function cleanProduct(price, id) {
    document.getElementById(id).value = 0;
  
  }