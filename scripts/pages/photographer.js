//Mettre le code JavaScript lié à la page photographer.html

function getPhotographerIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

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

async function displayPhotographerImages(images){
    let galleryDiv = document.querySelector('.images-gallery');
    let photographerId = getPhotographerIdFromUrl();
    let photographer = await getPhotographerById(photographerId);

    let currentIndex = 0;

    let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');

    var modal = document.getElementById('image_modal');
    var modalImg = document.getElementById("img_content");
    var modalVideo = document.getElementById("video_content");
    var captionText = document.getElementById("image_caption");

    images.forEach((image, index) => {
        
        let imgDiv = document.createElement('div');
        imgDiv.className = 'image-item';

        let mediaElement;

        if (image.video) {
            mediaElement = document.createElement('video');
            mediaElement.classList.add('video-item');

            mediaElement.src = `../../assets/Sample_Photos/${photographer.name}/${image.video}`;

        } else {
            mediaElement = document.createElement('img');
            mediaElement.src = `../../assets/Sample_Photos/${photographer.name}/${image.image}`;

        }
        mediaElement.alt = image.title;
        
        mediaElement.onclick = function(){
            modal.style.display = "block";
            if (image.image) {
                modalImg.style.display = "block";
                modalImg.src = this.src;
            } else {
                modalImg.style.display = "none";
            }

            if (image.video) {
                modalVideo.style.display = "block";
                modalVideo.src = this.src;
                modalVideo.setAttribute("controls", "true");
            } else {
                modalVideo.style.display = "none";
            }         

            captionText.innerHTML = this.alt;
            currentIndex = index;
            
        }

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
            modal.style.display = "none";
        }

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

        button.setAttribute('aria-label', 'Liker');

        button.innerHTML = ` 
        <i class="fa-regular fa-heart icon-default"></i>
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
    likesCounter.innerHTML = sumLikes + ' <i class="fa-solid fa-heart icon-heart">';

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

filterOptions.forEach(option => {
    option.addEventListener('click', async function() {

        let isOptionsHidden = Array.from(filterOptions).some(opt => opt.classList.contains('hidden'));

        if(isOptionsHidden){
            filterOptions.forEach(opt => {
                opt.classList.remove('hidden');
                opt.querySelector('.arrow').style.display = 'none';

                opt.querySelector('.arrow').style.transform = 'rotate(180deg)';
            });

            this.querySelector('.arrow').style.display = 'inline';
            document.querySelector('.dropdown-list-filter').classList.add('open');

        } else{

            if (this === document.querySelector('.dropdown-list-filter .filter-option:not(.hidden)'))  {
                filterOptions.forEach(opt => {
                    if (opt !== this) {
                        opt.classList.add('hidden');
                    }
                });
                document.querySelector('.dropdown-list-filter').classList.remove('open');
                this.querySelector('.arrow').style.transform = 'rotate(0deg)';

                return;
            }


            filterOptions.forEach(opt => {
                if (opt !== this) {
                    opt.classList.add('hidden');
                }
            });

            document.querySelector('.dropdown-list-filter').classList.remove('open');

            this.parentElement.prepend(this);

            let photographerId = getPhotographerIdFromUrl();

            let images = await getPhotographerIamgesById(photographerId);

            if (this.textContent.trim() === 'Date') {
                images.sort(sortByDate);
            } else if (this.textContent.trim() === 'Titre') {
                images.sort(sortByTitle);
            } else {
                images.sort(sortByPopularity);
            }

            let galleryDiv = document.querySelector('.images-gallery');
            galleryDiv.innerHTML = '';
            displayPhotographerImages(images);
            this.querySelector('.arrow').style.transform = 'rotate(0deg)';
            this.querySelector('.arrow').style.display = 'inline';
        }
    });
});

function sortByDate(a, b) {
    return new Date(b.date) - new Date(a.date);
}

function sortByTitle(a, b) {
    return a.title.localeCompare(b.title);
}

function sortByPopularity(a, b) {
    return b.likes - a.likes;
}

