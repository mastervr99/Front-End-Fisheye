let is_contact_modal_open = false;

const contact_modal = document.getElementById("contact_modal");

/**
 * Afficher la modal du formulaire de contact
 */
function displayModal() {
	contact_modal.style.display = "flex";
  document.getElementById("first").focus();

  is_contact_modal_open = true;
  hideBackground();

  setTimeout(function() {
    document.addEventListener('click', closeModalOnClickOutside);
  }, 0);
}

/**
 * Fermer la modal du formulaire de contact
 */
function closeModal() {
  contact_modal.style.display = "none";
  is_contact_modal_open = false;
  showBackground();

  document.removeEventListener('click', closeModalOnClickOutside);
}

document.querySelector('.contact_button').addEventListener('click', displayModal);

document.querySelector('.modal img').addEventListener('click', closeModal);

document.querySelector('.modal img').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    closeModal();
  }
});

const formData = document.getElementsByClassName("formData");

/**
 * Valider le formulaire
 * @returns 
 */
export function validate(){

    let first = document.getElementById("first");
    let last = document.getElementById("last");
    let email = document.getElementById("email");
    let message = document.getElementById("message");
  
    let is_form_wrong = false;
  
    if (!first.value.trim()) {
      formData[0].setAttribute("data-error-visible", "true");
      formData[0].setAttribute("data-error", "Veuillez entrer votre prénom.");
      is_form_wrong = true;
    } else if (first.value.trim().length < 2) {
      formData[0].setAttribute("data-error-visible", "true");
      formData[0].setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
      is_form_wrong = true;
    } else {
      formData[0].setAttribute("data-error-visible", "false");
    }
  
    if (!last.value.trim()) {
      formData[1].setAttribute("data-error-visible", "true");
      formData[1].setAttribute("data-error", "Veuillez entrer votre nom.");
      is_form_wrong = true;
    } else if (last.value.trim().length < 2) {
      formData[1].setAttribute("data-error-visible", "true");
      formData[1].setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
      is_form_wrong = true;
    } else {
      formData[1].setAttribute("data-error-visible", "false");
    }
  
    const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})+$/;
  
    if(!email.value.trim()){
      formData[2].setAttribute("data-error-visible", "true");
      formData[2].setAttribute("data-error", "Veuillez entrer un email.");
      is_form_wrong = true;
    } else if(!emailRegExp.test(email.value.trim())){
      formData[2].setAttribute("data-error-visible", "true");
      formData[2].setAttribute("data-error", "Veuillez entrer un email valide.");
      is_form_wrong = true;
    } else {
      formData[2].setAttribute("data-error-visible", "false");
    }

    if (!message.value.trim()) {
        formData[3].setAttribute("data-error-visible", "true");
        formData[3].setAttribute("data-error", "Veuillez entrer un message.");
        is_form_wrong = true;
      } else {
        formData[3].setAttribute("data-error-visible", "false");
      }
  
  
    if(is_form_wrong){
      return false;
    }
    
    console.log("Prenom: " + first.value.trim() + ', ' + "Nom : " + last.value.trim() + ', ' + "Email: " + email.value.trim() + ', ' + "Message: " + message.value.trim());
  

    closeModal();
    

    first.value = '';
    last.value = '';
    email.value = ''
    message.value = '';

    return false;
  }



  // Close modal when Escape is pressed
document.addEventListener('keydown', function(event) {
    if (is_contact_modal_open && event.key === 'Escape') {
        closeModal();
    }
    
});

/**
 * Fermer la modal du form de contact lorsqu'on clique à l'extérieur de la modal
 * @param {*} event 
 */
function closeModalOnClickOutside(event) {
  let form_modal = document.querySelector('.modal');
  if (is_contact_modal_open && !form_modal.contains(event.target)) {
      closeModal();
    }
}


const header_element = document.getElementById('header');
const main_element = document.getElementById('main');
const infos_frame_element = document.querySelector('.infos-frame');

/**
 * Cacher l'arrière-plan
 */
function hideBackground(){
    header_element.style.display = 'none';
    main_element.style.display = 'none';
    infos_frame_element.style.display ='none';
}

/**
 * 
 * Afficher l'arrière-plan
 */
function showBackground(){
    header_element.style.display = 'block';
    main_element.style.display = 'block';
    infos_frame_element.style.display ='flex';
}