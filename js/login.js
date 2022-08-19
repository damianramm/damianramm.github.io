function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
    
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

function validacion() {

email = document.getElementById('email');
pass = document.getElementById('pass');

if (pass.value == 0 || email.value == 0 ){
    //showAlertError()
    alert("Datos incorrectos") ;
    return false;
} else {
    showAlertSuccess();
    localStorage.setItem('USER', 'true');
    window.location.href="index.html";
}
};

