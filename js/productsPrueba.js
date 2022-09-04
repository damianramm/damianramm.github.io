let URLdinamica = PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE;
let currentProductsArray = [];
let ORDER_ASC_BY_PRICE = "$->$$"
let ORDER_DES_BY_PRICE = "$$->$"
let ORDER_BY_SOLD_COUNT = "ZA"
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let filtroArray = [];

/*******************************************/
//Funcion que ordena los productos por precio 
/*******************************************/

function sortAndShowProducts(criterio, array){
    if (criterio===ORDER_ASC_BY_PRICE){
        filtroArray = array.sort((a,b)=>{return a.cost - b.cost})
    }
    if (criterio===ORDER_DES_BY_PRICE){
        filtroArray = array.sort((a,b)=>{return b.cost - a.cost})
    }
    document.getElementById('products-container').innerHTML = "";
    showProductsList(filtroArray)
}


document.addEventListener("DOMContentLoaded", function(e){
    fetch(URLdinamica)
    .then(res => res.json())
    .then (data =>{
        filtroArray = data.products
        showProductsList(filtroArray)
    })

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE, filtroArray);
    });

    document.getElementById('sortDesc').addEventListener("click", function(){
        sortAndShowProducts(ORDER_DES_BY_PRICE, filtroArray)
    });

    document.getElementById('sortByCount').addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_SOLD_COUNT, filtroArray)
    });

})




/*******************************************/ 
//Funcion que llama al H2 de la categoria
/******************************************/

function cargarTitulo() {
    fetch(CATEGORIES_URL)
    .then(re=> re.json())
    .then(data =>{
        let nData= localStorage.getItem("catID");
        let categorias = data; 
        let htmlTitleProduct=
        `
        <h2>Veras aqui todos los ` +categorias[nData-101].name+ `</h2>
        `

        document.getElementById("subtitulo").innerHTML= htmlTitleProduct
    })
    
}
cargarTitulo()




/********************************************************/ 
//Funcion que define como se van a mostrar los elementos
/********************************************************/    
function showProductsList(){
    
    
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.products.length; i++){
        let products = currentProductsArray.products[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))){

            htmlContentToAppend += `
            <div onclick="setCatID(${products.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name} -${products.currency} ${products.cost}</h4>
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
}


/*******************************************/ 
//FUNCION PARA TRAER CADA LISTA DE PRODUCTOS
/*******************************************/ 
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URLdinamica).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data
            showProductsList()
            
        }
    });
});


/**********************************************/
//Funcion que filtra los productos
/**********************************************/

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showProductsList();
});



document.getElementById("rangeFilterCount").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }

    showProductsList();
});
