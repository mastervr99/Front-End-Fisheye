/**
 * Insertion d'une image/vidéo et ses informations dans la gallery image
 * @param {*} image 
 * @param {*} photographer 
 * @returns 
 */
export function mediaTemplate(image, photographer) {

    let imgDiv = document.createElement('div');
    imgDiv.className = 'image-item';

    /**
     * création d'un élment video pour la gallery image
     * @param {*} image 
     * @param {*} photographer 
     * @returns 
     */
    function createVideoElement(image, photographer) {
        imgDiv.setAttribute("role", "application");

        let mediaElement = document.createElement('video');
        mediaElement.classList.add('video-item');
        mediaElement.src = `../../assets/Sample_Photos/${photographer.name}/${image.video}`;
        mediaElement.setAttribute("track", image.title);

        mediaElement.setAttribute("tabindex", 0);
        mediaElement.setAttribute("aria-label", image.title);

        return { mediaElement, imgDiv };
    }

    /**
     * création d'un élément photo pour la gallery image
     * @param {*} image 
     * @param {*} photographer 
     * @returns 
     */
    function createImageElement(image, photographer) {
        imgDiv.setAttribute("role", "img");

        let mediaElement = document.createElement('img');
        mediaElement.src = `../../assets/Sample_Photos/${photographer.name}/${image.image}`;
        mediaElement.alt = image.title;

        mediaElement.setAttribute("tabindex", 0);
        mediaElement.setAttribute("aria-label", image.title);

        return { mediaElement, imgDiv };
    }

    if (image.video) {
        return createVideoElement(image, photographer);
    } else {
        return createImageElement(image, photographer);
    }
}