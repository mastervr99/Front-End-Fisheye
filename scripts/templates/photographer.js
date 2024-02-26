function photographerTemplate(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
    const picture = `../../project_6/Front-End-Fisheye-main/assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        
        const a = document.createElement('a');
        a.href = `photographer.html?id=${id}`;

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        
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