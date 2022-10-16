


function validacion() {

email = document.getElementById('email');
pass = document.getElementById('pass');

if (pass.value == 0 || email.value == 0 ){
    alert("Datos incorrectos") ;
    return false;
} else {
    alert("Te has logueado correctamente!") ;
    localStorage.setItem('usuario', email.value );
    window.location.href="main.html";
}
};








