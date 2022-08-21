
//FUNCION PARA TRAER CADA LISTA DE PRODUCTOS
    

    let currentProductsArray = [];

 function showProductsList(){
    
    
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.products.length; i++){
        let products = currentProductsArray.products[i];

            htmlContentToAppend += `
            <div onclick="setCatID(${products.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name}</h4>
                            <small class="text-muted">${products.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("products-container").innerHTML = htmlContentToAppend;
    }



    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE).then(function(resultObj){
            if (resultObj.status === "ok"){
                currentProductsArray = resultObj.data
                showProductsList()
                
            }
        });
    });
