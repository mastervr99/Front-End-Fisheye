let is_modal_open = false;

function displayModal() {
  const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
  is_modal_open = true;

  setTimeout(function() {
    document.addEventListener('click', closeModalOnClickOutside);
  }, 0);
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  is_modal_open = false;
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

// validate form
function validate(){

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
  
    document.getElementById('contact_modal').style.display = 'none';
    is_modal_open = false;
    console.log("Prenom: " + first.value.trim() + ', ' + "Nom : " + last.value.trim() + ', ' + "Email: " + email.value.trim() + ', ' + "Message: " + message.value.trim());
    document.removeEventListener('click', closeModalOnClickOutside);

    first.value = '';
    last.value = '';
    email.value = ''
    message.value = '';

    return false;
  }



  // Close modal when Escape is pressed
document.addEventListener('keydown', function(event) {
    if (is_modal_open && event.key === 'Escape') {
        document.getElementById('contact_modal').style.display = 'none';
        is_modal_open = false;
        document.removeEventListener('click', closeModalOnClickOutside);
    }
    
});


function closeModalOnClickOutside(event) {
  var form_modal = document.querySelector('.modal');
  if (is_modal_open && !form_modal.contains(event.target)) {
      document.getElementById('contact_modal').style.display = 'none';
      is_modal_open = false;
  
        document.removeEventListener('click', closeModalOnClickOutside);
    }
}