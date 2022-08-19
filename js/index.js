document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

function desconectarse(){
    localStorage.setItem('USER', 'false');
}

function validar() {
    if(localStorage.getItem('USER')){
        if(localStorage.getItem('USER'== 'false')){
            window.location = "login.html";
     }
} else {
    window.location = "login.html";
    alert('Debe logearse correctamente');
}
}