const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
let carrito = [];
let prodToAdd = JSON.parse(localStorage.getItem("addToCart"));
    

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

function mostrarDataCompra(arr) {
	let HtmlDataCompra = "";

	for(let i = 0; i<arr.length; i++) {
	precioUnidad = arr[i].unitCost;

	HtmlDataCompra = `
		<tr>
    	  <th scope="row"><img style="width: 5rem;" src="${arr[i].image}" alt="${arr[i].name}"></th>
    	  <td>${arr[i].name}</td>
    	  <td>${arr[i].currency}  ${precioUnidad}</td>
    	  <td><input type="number" value=${arr[i].count} id="cantidad" min=1 onchange="subtotal()"></td>
    	  <td id="subtotal">${arr[i].currency}  ${precioUnidad}</td>
    	</tr>`}

	console.log(arr);
	
	document.querySelector('tbody').innerHTML += HtmlDataCompra;
}


function desconectarse(){
    localStorage.clear();
   // window.location.href = "login.html";
}

function validarUsuario() {
  if(localStorage.getItem('usuario') == undefined || localStorage.getItem('usuario') == null || /^\s+$/.test(localStorage.getItem('usuario')) ){
    alert('Debe logearse correctamente');
    window.location.href = "index.html";
  }
}

document.querySelector('body').addEventListener('onload', ()=>{
  validarUsuario()
  alert("Funcion validarUsuario fue ejecutada")
});

document.querySelector('#perfil').addEventListener('click', ()=>{
  window.location.href="./my-profile.html";
})

document.querySelector('#carrito').addEventListener('click', ()=>{
  window.location.href="./cart.html";
})

document.querySelector('#salir').addEventListener('click', ()=>{
  desconectarse();
  window.location.href="./index.html";
})



document.querySelector("#showUser").innerHTML = nombre;