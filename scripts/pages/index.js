    import {photographerTemplate} from '../templates/photographerTemplate.js';
    
    /**
     * Récupérer la liste des photographes
     * @returns 
     */
    async function getPhotographers() {

        try {
            let response = await fetch('../../data/photographers.json');

            if (!response.ok) {
                throw new Error("Erreur HTTP : " + response.status);
            }
            
            let data = await response.json();
            let photographers = data.photographers;

            return { photographers };

        } catch (error) {
            console.error('Erreur :', error);
        }
    }

    /**
     * Afficher les informations des photographes
     * @param {*} photographers 
     */
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });

    }

    async function init() {
        // Récupère les datas des photographes
        
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
