function genererModal(projects) {
    for(let i=0; i < projects.length; i++){

        const card = projects[i];
        const sectionmodal = document.querySelector(".modal-content");
        const projetImg = document.createElement("img");
        projetImg.src = card.imageUrl;
        const contenerImage = document.createElement("div");
        const fond_icone = document.createElement("a");
        const iconeDel = document.createElement("img");
        iconeDel.src = "./assets/icons/supprimer.png";        

        contenerImage.classList.add("contener-image")
        projetImg.classList.add("imgModal");
        iconeDel.classList.add("buttonDel");
        fond_icone.classList.add("fond-btn");

        sectionmodal.appendChild(contenerImage);
        contenerImage.appendChild(projetImg);
        contenerImage.appendChild(fond_icone);
        fond_icone.appendChild(iconeDel);
        
    }    
};

window.onload = function(){ 
    // your code 


var modal1 = document.getElementById("#modal");
var modal2 = document.getElementById("#modal2");

var closeModal1 = document.getElementById("closeModal1");
var closeModal2 = document.getElementById("closeModal2");

var openModal1 = document.getElementById("openModal1");
var openModal2 = document.getElementById("openModal2");
var backToModal1 = document.getElementById("backToModal1");

openModal1.onclick = function() {
    modal1.style.display = "block";
};

 // Fermer la deuxième modale
 closeModal2.onclick = function() {
    modal2.style.display = "none";
}

// Ouvrir la deuxième modale depuis la première
openModal2.onclick = function() {
    modal1.style.display = "none";
    modal2.style.display = "block";
}

// Revenir à la première modale depuis la deuxième
backToModal1.onclick = function() {
    modal2.style.display = "none";
    modal1.style.display = "block";
}

// Fermer la modale en cliquant en dehors de celle-ci
window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}
};