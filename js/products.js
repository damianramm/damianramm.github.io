const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_SOLD_COUNT = "Relevancia";
const URLdinamica = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;


/**********************************************/
//Funcion para cargar el subtitulo
/**********************************************/

function cargarSubtitulo() {
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
cargarSubtitulo()



/**********************************************/
//Funcion para ordenar productos
/**********************************************/

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

/**********************************************/
//FUNCION PARA TRAER CADA LISTA DE PRODUCTOS
/**********************************************/
    
 function showProductsList(){
    
    
    let htmlContentToAppend = "";
    for(let product of currentProductsArray){
    
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

            htmlContentToAppend += `
            <div onclick="setCatID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} -${product.currency} ${product.cost}</h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("products-container").innerHTML = htmlContentToAppend;
    }
}

/**********************************************/
//Selecciona criterio a utilizar
/**********************************************/

    function sortAndShowProducts(sortCriteria, productsArray){
        currentSortCriteria = sortCriteria;
    
        if(productsArray != undefined){
            currentProductsArray = productsArray;
        }
    
        currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    
        //Muestro los productos ordenados
        showProductsList();
    }

/**********************************************/
//Funcion para llamar URL dinamica al cargar
/**********************************************/

    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(URLdinamica).then(function(resultObj){
            if (resultObj.status === "ok"){
                products = resultObj.data.products
                sortAndShowProducts(ORDER_BY_SOLD_COUNT, products )

            }
        });
    });


    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

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

    /**********************************************/
    //  DESAFIATE! Buscador
    /**********************************************/
    //referenciamos a los elementos del DOM
    const inputBuscar = document.getElementById("buscador")
    const contenedor = document.getElementsByClassName("list-group-item")


//traemos los datos desde una API

fetch(URLdinamica)
    .then( response => response.json() )
    .then( json => mostrarDatos(json) )
    .catch( e => console.log(e) )

const mostrarDatos = (data) => {
    //console.log(data)
    
    for(let i=0; i<data.length; i++){
        htmlContentToAppend += `
        <div onclick="setCatID(${data[i].id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${data[i].image}" alt="${data[i].description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${data[i].name} -${data[i].currency} ${data[i].cost}</h4>
                        <small class="text-muted">${data[i].soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${data[i].description}</p>
                </div>
            </div>
        </div>
        `
    }
}    

//Búsqueda

inputBuscar.addEventListener('keyup', (e)=>{
    let texto = e.target.value
    //console.log(texto)
    let er = new RegExp(texto, "i")
    for(let i=0; i<contenedor.length; i++) {
        let valor = contenedor[i]
        //console.log(valor)
        if(er.test(valor.innerText)){
            valor.classList.remove("ocultar")
        }else{
            console.log(valor)
            valor.classList.add("ocultar")
        }
    }
})

//muestra usuario en el nav
document.querySelector("li>p").innerHTML = localStorage.getItem("usuario");