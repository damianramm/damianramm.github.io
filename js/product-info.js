
//URLs y variables
const BOTON_CARRITO         = document.querySelector('#addCart');
const URLdinamicaIndividual = PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE;
const URLdinamicaComentario = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE;

/***********************************/
 //fecha y hora 

var hoy = new Date();
var ahora = hoy.toLocaleString();

/***********************************/
//Puntuacion e ID

let puntuacion = document.querySelector('#puntuacion');
var identificadorComentario = localStorage.getItem('prodID')

/***********************************/  
//

let contenedor = document.getElementById("comentarios");
let item = document.getElementById("texto");
let btnNuevoComent = document.getElementById("agregar");

/***********************************/
function setProductID(id) {
    localStorage.setItem("prodID", id);
    window.location.reload()
  }
/***********************************************/
//Se preparan los datos para exportar al carrito
/***********************************************/


BOTON_CARRITO.addEventListener('click', function() { 
    if (localStorage.getItem("addToCart")) {
                
            carrito.push( prodToAdd)
            console.log(carrito[0])
    }
            
}) ;
            /* for (let prodToAdd of addToCart) {
                    if (cartArticles.map(item => item.id).indexOf(prodToAdd.id) < 0) {
                        
                        cartArticles.push({
                            count: 1,
                            img: prodToAdd.img,
                            id: prodToAdd.id,
                            name: prodToAdd.name,
                            currency: prodToAdd.currency,
                            cost: prodToAdd.cost,
                        })
                        
                }
            }
                
                */
          
/***********************************/
//Estrellas
/***********************************/

function colorearEstrellas(cantidad){
    let starsHTML= "" 

    for(let i=0; i<cantidad; i++){
        starsHTML +=  `<span  class="fa fa-star checked"></span>
        `
    }
    for(let i=cantidad; i<5; i++){
        starsHTML +=  `<span  class="fa fa-star"></span>
        `
    }
    return starsHTML
}

/***********************************/
// Funcion para añadir comentarios
/***********************************/

    // Recibe lo guardado en el LocalStorage
    var guardado = JSON.parse(localStorage.getItem('datos'));
    let arrayComentario = [];

    function agregarComent(comentario){
        for(i=0; i<guardado.length;i++){
            let dato = comentario[i]
                if( dato[4] == identificadorComentario ){
            let nuevoComent = `
    
            <div class="p-3" style="border: 1px solid lightgray">
                <strong> ${dato[2]} </strong>
                <small>Hora:${dato[1]}</small>    
                ${colorearEstrellas(dato[3])}
                <p >Descripcion: ${dato[0]}</p>
                </div>`
            contenedor.innerHTML += nuevoComent      
            }
        }
    }
    
    // Verifica si existen datos y carga los comentarios en caso de que existan
    window.addEventListener('load', function(){ 
    if (guardado != null) {
         agregarComent(guardado);
        }
    
    // En caso de que no existan comentarios crea un Array vacio
    else {
        guardado = [];
        
    }
});
  
/***********************************/ 
//Solicitud Detalles de producto

document.addEventListener("DOMContentLoaded", ()=>{
fetch(URLdinamicaIndividual)
    .then(re=> re.json())
    .then(data =>{
        let producto = data; 
        

        
        //PREPARA los datos del producto a cargar en un localStorage
        let prepararInfo = {}

        prepararInfo = {
            image: producto.images[0],
            id: producto.id,
            name: producto.name,
            currency: producto.currency,
            unitCost: producto.cost,
            /* cant: 1 */
        }
       
        localStorage.setItem('addToCart', JSON.stringify(prepararInfo))
        
        let htmlTitleProduct=
        
        //<div style="display:none;" >${producto.id}</div>
        `<h2 class="d-inline">${producto.name}</h2><hr>
        <p><strong>Descripcion:</strong><br>${producto.description}</p>
        <p><strong>Categoria:</strong><br>${producto.category}</p>
        <p><strong>Precio:</strong><br>${producto.currency} ${producto.cost}</p>
        <p><strong>Cantidad de ventas:</strong><br>${producto.soldCount} vendidos</p>   
        `

     
        document.getElementById("articulo").innerHTML= htmlTitleProduct
 //imagenes       
        
   let imagesToAppend = "" 
   for(let i=0; i<producto.images.length; i++){
            
        imagesToAppend+=`
        <img class="img" src="${producto.images[i]}">   
         `}
         
        document.querySelector('.grande').innerHTML += imagesToAppend
        
//productos relacionados
        let relatedToAppend =""
        let related = producto.relatedProducts;
        for(let i=0; i<related.length; i++){
        relatedToAppend +=`
            <div onclick="setProductID(${related[i].id})" class="card cursor-active" style="width: 20rem;">
                <img src="${related[i].image}" class="card-img-top" alt="${related[i].name}">
                <div class="card-body">
                  <p class="card-text fs-3 text-center">${related[i].name}</p>
                </div>
            </div>`
        }
        document.getElementById('related').innerHTML += relatedToAppend

    //precargarInfo()

    })
//Solicitud de comentarios

    fetch(URLdinamicaComentario)
    .then(re => re.json())
    .then(data => {
        let comentario = data;
        let commentToAppend = ""    
        
    for(let i=0; i<comentario.length; i++){
               commentToAppend+=`
        <div class="p-3" style="border: 1px solid lightgray">
            <strong>${comentario[i].user}</strong>
            <small>Hora:${comentario[i].dateTime}</small>    
            ${colorearEstrellas(comentario[i].score)}
            <p >Descripcion:${comentario[i].description}</p>
        </div>`
                        
         }
        document.getElementById("comentarios").innerHTML+= commentToAppend;
      })

    });

/***********************************/ 
// Carga el comentario al Array
btnNuevoComent.addEventListener("click", function () {
    
    // Verificamos que el comentario no este vacio
    if (item.value != '' ) {
        agregarComent(item.value);
        arrayComentario.push(item.value, ahora, nombre, puntuacion.value, localStorage.getItem('prodID'));
        guardado.push(arrayComentario);
        localStorage.setItem('datos', JSON.stringify(guardado));
        item.value = "";
    }
    // Si es vacía le agregamos el placeholder de invalida
    else {
        item.setAttribute("placeholder", "Agrega un comentario");
        item.className = "error form-control";
    }
});

/******************************/
const grande    = document.querySelector('.grande')
const punto     = document.querySelectorAll('.punto')

// Cuando CLICK en punto
// Saber la posición de ese punto
// Aplicar un transform translateX al grande
// QUITAR la clase activo de TODOS puntos
// AÑADIR la clase activo al punto que hemos hecho CLICK

// Recorrer TODOS los punto
punto.forEach( ( cadaPunto , i )=> {
// Asignamos un CLICK a cadaPunto
punto[i].addEventListener('click',()=>{

// Guardar la posición de ese PUNTO
let posicion  = i
// Calculando el espacio que debe DESPLAZARSE el GRANDE
let operacion = posicion * -25

// MOVEMOS el grand
grande.style.transform = `translateX(${ operacion }%)`

// Recorremos TODOS los punto
punto.forEach( ( cadaPunto , i )=>{
    // Quitamos la clase ACTIVO a TODOS los punto
    punto[i].classList.remove('activo')
})
// Añadir la clase activo en el punto que hemos hecho CLICK
punto[i].classList.add('activo')

})
})

/***********************************/
//DEsafiate 5, carrito de compras
/***********************************/

/*
let addToCart =  document.querySelector("#addCart");

addToCart.addEventListener('click', ()=>{
   if (localStorage.getItem("addToCart")) {
                for (let prodToAdd of JSON.stringify(localStorage.getItem("addToCart"))) {
                    if (cartArticles.map(item => item.id).indexOf(prodToAdd.id) < 0) {
                        cartArticles.push({
                            id: prodToAdd.id,
                            name: prodToAdd.name,
                            count: 1,
                            unitCost: prodToAdd.cost,
                            currency: prodToAdd.currency,
                            image: prodToAdd.image
                        })
                    }
                }
            }
			
			
})

*/

    
   



    