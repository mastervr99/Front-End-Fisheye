//Mettre le code JavaScript lié à la page photographer.html

function getPhotographerIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function getPhotographerById(id) {

    try {
        let response = await fetch('../../project_6/Front-End-Fisheye-main/data/photographers.json');

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

async function getPhotographerIamgesById(id) {

    try {
        let response = await fetch('../../project_6/Front-End-Fisheye-main/data/photographers.json');

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

async function displayPhotographerData() {
    const photographerId = getPhotographerIdFromUrl();
    const photographer = await getPhotographerById(photographerId);
    const picture = `../../project_6/Front-End-Fisheye-main/assets/photographers/${photographer.portrait}`;
  
    document.querySelector('.photographer-name').innerHTML = photographer.name;
    document.querySelector('.location-name').innerHTML = photographer.city + ", " + photographer.country;
    document.querySelector('.tagline').innerHTML = photographer.tagline;
    document.querySelector('.photographer-image').setAttribute("src", picture);
}

async function displayPhotographerImages(images){
    let galleryDiv = document.querySelector('.images-gallery');
    let photographerId = getPhotographerIdFromUrl();
    let photographer = await getPhotographerById(photographerId);
    
    images.forEach(image => {
        let imgDiv = document.createElement('div');
        imgDiv.className = 'image-item';

        let mediaElement;

        if (image.video) {
            mediaElement = document.createElement('video');
            mediaElement.controls = true;
            let source = document.createElement('source');
            source.src = `../../project_6/Front-End-Fisheye-main/assets/Sample_Photos/${photographer.name}/${image.video}`;
            source.type = 'video/mp4';
            mediaElement.appendChild(source);
        } else if (image.image) {
            mediaElement = document.createElement('img');
            mediaElement.src = `../../project_6/Front-End-Fisheye-main/assets/Sample_Photos/${photographer.name}/${image.image}`;
        }
        mediaElement.alt = image.title;


        let images_infos = document.createElement('div');
        images_infos.classList.add('imagesInfos');
        
        let title = document.createElement('div');

        let p = document.createElement('p');

        p.textContent = image.title;

        let interactive_elements = document.createElement('div');
        interactive_elements.classList.add('interactive-elements');

        let span = document.createElement('span')

        let like_icon = document.createElement('div');
        like_icon.classList.add('like_icon');

        let button = document.createElement('button');
        button.innerHTML = ` 
            <i class="fa-regular fa-heart icon-default"></i>
            <i class="fa-solid fa-heart icon-click"></i>
        `;

        span.textContent = image.likes;

        title.appendChild(p);
        like_icon.appendChild(button);
        interactive_elements.appendChild(span);
        interactive_elements.appendChild(like_icon);
        images_infos.appendChild(title);
        images_infos.appendChild(interactive_elements);

        imgDiv.appendChild(mediaElement);
        imgDiv.appendChild(images_infos)
        galleryDiv.appendChild(imgDiv);
    });
}

function sortByDate(a, b) {
    return new Date(b.date) - new Date(a.date);
}

function sortByTitle(a, b) {
    return a.title.localeCompare(b.title);
}

function sortByPopularity(a, b) {
    return b.likes - a.likes;
}


async function init() {
    // Récupère les datas du photographe

    const photographerId = getPhotographerIdFromUrl();
    const photographer = await getPhotographerById(photographerId);

    let images = await getPhotographerIamgesById(photographer.id);

    images.sort(sortByPopularity);

    displayPhotographerData();
    displayPhotographerImages(images);
}

init();

let filterOptions = document.querySelectorAll('.dropdown-list-filter .filter-option');

filterOptions.forEach(option => {
    option.addEventListener('click', async function() {
        let isOptionsHidden = Array.from(filterOptions).some(opt => opt.classList.contains('hidden'));

        if(isOptionsHidden){
            filterOptions.forEach(opt => opt.classList.remove('hidden'));
        } else{
            filterOptions.forEach(opt => {
                if (opt !== this) {
                    opt.classList.add('hidden');
                }
            });

            let photographerId = getPhotographerIdFromUrl();

            let images = await getPhotographerIamgesById(photographerId);
            if (this.textContent === 'Date') {
                images.sort(sortByDate);
            } else if (this.textContent === 'Titre') {
                images.sort(sortByTitle);
            } else {
                images.sort(sortByPopularity);
            }

            let galleryDiv = document.querySelector('.images-gallery');
            galleryDiv.innerHTML = '';
            displayPhotographerImages(images)
        }
    });
});

window.addEventListener('load', (event) => {
    document.querySelector('.like_icon button').addEventListener('click', function() {
        let regularHeart = this.querySelector('.fa-regular.fa-heart');
        let solidHeart = this.querySelector('.fa-solid.fa-heart');
    
        if (regularHeart.style.display === 'none') {
            regularHeart.style.display = 'block';
            solidHeart.style.display = 'none';
        } else {
            regularHeart.style.display = 'none';
            solidHeart.style.display = 'block';
        }
    });
});
