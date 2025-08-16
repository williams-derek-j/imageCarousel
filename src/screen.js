import Horse from './horse.js'

export function renderHorse(horse, container) {
    const horseRender = document.createElement('div');
    horseRender.classList.add('horse');
    horse.setRender(horseRender);

    const image = document.createElement('img');
    image.classList.add('image');
    image.src = horse.src;
    image.alt = horse.alt;
    horseRender.appendChild(image);

    container.appendChild(horseRender);
}

export function renderCarousel(carousel, container) {
    const carouselRender = document.createElement('div');
    carouselRender.className = 'carousel';
    carousel.setRender(carouselRender);

    carousel.barn.forEach((horse) => {
        renderHorse(horse, carouselRender);
    });

    const arrowLeft = document.createElement('div');
    arrowLeft.className = 'arrow left';
    arrowLeft.textContent = "<";
    arrowLeft.addEventListener('click', (event) => {
        // scrollIntoView previous image in carousel
    })
    carouselRender.appendChild(arrowLeft);

    const arrowRight = document.createElement('div');
    arrowRight.className = 'arrow right';
    arrowRight.textContent = ">";
    arrowRight.addEventListener('click', (event) => {
        // scrollIntoView next image in carousel
    })
    carouselRender.appendChild(arrowRight);

    const nav = document.createElement('div');
    nav.className = 'nav';

    const dots = [];
    for (let horse in carousel.barn) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.addEventListener('click', (event) => {
            if (dots.length > 0) {
                for (let dot in dots) {
                    if (dot.classList.contains('selected')) {
                        dot.classList.remove('selected');
                    }
                }
            }
            dot.classList.add('selected');
            dots.push(dot);

            horse.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'})
        })
        nav.appendChild(dot);
    }
    carouselRender.appendChild(nav);

    container.appendChild(carouselRender);
}