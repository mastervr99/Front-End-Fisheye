/**
 * création du template présentatioon du photographe sur la page d'acceuil
 * @param {*} data 
 * @returns 
 */
export function photographerTemplate(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
    const picture = `../../assets/photographers/${portrait}`;

    /**
     * récupération des infos du photographe
     * @returns 
     */
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        
        const a = document.createElement('a');
        a.href = `photographer.html?id=${id}`;
        a.title = `profil de ${name}`;
        a.setAttribute("aria-label",`   aller sur la page du photographe ${name}`);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", "image du photographe");
        
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        
        const h3 = document.createElement( 'h3' );
        h3.textContent = city + ', ' + country;
        
        const p = document.createElement( 'p' );
        p.textContent = tagline;
        
        const span = document.createElement( 'span' );
        span.textContent = price + '€/jour';
        
        a.appendChild(img);
        a.appendChild(h2);
        
        article.appendChild(a);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(span);
        
        return (article);
    }
    return { name, picture, getUserCardDOM }
}