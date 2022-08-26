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

function validarUsuario() {
    if(localStorage.getItem('USER')){
        if(localStorage.getItem('USER')  == 'false'){
            alert('Debe logearse correctamente')
            window.location.href = "login.html";
     }
    } else {
    window.location.href = "login.html";
    alert('Debe logearse correctamente');
}
document.getElementById("usuario").innerHTML = localStorage.getItem("usuario");
}



