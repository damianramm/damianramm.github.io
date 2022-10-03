const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
//Usuario sin mail

let nombre = localStorage.getItem("usuario");
    nombre = nombre.substring(0, nombre.indexOf("@"))

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
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

function desconectarse(){
  localStorage.setItem('USER', 'false');
  localStorage.clear();
}

function validarUsuario() {
  if(localStorage.getItem('USER')){
      if(localStorage.getItem('USER')  == 'false'){
          alert('Debe logearse correctamente')
          window.location.href = "login.html";
   }
  } else {
  window.location.href = "login.html";
  alert('Debe logearse correctamente');
}
}

document.querySelector('#perfil').addEventListener('click', ()=>{
  window.location.href="./my-profile.html";
})

document.querySelector('#carrito').addEventListener('click', ()=>{
  window.location.href="./cart.html";
})

document.querySelector('#salir').addEventListener('click', ()=>{
  desconectarse();
  window.location.href="./login.html";
})

document.addEventListener('DOMContentLoaded', validarUsuario());

document.querySelector("#showUser").innerHTML = nombre;