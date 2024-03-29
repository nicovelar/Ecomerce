const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


var cambiarpagina = new Audio("sounds/sounds_default_tabSwitch.wav")

$(".pagina").mouseenter(function() {
  cambiarpagina.load();
  cambiarpagina.play();
});

var audio2 = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/clickUp.mp3')

$(".click").mousedown(function() {
  audio2.load();
  audio2.play();
});


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
  });
  desconectar();
}

function onLoad() {
  gapi.load('auth2', function() {
    gapi.auth2.init();
  });
}

function mostrarUsuario() {
  var usuario = JSON.parse(localStorage.getItem("usuario"));
  document.getElementById("user").innerHTML = `

  <div class="dropdown">
  <img style="position:relative; height:45px; class="py-2 d-none d-md-inline-block" src="${usuario.imagen}">
  <button class="btn btn-secondary dropdown-toggle pagina click" type="button" data-toggle="dropdown">${usuario.nombre}
  <span class="caret"></span></button>
  <ul class="dropdown-menu">
    <li><a style="margin-left: 25px;" href="my-profile.html">Mi perfil</a></li>
    <li><button class="py-2 d-none d-md-inline-block btn btn-outline-danger pagina click" onclick="signOut();">Desconectar</button>
  </ul>
</div>

`
 
if (usuario.imagen === undefined) {
  document.getElementById("user").innerHTML = `
  
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle pagina click" type="button" data-toggle="dropdown">${usuario.nombre}
  <span class="caret"></span></button>
  <ul class="dropdown-menu">
    <li><a style="margin-left: 25px;" href="my-profile.html">Mi perfil</a></li>
    <li><button class="py-2 d-none d-md-inline-block btn btn-outline-danger pagina click" onclick="signOut();">Desconectar</button>
  </ul>
</div>
`
}
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){ mostrarUsuario()
});