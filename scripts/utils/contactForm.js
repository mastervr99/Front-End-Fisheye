function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

document.querySelector('.contact_button').addEventListener('click', displayModal);

document.querySelector('.modal button').addEventListener('click', closeModal);
