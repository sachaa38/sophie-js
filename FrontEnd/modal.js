import { generergallery, afficherPage } from "./front.js";


document.addEventListener('DOMContentLoaded', (event) => {
    let modal = null;
    let modal2 = null;

    const openModal = function(e) {
        e.preventDefault();
        let target = document.querySelector(e.target.getAttribute("href"));
        if (target === null) {
            target = document.getElementById("modal");
        }
        if (target) {
            target.style.display = "flex";
            target.removeAttribute("aria-hidden");
            target.setAttribute("aria-modal", "true");
            modal = target;  
            modal.addEventListener("click", closeModal);
            modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
            
        }
    };

    const openModal2 = function(e) {
        e.preventDefault(); 
        const target2 = document.querySelector(e.target.getAttribute("data-target"));
        if (target2) {
            target2.style.display = "flex";
            target2.removeAttribute("aria-hidden");
            target2.setAttribute("aria-modal", "true");
            modal2 = target2;  
            modal2.addEventListener("click", closeModal2);
            modal2.querySelector(".js-modal-close").addEventListener("click", closeModal2);  
        }
            modal.style.display = "none";
            modal.setAttribute("aria-hidden", "true");
            modal.removeAttribute("aria-modal");
            modal.removeEventListener("click", closeModal);
            modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
            modal = null;
    };

    const closeModal = function(e) {
        if (modal === null) return;
        e.preventDefault();
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute("aria-modal");
        modal.removeEventListener("click", closeModal);
        modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
        modal = null;
    };
        
    const closeModal2 = function(e) {
        if(modal2 === null) return;
        e.preventDefault();
        modal2.style.display = "none";
        modal2.setAttribute("aria-hidden", "true");
        modal2.removeAttribute("aria-modal");
        modal2.removeEventListener("click", closeModal2);
        modal2.querySelector(".js-modal-close").removeEventListener("click", closeModal2);
        modal2 = null;
    };


const stopPropagation = function(e) {
        e.stopPropagation()
};


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
        console.log("id image :" + card.id)
        sectionmodal.appendChild(contenerImage);
        contenerImage.appendChild(projetImg);
        contenerImage.appendChild(fond_icone);
        fond_icone.appendChild(iconeDel);
        
        fond_icone.addEventListener("click", (e) => {

            const token = localStorage.getItem("token");
            const id = card.id;
            console.log("id du bouton :" + id);

            if (window.confirm("Voulez vous supprimer le projet " + card.title + " ?")) {
                console.log("Validé");
                fetch('http://localhost:5678/api/works/' + id, {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": "Bearer "  + token,
                        },
            })
            .then(response => {
                if (response.ok) {
                    console.log('OK');
                };
                console.log('OK2')
                projects = projects.filter(project => project.id !== id);
                document.querySelector(".modal-content").innerHTML = "";
                genererModal(projects);
                document.querySelector(".gallery").innerHTML= "";
                afficherPage();
                


          
            }) ;
        }else {

            console.log("Refusé");
        };
        });
    };
    };
    

    document.querySelectorAll(".js-modal").forEach(a => {
        fetch('http://localhost:5678/api/works', {
            method: "GET",
            headers: { "Accept": "application/json","Content-Type": "application/json" },
          })
            .then(response => {
              return response.json();
            })
            .then(projects => {
              console.log(projects); 
        
              genererModal(projects);      
        }) ;
        a.addEventListener("click", openModal);
        
    });

    document.querySelectorAll(".btn-ajouter").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            openModal2(e);
            
        });
    
    });

     document.querySelectorAll(".js-modal-close").forEach(button => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            closeModal2(e);
        });
    });

    document.querySelectorAll(".modal").forEach(modalElement => {
        modalElement.addEventListener("click", (e) => {
            closeModal();
            closeModal2();
    });
        modalElement.querySelector(".modal-wrapper").addEventListener("click", (e) => {
            e.stopPropagation();
        });
    });
    const btnBack = document.getElementById("backTo");
    btnBack.addEventListener("click", (e) => {
        closeModal2(e);
        openModal(e);
    });

    const imgForm = document.getElementById("files");
    const titleForm = document.getElementById("texte");
    const categoryForm = document.getElementById("categorie");
    const submitButton = document.querySelector(".btn-valider");
    const preview = document.getElementById("preview");
    const imgVide = document.querySelector(".img-vide");

    function previewImage() {
        const file = imgForm.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = "block";
                imgVide.style.display = "none";
                document.getElementById("label-photo").style.display ="none";
                document.getElementById("format-img").style.display ="none";

            }
            reader.readAsDataURL(file);
        }
    }
    function checkForm() {
        if (imgForm.files.length > 0 && titleForm.value.trim() !== "" && categoryForm.value !== "vide") {
            submitButton.style.backgroundColor = "#1D6154"; 
        } else {
            submitButton.style.backgroundColor = "#A7A7A7";
        }
    };

        imgForm.addEventListener("change", function() {
        previewImage();
        checkForm()
    });

    titleForm.addEventListener("input", function() {
        checkForm(); 
            });

    categoryForm.addEventListener("change", function() {
        checkForm()
    });

    const form = document.querySelector("form")                
    form.addEventListener("submit", (e) => {
        e.preventDefault();


        const formData = new FormData();
formData.append("image", document.querySelector("input[type='file']").files[0]); 
formData.append("title", titleForm.value);
formData.append("category", categoryForm.value);

const token = localStorage.getItem("token");

fetch("http://localhost:5678/api/works", {
      method: "POST",
  headers: {
    "Accept": "application/json",
    "Authorization": "Bearer "  + token,
  },
  body: formData
})
.then(response => {
  if (response.ok) {
    document.getElementById("modal2").style.display ="none";
    alert("Votre projet a été ajouté avec succès !")

    fetch('http://localhost:5678/api/works', {
        method: "GET",
        headers: { "Accept": "application/json","Content-Type": "application/json" },
      })
        .then(response => {
          return response.json();
        })
        .then(projects => {
          console.log(projects); 
        document.querySelector(".modal-content").innerHTML = "";
        genererModal(projects);
        document.querySelector(".gallery").innerHTML= "";
        afficherPage();
        });

  } else {
    if (imgForm.files.length < 0 || titleForm.value.trim() == "" || categoryForm.value == "vide") {
        alert("Veuillez remplir tous les champs")
        

    } else {
    alert("Oups ! Un problème est survenu !")}
  }
  return response.json();
})
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
       /** const formData = new FormData(form);
        const fileF = imgForm.files[0];
        const titleF = titleForm.value.trim();
        const categorieF = categoryForm.value;
    

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
            if(!value) {
                alert("Veuillez remplir tous les champs");
            }
        };

        formData.append("image", fileF);
        formData.append("title", titleF);
        formData.append("category", categorieF);
        console.log(fileF + " / " + titleF + " / " + categorieF);
        console.log(token)

        fetch("http://localhost:5678/api/works", {
            method : "POST",
            body: formData,
            headers: {"Content-Type": "multipart/form-data","Authorization": "Bearer "  + token,},
        })
        .then(response =>  {// Vérifiez si la réponse est en HTML ou JSON
            const contentType = response.headers.get("content-type");
            if (!response.ok) {
                throw new Error('Erreur de réseau');
            }
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else {
                return response.text().then(text => { throw new Error(text); });
            }
        })
        .then(response => console.log(res))**/
    });

});




