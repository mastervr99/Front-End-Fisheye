
/**
 * récupération de l'id du photographe
 * @returns id
 */
function getPhotographerIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

/**
 * restitution des data du photographe avec l'id
 * @param {number} id 
 * @returns 
 */
async function getPhotographerById(id) {

    try {
        let response = await fetch('../../data/photographers.json');

        if (!response.ok) {
            throw new Error("Erreur HTTP : " + response.status);
        }
        
        let data = await response.json();
        let photographer =  data.photographers.find(p => p.id === parseInt(id));
        return photographer;

    } catch (error) {
        console.error('Erreur :', error);
    }
}

/**
 * récupération des images du photographe avec son id
 * @param {number} id 
 * @returns images
 */
async function getPhotographerIamgesById(id) {

    try {
        let response = await fetch('../../data/photographers.json');
        if (!response.ok) {
            throw new Error("Erreur HTTP : " + response.status);
        }
        
        let data = await response.json();
        let images = data.media.filter(p => p.photographerId === parseInt(id));
        return images;

    } catch (error) {
        console.error('Erreur :', error);
    }
}

/**
 * affichage des informations du photographe
 */
async function displayPhotographerData() {
    const photographerId = getPhotographerIdFromUrl();
    const photographer = await getPhotographerById(photographerId);
    const picture = `../../assets/photographers/${photographer.portrait}`;

    document.querySelector('.photographer-name').innerHTML = photographer.name;
    document.querySelector('.location-name').innerHTML = photographer.city + ", " + photographer.country;
    document.querySelector('.tagline').innerHTML = photographer.tagline;
    document.querySelector('.photographer-image').setAttribute("src", picture);

    document.querySelector('.modal h2').innerHTML+= ' '+photographer.name;
}

let is_image_model_open = false;

let currentIndex = 0;
let images_photographer = [];
let current_photographer = null;

var image_modal = document.getElementById('image_modal');
var modalImg = document.getElementById("img_content");
var modalVideo = document.getElementById("video_content");
var captionText = document.querySelector("#image_caption span");

/**
 * affichages des images du photographe
 * @param {*} images 
 */
async function displayPhotographerImages(images){
    images_photographer = images;

    let galleryDiv = document.querySelector('.images-gallery');
    let photographerId = getPhotographerIdFromUrl();
    let photographer = await getPhotographerById(photographerId);
    current_photographer = photographer;

    let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');



    images.forEach((image, index) => {
        
        // let imgDiv = document.createElement('div');
        // imgDiv.className = 'image-item';

        // let mediaElement;

        let { mediaElement, imgDiv } = createMediaElement(image, photographer);

        // if (image.video) {
        //     imgDiv.setAttribute("role", "video");
        //     mediaElement = document.createElement('video');
        //     mediaElement.classList.add('video-item');

        //     mediaElement.src = `../../assets/Sample_Photos/${photographer.name}/${image.video}`;
        //     mediaElement.setAttribute("track", image.title)
        //     mediaElement.setAttribute("tabindex", 0)
        //     mediaElement.setAttribute("aria-label", image.title)

        // } else {
        //     imgDiv.setAttribute("role", "image");

        //     mediaElement = document.createElement('img');
        //     mediaElement.src = `../../assets/Sample_Photos/${photographer.name}/${image.image}`;
        //     mediaElement.alt = image.title;
        //     mediaElement.setAttribute("tabindex", 0)
        //     mediaElement.setAttribute("aria-label", image.title)

        // }
        
        mediaElement.onclick = function(){
            image_modal.style.display = "block";
            is_image_model_open = true;
            document.querySelector(".prev").focus();
            hideBackground();

            if (image.image) {
                modalImg.style.display = "block";
                modalImg.src = this.src;
                modalImg.alt = image.title;
                captionText.innerHTML = this.alt;
            } else {
                modalImg.style.display = "none";
            }

            if (image.video) {
                modalVideo.style.display = "block";
                modalVideo.src = this.src;
                modalVideo.setAttribute("track", image.title)
                captionText.innerHTML = image.title;

            } else {
                modalVideo.style.display = "none";
            }         

            currentIndex = index;
            
        }



        mediaElement.addEventListener('keydown', function(event){
            if(event.key == 'Enter'){
                image_modal.style.display = "block";
                is_image_model_open = true;
                document.querySelector(".prev").focus();
                hideBackground();   
    
                if (image.image) {
                    modalImg.style.display = "block";
                    modalImg.src = this.src;
                    modalImg.alt = image.title;
                    captionText.innerHTML = this.alt;
    
                } else {
                    modalImg.style.display = "none";
                }
    
                if (image.video) {
                    modalVideo.style.display = "block";
                    modalVideo.src = this.src;
                    modalVideo.setAttribute("track", image.title)
                    captionText.innerHTML = image.title;
    
                } else {
                    modalVideo.style.display = "none";
                }         
    
                currentIndex = index;
            }
        });

        prev.onclick = function() {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            if(images[currentIndex].image){
                modalImg.src = `../../assets/Sample_Photos/${photographer.name}/${images[currentIndex].image}`;
                modalImg.style.display = "block";
                modalVideo.style.display = "none";
            }else if(images[currentIndex].video) {
                modalImg.style.display = "none";
                modalVideo.style.display = "block";
                modalVideo.src = `../../assets/Sample_Photos/${photographer.name}/${images[currentIndex].video}`;
                modalVideo.setAttribute("controls", "true");
            }
            captionText.innerHTML = images[currentIndex].title;
        };
    
        next.onclick = function() {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            if(images[currentIndex].image){
                modalImg.src = `../../assets/Sample_Photos/${photographer.name}/${images[currentIndex].image}`;
                modalImg.style.display = "block";
                modalVideo.style.display = "none";
            }else {
                modalImg.style.display = "none";
                modalVideo.style.display = "block";
                modalVideo.src = `../../assets/Sample_Photos/${photographer.name}/${images[currentIndex].video}`;
                modalVideo.setAttribute("controls", "true");
            }                
            captionText.innerHTML = images[currentIndex].title;
        };

        var close = document.querySelector(".image_close");
        close.onclick = function() { 
            image_modal.style.display = "none";
            is_image_model_open = false;
            showBackground();
        }

        close.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                image_modal.style.display = "none";
                is_image_model_open = false;
                showBackground();            
            }
        });

        let images_infos = document.createElement('div');
        images_infos.classList.add('imagesInfos');
        
        let title = document.createElement('div');

        let h3 = document.createElement('h3');

        h3.textContent = image.title;

        let interactive_elements = document.createElement('div');
        interactive_elements.classList.add('interactive-elements');

        let span = document.createElement('span')

        let like_icon = document.createElement('div');
        like_icon.classList.add('like_icon');

        let button = document.createElement('button');

        button.setAttribute('aria-label', 'Liker');
        button.setAttribute('role', 'button');

        button.innerHTML = ` 
        <i class="fa-regular fa-heart icon-default"></i>
        `;


        span.textContent = image.likes;

        title.appendChild(h3);
        like_icon.appendChild(button);
        interactive_elements.appendChild(span);
        interactive_elements.appendChild(like_icon);
        images_infos.appendChild(title);
        images_infos.appendChild(interactive_elements);

        imgDiv.appendChild(mediaElement);
        imgDiv.appendChild(images_infos)
        galleryDiv.appendChild(imgDiv);

        button.addEventListener('click', function() {
            let regularHeart = this.querySelector('.fa-regular.fa-heart');
            
            if (regularHeart) {
                button.innerHTML = ` 
                <i class="fa-solid fa-heart icon-click"></i>
                `;
                span.textContent++;
                displayFrameData();
            } else {
                button.innerHTML = ` 
                <i class="fa-regular fa-heart icon-default"></i>
                `;
                span.textContent--;
                displayFrameData();
            }
        });
        
    });
}

/**
 * création d'un div pour afficher une image/vidéo et ses informations
 * @param {*} image 
 * @param {*} photographer 
 * @returns 
 */
function createMediaElement(image, photographer) {
    let imgDiv = document.createElement('div');
    imgDiv.className = 'image-item';
    let mediaElement;

    if (image.video) {
        imgDiv.setAttribute("role", "application");
        mediaElement = document.createElement('video');
        mediaElement.classList.add('video-item');
        mediaElement.src = `../../assets/Sample_Photos/${photographer.name}/${image.video}`;
        mediaElement.setAttribute("track", image.title)

    } else {
        imgDiv.setAttribute("role", "img");
        mediaElement = document.createElement('img');
        mediaElement.src = `../../assets/Sample_Photos/${photographer.name}/${image.image}`;
        mediaElement.alt = image.title;
    }

    mediaElement.setAttribute("tabindex", 0)
    mediaElement.setAttribute("aria-label", image.title)

    return { mediaElement, imgDiv };
}

const header = document.getElementById('header');
const main = document.getElementById('main');
const infos_frame = document.querySelector('.infos-frame');

/**
 * Cacher l'arrière-plan
 */
function hideBackground(){
    header.style.display = 'none';
    main.style.display = 'none';
    infos_frame.style.display ='none';
}

/**
 * Afficher l'arrière-plan
 */
function showBackground(){
    header.style.display = 'block';
    main.style.display = 'block';
    infos_frame.style.display ='flex';
}

document.addEventListener('keydown', function(event) {
    if(is_image_model_open){
        if (event.key === 'ArrowLeft') {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images_photographer.length - 1;
            if(images_photographer[currentIndex].image){
                modalImg.src = `../../assets/Sample_Photos/${current_photographer.name}/${images_photographer[currentIndex].image}`;
                modalImg.style.display = "block";
                modalVideo.style.display = "none";
            }else if(images_photographer[currentIndex].video) {
                modalImg.style.display = "none";
                modalVideo.style.display = "block";
                modalVideo.src = `../../assets/Sample_Photos/${current_photographer.name}/${images_photographer[currentIndex].video}`;
                modalVideo.setAttribute("controls", "true");
            }
            captionText.innerHTML = images_photographer[currentIndex].title;
        } else if(event.key === 'ArrowRight') {
            currentIndex = (currentIndex < images_photographer.length - 1) ? currentIndex + 1 : 0;
            if(images_photographer[currentIndex].image){
                modalImg.src = `../../assets/Sample_Photos/${current_photographer.name}/${images_photographer[currentIndex].image}`;
                modalImg.style.display = "block";
                modalVideo.style.display = "none";
            }else {
                modalImg.style.display = "none";
                modalVideo.style.display = "block";
                modalVideo.src = `../../assets/Sample_Photos/${current_photographer.name}/${images_photographer[currentIndex].video}`;
                modalVideo.setAttribute("controls", "true");
            }                
            captionText.innerHTML = images_photographer[currentIndex].title;            
        }
    }
    
});

/**
 * Afficher les informations du cadre
 */
async function displayFrameData(){
    let photographerId = getPhotographerIdFromUrl();
    let photographer = await getPhotographerById(photographerId);
    let sumLikes = 0;
    let elements = document.querySelectorAll('.interactive-elements span');

    elements.forEach(element => {
        let number = parseInt(element.textContent.trim(), 10);
        if (!isNaN(number)) {
            sumLikes += number;
        }
    });

    let likesCounter = document.querySelector('.likes-count');
    likesCounter.innerHTML = sumLikes + ' <i class="fa-solid fa-heart icon-heart" aria-label="likes">';

    let prestationPrice = document.querySelector(".prestation-price");
    prestationPrice.innerHTML = photographer.price + "€ / jour";
}




async function init() {
    // Récupère les datas du photographe

    const photographerId = getPhotographerIdFromUrl();
    // const photographer = await getPhotographerById(photographerId);

    let images = await getPhotographerIamgesById(photographerId);

    images.sort(sortByPopularity);

    displayPhotographerData();
    displayPhotographerImages(images);
    displayFrameData();
}

init();

let filterOptions = document.querySelectorAll('.dropdown-list-filter .filter-option');
let currentOption = filterOptions[0];

/**
 * Afficher les options de filtre
 */
function showOptions() {
    filterOptions.forEach(opt => {
        opt.classList.remove('hidden');
        opt.querySelector('.arrow').style.display = 'none';
        opt.querySelector('.arrow').style.transform = 'rotate(180deg)';
    });
}

/**
 * Cacher les options de filtre
 * @param {*} option 
 */
function hideOptions(option) {
    filterOptions.forEach(opt => {
        if (opt !== option) {
            opt.classList.add('hidden');
        }
    });
    document.querySelector('.dropdown-list-filter').classList.remove('open');
    option.querySelector('.arrow').style.transform = 'rotate(0deg)';
}

/**
 * Mettre à jour la gallery photo
 * @param {*} option 
 */
async function updateGallery(option) {
    let photographerId = getPhotographerIdFromUrl();
    let images = await getPhotographerIamgesById(photographerId);

    if (option.textContent.trim() === 'Date') {
        images.sort(sortByDate);
    } else if (option.textContent.trim() === 'Titre') {
        images.sort(sortByTitle);
    } else {
        images.sort(sortByPopularity);
    }

    let galleryDiv = document.querySelector('.images-gallery');
    galleryDiv.innerHTML = '';
    displayPhotographerImages(images);
    option.querySelector('.arrow').style.transform = 'rotate(0deg)';
    option.querySelector('.arrow').style.display = 'inline';
}

filterOptions.forEach(option => {
    option.addEventListener('keydown', async function(e) {
        if (e.key == 'Enter'){
            handleOptionSelection(this);
        }       
    });

    option.addEventListener('click', async function() {
        handleOptionSelection(this);
    });
});

/**
 * gestion de l'affichage de la gallery en fonction des options choisies
 * @param {*} option 
 * @returns 
 */
async function handleOptionSelection(option) {
    let isOptionsHidden = Array.from(filterOptions).some(opt => opt.classList.contains('hidden'));
    let diplayedOption = document.querySelector('.dropdown-list-filter .filter-option:not(.hidden)');

    if(isOptionsHidden){
        showOptions();
        option.querySelector('.arrow').style.display = 'inline';
        document.querySelector('.dropdown-list-filter').classList.add('open');
    } else{
        if (option === diplayedOption)  {
            hideOptions(option);
            return;
        }

        hideOptions(option);
        option.parentElement.prepend(option);
        currentOption = option;
        await updateGallery(option);
    }
}

/**
 * filtrer les images par date
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
function sortByDate(a, b) {
    return new Date(b.date) - new Date(a.date);
}

/**
 * filtrer les images par le titre dans l'ordre alphabétique
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
function sortByTitle(a, b) {
    return a.title.localeCompare(b.title);
}

/**
 * filtrer les images par le nombre de likes
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
function sortByPopularity(a, b) {
    return b.likes - a.likes;
}

document.addEventListener('keydown', function(event) {
    if (is_image_model_open && event.key === 'Escape') {
        document.getElementById('image_modal').style.display = 'none';
        is_image_model_open = false;
        showBackground();
    }
});

var dropdown = document.querySelector('.dropdown-list-filter');

document.addEventListener('click', function(event) {
    if (dropdown.classList.contains('open') && !dropdown.contains(event.target)) {
        dropdown.classList.remove('open');
        hideOptions(currentOption);
    }
});

document.addEventListener('keydown', function(event) {
    if (dropdown.classList.contains('open') && event.key === 'Escape') {
        dropdown.classList.remove('open');
        hideOptions(currentOption);
    }
});

dropdown.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter') return;
    let isOptionsHidden = Array.from(filterOptions).some(opt => opt.classList.contains('hidden'));
    if(isOptionsHidden){
        showOptions();
        currentOption.querySelector('.arrow').style.display = 'inline';
        document.querySelector('.dropdown-list-filter').classList.add('open');
    } else {
        hideOptions(currentOption);
        currentOption.querySelector('.arrow').style.display = 'none';
    }
});