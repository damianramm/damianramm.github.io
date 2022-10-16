const URL = CART_INFO_URL + "25801" + EXT_TYPE;
//https://japceibal.github.io/emercado-api/user_cart/25801.json

let dataCompra   = {}
let precioUnidad = 0;

function mostrarDataCompra(arr){
	let HtmlDataCompra = "";
	
	      precioUnidad =  arr.articles[0].unitCost;	
		  

	    HtmlDataCompra = `
		<tr>
    	  <th scope="row"><img style="width: 5rem;" src="${arr.articles[0].image}" alt="${arr.articles[0].name}"></th>
    	  <td>${arr.articles[0].name}</td>
    	  <td>${arr.articles[0].currency}  ${precioUnidad}</td>
    	  <td><input type="number" value=${arr.articles[0].count} id="cantidad" min=1 onchange="subtotal()"></td>
    	  <td id="subtotal">${arr.articles[0].currency}  ${precioUnidad}</td>
    	</tr>` 
    

    	document.querySelector('tbody').innerHTML += HtmlDataCompra; 
}

function mostrarControles(){
	let formHTML = "";

	formHTML = `
	<form class="m-5">
		<div class="mx-5">
			<h3>Tipo de envio</h3>
			<label><input type="radio" name="envio"> Premium, 2 a 5 días(15%)</label></br>
			<label><input type="radio" name="envio"> Express, 5 a 6 días(7%)</label></br>
			<label><input type="radio" name="envio"> Standard, 12 a 15 días(5%)</label>
		</div>
		</br>
		<div class="mx-5">
			<h3>Dirección de envio</h3>
			<label for="calle" >Calle   </label><br>
			<input class="m-1" id="calle" type="text"><br>
			<label for="esquina" >Esquina</label></br>
			<input class="m-1" id="esquina" type="text"></br>
			<label for="numero">Número  </label></br>
			<input class="m-1" id="numero" type="number"></br>
		</div>
		<button class="btn btn-secondary btn-lg">Finalizar compra</button>
	</form>
	`

	document.getElementById('container').innerHTML = formHTML;
}

function subtotal(){
	
	document.querySelector('#subtotal').innerHTML = dataCompra.articles[0].currency + " " + document.querySelector('#cantidad').value * precioUnidad;

};



document.addEventListener("DOMContentLoaded",  function(e){
    getJSONData(URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            dataCompra = resultObj.data

            mostrarDataCompra(dataCompra)
            mostrarControles()
        }
    });

});


