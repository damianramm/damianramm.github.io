const URL = CART_INFO_URL + "25801" + EXT_TYPE;
//https://japceibal.github.io/emercado-api/user_cart/25801.json
let radiosCosto = document.getElementsByName('envio');
let mensajeModal = document.querySelector("small");
let metodoPago = document.getElementsByName("formaPago");
let alertaModal = document.querySelector('#alertaModal');
let alertaCompra = document.querySelector('#alert-success');
let precioUnidad = 0;

function mostrarDataCompra(arr) {
	let HtmlDataCompra = "";

	for(let i = 0; i<arr.length; i++) {
	precioUnidad = arr[i].unitCost;

	HtmlDataCompra = `
		<tr>
    	  <th scope="row"><img style="width: 5rem;" src="${arr[i].image}" alt="${arr[i].name}"></th>
    	  <td>${arr[i].name}</td>
    	  <td>${arr[i].currency}  ${precioUnidad}</td>
    	  <td><input type="number" value=${arr[i].count} id="cantidad" class="form-control" min=1 onchange="subtotal()"></td>
    	  <td id="subtotal">${arr[i].currency}  ${precioUnidad}</td>
    	</tr>`}

	console.log(arr);
	
	document.querySelector('tbody').innerHTML += HtmlDataCompra;
}

function calcCostoEnvioYTotal(){
	
	if( radiosCosto[0].checked){
		costo.innerHTML = `USD ${Math.round((precioUnidad*document.querySelector('#cantidad').value)*0.15)}`
		total.innerHTML = `USD ${Math.round((precioUnidad*document.querySelector('#cantidad').value)*0.15)+ (document.querySelector('#cantidad').value * precioUnidad)}`
	}else if( radiosCosto[1].checked){
		costo.innerHTML = `USD ${Math.round((precioUnidad*document.querySelector('#cantidad').value)*0.07)}`
		total.innerHTML = `USD ${Math.round((precioUnidad*document.querySelector('#cantidad').value)*0.07)+ (document.querySelector('#cantidad').value * precioUnidad)}`
	} else if( radiosCosto[2]){
		costo.innerHTML = `USD ${Math.round((precioUnidad*document.querySelector('#cantidad').value)*0.05)}`
		total.innerHTML = `USD ${Math.round((precioUnidad*document.querySelector('#cantidad').value)*0.05) + (document.querySelector('#cantidad').value * precioUnidad)}`
	}
	
	

}
//DUDA CONSULTA
/* function showAlertaCompra(){
	alertaCompra.classList.add('show');
} */

function showAlertaModal(){
	if(mensajeModal.innerHTML == 'No ha seleccionado'){
		alertaModal.classList.replace("d-none","text-danger");
	} else {
		alertaModal.classList.replace("text-danger","d-none");
	}
}

function subtotal() {

	document.querySelector('#subtotal').innerHTML = `USD ${document.querySelector('#cantidad').value * precioUnidad}`
	document.querySelector('#subtotalLista').innerHTML = `USD ${document.querySelector('#cantidad').value * precioUnidad}`
	calcCostoEnvioYTotal();
};

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
	'use strict'
  
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	var forms = document.querySelectorAll('.needs-validation')
  
	// Loop over them and prevent submission
	Array.prototype.slice.call(forms)
	  .forEach(function (form) {
		form.addEventListener('submit', function (event) {
		  if (!form.checkValidity()) {
			event.preventDefault()
			event.stopPropagation()
		  } else {
			alert("La operacion fue concretada EXITOSAMENTE!")
		}
		  showAlertaModal()
		  form.classList.add('was-validated')
		  
	  }, false)
	  })
  })()

function formaPagoModal(){
	if (credito.checked){
		cuenta.setAttribute("disabled","")
		nroTarjeta.removeAttribute("disabled")
		seguridad.removeAttribute("disabled")
		vence.removeAttribute("disabled")
		mensajeModal.innerHTML = "Tarjeta de credito"
	} else if(transfer.checked) {
		nroTarjeta.setAttribute("disabled","")
		seguridad.setAttribute("disabled","")
		vence.setAttribute("disabled","")
		cuenta.removeAttribute("disabled")
		mensajeModal.innerHTML = "Transferencia bancaria"
	}
}


document.addEventListener("DOMContentLoaded", function (e) {
	getJSONData(URL).then(function (resultObj) {
		if (resultObj.status === "ok") {
			//dataCompra = resultObj.data
			cartArticles = resultObj.data.articles;
			
			mostrarDataCompra(cartArticles)
			subtotal()
			/*for( let i = 0; i<addToCart.length; i++){
				mostrarDataCompra(addToCart[i])

			}           
			console.log(addToCart);
			
		*/
		}
	});

});


/* 
            cartArticles = resultObj.data.articles;
            if (localStorage.getItem("addToCart")) {
                for (let prodToAdd of JSON.parse(localStorage.getItem("addToCart"))) {
                    if (cartArticles.map(item => item.id).indexOf(prodToAdd.id) < 0) {
                        cartArticles.push({
                            id: prodToAdd.id,
                            name: prodToAdd.name,
                            count: 1,
                            unitCost: prodToAdd.cost,
                            currency: prodToAdd.currency,
                            image: prodToAdd.images[0]
                        })
                    }
                }
            }
			
		*/