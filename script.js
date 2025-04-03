// Obtener el botón y el nombre
const changeColorNameButton = document.getElementById('button');
const titleName = document.getElementById('fullName');
const Name = titleName.textContent;
changeColorNameButton.addEventListener('click', function(){
    console.warn("click.......");
    
    if (titleName.style.color =="") {
        titleName.style = "color:green; font-style italic";
        titleName.innerHTML = "<br><br>"
        titleName.textContent = "1º DAW"
    } else {    
        titleName.style = "";
        titleName.textContent = Name;   
    }
});

const hideName = document.getElementById('button1');
hideName.addEventListener('click', ()=>{
    if (titleName.styleDisplay = "none") {
        titleName.styleDisplay == "block";
    } else {
        titleName.styleDisplay = "none";
    }
});

const hideForm = document.getElementById('bForm');
const contactForm = document.getElementById('contactForm');
hideForm.addEventListener('click', ()=>{
    if(contactForm.style.display === "none" || contactForm.style.display === ""){
        contactForm.style.display ="block";
        hideForm.textContent = "Esconder formulario"
    }else{
        contactForm.style.display = "none";
        hideForm.textContent = "Mostrar formulario"
    }
});