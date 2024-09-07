function ingresar(){
    let correo=document.getElementById("correo").value;
    let pass=document.getElementById("Contraseña").value;

    if(correo=="milio" && pass=="Demon12345") {
        console.log("Igresado con mucho exito");
        window.location="Administrador.html";
    }
    else{
        alert("Datos Incorrectos, tu no eres administrador");

    }

}