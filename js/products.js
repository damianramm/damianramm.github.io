//FUNCION PARA TRAER CADA LISTA

const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"

 function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.products.length; i++){
        let category = currentCategoriesArray.products[i];

        /*
        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){
        */

            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name}</h4>
                            <small class="text-muted">${category.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }



    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE).then(function(resultObj){
            if (resultObj.status === "ok"){
                currentCategoriesArray = resultObj.data
                showCategoriesList()
                //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
            }
        });
    });
/*
const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json" 

    fetch(URL)
    .then((resp) => resp.json())
    .then((data) =>{
    //PRIMER AUTO 
        const img1 = document.getElementById("img1");
        let h3 = document.getElementById("h3Primero");
        let p1 = document.getElementById("p1");
        let p2 = document.getElementById("p2");
        let p3 = document.getElementById("p3");
        let p4 = document.getElementById("p4");
        
        img1.src = data.products[0].image;
        h3.innerHTML = data.products[0].name;
        p1.innerHTML = data.products[0].description;
        p2.innerHTML = data.products[0].soldCount + ' restantes';
        h3.innerHTML = h3.innerHTML + ' -' + data.products[0].currency;
        h3.innerHTML = h3.innerHTML + ' ' + data.products[0].cost;
        
    //SEGUNDO AUTO
        const img2 = document.getElementById("img2");
        let h3seg = document.getElementById("h3Segundo");
        let p1seg = document.getElementById("p1seg");
        let p2seg = document.getElementById("p2seg");
        let p3seg = document.getElementById("p3seg");
        let p4seg = document.getElementById("p4seg");
    
        img2.src = data.products[1].image;
        h3seg.innerHTML = data.products[1].name;
        p1seg.innerHTML = data.products[1].description;
        p2seg.innerHTML = data.products[1].soldCount + ' restantes';
        h3seg.innerHTML = h3seg.innerHTML + ' -' + data.products[1].currency;
        h3seg.innerHTML = h3seg.innerHTML + ' ' + data.products[1].cost;
   
    //TERCER AUTO
        const img3 = document.getElementById("img3");
        let h3ter = document.getElementById("h3Tercero");
        let p1ter = document.getElementById("p1ter");
        let p2ter = document.getElementById("p2ter");
        let p3ter = document.getElementById("p3ter");
        let p4ter = document.getElementById("p4ter");

        img3.src = data.products[2].image;
        h3ter.innerHTML = data.products[2].name;
        p1ter.innerHTML = data.products[2].description;
        p2ter.innerHTML = data.products[2].soldCount + ' restantes';
        h3ter.innerHTML = h3ter.innerHTML + ' -' + data.products[2].currency;
        h3ter.innerHTML = h3ter.innerHTML + ' ' + data.products[2].cost;
    
    //CUARTO AUTO    
        const img4 = document.getElementById("img4");
        let h3cua = document.getElementById("h3Cuarto");
        let p1cua = document.getElementById("p1cua");
        let p2cua = document.getElementById("p2cua");
        let p3cua = document.getElementById("p3cua");
        let p4cua = document.getElementById("p4cua");

        img4.src = data.products[3].image;
        h3cua.innerHTML = data.products[3].name;
        p1cua.innerHTML = data.products[3].description;
        p2cua.innerHTML = data.products[3].soldCount + ' restantes';
        h3cua.innerHTML = h3cua.innerHTML + ' -' + data.products[3].currency;
        h3cua.innerHTML = h3cua.innerHTML + ' ' + data.products[3].cost;
        
    //QUINTO AUTO
        const img5 = document.getElementById("img5");
        let h3qui = document.getElementById("h3Quinto");
        let p1qui = document.getElementById("p1qui");
        let p2qui = document.getElementById("p2qui");
        let p3qui = document.getElementById("p3qui");
        let p4qui = document.getElementById("p4qui");

        img5.src = data.products[4].image;
        h3qui.innerHTML = data.products[4].name;
        p1qui.innerHTML = data.products[4].description;
        p2qui.innerHTML = data.products[4].soldCount + ' restantes';
        h3qui.innerHTML = h3qui.innerHTML + ' -' + data.products[4].currency;
        h3qui.innerHTML = h3qui.innerHTML + ' ' + data.products[4].cost;
    


    });
*/