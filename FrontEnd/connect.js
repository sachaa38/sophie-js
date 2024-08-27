

function connection(){
    event.preventDefault();

    const dataConnect = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    };

    
    const chargeUtile = JSON.stringify(dataConnect);
    fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    })
    .then((response) =>{
        return response.json();

    })
    .then(promise => {
        token = promise.token;
        const stockToken = window.localStorage.setItem("token", token);
        if (token) {
            window.location.href = "./index.html";

        }else {
            alert("Erreur dans l’identifiant ou le mot de passe");
        }
    })
};
document.addEventListener("DOMContentLoaded", function() {
    const formConnect = document.querySelector(".form-connect");
    formConnect.addEventListener("submit", connection); 
});
  


