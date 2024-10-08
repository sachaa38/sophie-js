export function generergallery(projects){
  for(let i=0; i < projects.length; i++){

    const card = projects[i];
    const sectiongallery = document.querySelector(".gallery");
    const projetElement = document.createElement("figure");
    const projetImg = document.createElement("img");
    projetImg.src = card.imageUrl;
    const projetTitle = document.createElement("figcaption");
    projetTitle.innerText = card.title;

    sectiongallery.appendChild(projetElement);
    projetElement.appendChild(projetImg);
    projetElement.appendChild(projetTitle);
  }
}

export function afficherPage() {
  fetch('http://localhost:5678/api/works', {
    method: "GET",
      headers: { "Accept": "application/json","Content-Type": "application/json" },
  })
  .then(response => {
    return response.json();
  })
  .then(projects => {
  generergallery(projects);
  });
};

const token = localStorage.getItem("token");

if(token){
  document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".modify-btn").style.display = "block";
    document.querySelectorAll(".buttons button").forEach(function(button) {
      button.style.display = "none";   
    });

    afficherPage();

    document.querySelector(".buttons").style.height = "0px";

    const btnLogout = document.querySelector(".loginBtn");
    btnLogout.innerText = "Logout";
    btnLogout.href = "./index.html";

    document.querySelector(".pre-header").style.display = "flex";

    btnLogout.addEventListener("click", function () {
      localStorage.removeItem("token");
    });
    
  });

} else {
  const modifyBtn = document.querySelector(".modify-btn");
  if (modifyBtn){
    modifyBtn.style.display = "none";
  };

  fetch('http://localhost:5678/api/works', {
    method: "GET",
    headers: { "Accept": "application/json","Content-Type": "application/json" },
  })
  .then(response => {
    return response.json();
  })
  .then(projects => {
    document.querySelector(".gallery").innerHTML ="";
    generergallery(projects);



    fetch('http://localhost:5678/api/categories', {
      method: "GET",
      headers: { "Accept": "application/json","Content-Type": "application/json" },
    }) 
    .then(response => {
      return response.json();
    })
    .then(repCat => {
      for (let i=0; i < repCat.length; i++) {
        const indexBtn = repCat[i]
        const btnDiv = document.querySelector(".buttons");
        const NewBtn = document.createElement("button");
        NewBtn.innerText = indexBtn.name;
        NewBtn.category = indexBtn.id;

        btnDiv.appendChild(NewBtn);

        NewBtn.addEventListener("click", function () {
          const projectfiltre = projects.filter(project => project.category.id === parseInt(NewBtn.category));
          document.querySelector(".gallery").innerHTML = "";
          generergallery(projectfiltre);
        });
      };

    });
  
    const btnTous = document.querySelector(".tous");

    btnTous.addEventListener("click", function () {
      document.querySelector(".gallery").innerHTML = "";
      generergallery(projects);
    });
  });
};
