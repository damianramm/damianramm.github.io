const URL = CART_INFO_URL + "25801" + EXT_TYPE;
//https://japceibal.github.io/emercado-api/user_cart/25801.json


let precioUnidad = 0;

/* function mostrarDataCompra(arr) {
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
 */
function subtotal() {

	document.querySelector('#subtotal').innerHTML = cartArticles[0].currency + " " + document.querySelector('#cantidad').value * precioUnidad;

};



document.addEventListener("DOMContentLoaded", function (e) {
	getJSONData(URL).then(function (resultObj) {
		if (resultObj.status === "ok") {
			//dataCompra = resultObj.data
			cartArticles = resultObj.data.articles;
			
			mostrarDataCompra(cartArticles)
			
			for( let i = 0; i<addToCart.length; i++){
				mostrarDataCompra(addToCart[i])

			}
           
			console.log(addToCart);
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