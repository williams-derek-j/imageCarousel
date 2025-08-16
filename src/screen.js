import clear from "./clear.js"
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
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('carouselContainer');

    const carouselRender = document.createElement('div');
    carouselRender.classList.add('carousel');
    carousel.setRender(carouselRender);
    carouselContainer.appendChild(carouselRender);

    const maxImages = 1;
    let i = 0;
    carousel.barn.forEach((horse) => {
        if (i < maxImages) {
            renderHorse(horse, carouselRender);
        }
        i++;
    });

    const arrowLeft = document.createElement('div');
    arrowLeft.classList.add('arrow');
    arrowLeft.classList.add('left');
    arrowLeft.textContent = "<";
    arrowLeft.addEventListener('click', (event) => {
        const currentRender = carouselRender.querySelector('.horse');
        clear(carouselRender);

        let i = 0;
        let index;
        carousel.barn.forEach((horse) => {
            if (horse.render === currentRender) {
                index = i - 1;
                if (index < 0) {
                    index = carousel.barn.length - 1;
                }
            }
            i++;
        })
        let prev;
        if (index || index === 0) {
            prev = carousel.barn[index]
        }
        renderHorse(prev, carouselRender);
    })
    container.appendChild(arrowLeft);

    const nav = document.createElement('div');
    nav.classList.add('nav');

    const dots = [];
    carousel.barn.forEach((horse) => {
        const dot = document.createElement('div');
        dot.className = ('dot');
        dot.addEventListener('click', (event) => {
            if (dots.length > 0) {
                dots.forEach((dot) => {
                    const name = dot.className;
                    if (name.includes('selected')) {
                        dot.classList.remove('selected');
                    }
                })
            }
            dot.classList.add('selected');
            dots.push(dot);

            clear(carouselRender)
            renderHorse(horse, carouselRender);
        })
        nav.appendChild(dot);
    })
    carouselContainer.appendChild(nav);

    container.appendChild(carouselContainer);

    const arrowRight = document.createElement('div');
    arrowRight.classList.add('arrow');
    arrowRight.classList.add('right');
    arrowRight.textContent = ">";
    arrowRight.addEventListener('click', (event) => {
        const currentRender = carouselRender.querySelector('.horse');
        clear(carouselRender);

        let i = 0;
        let index;
        carousel.barn.forEach((horse) => {
            if (horse.render === currentRender) {
                index = i + 1;
                if (index > carousel.barn.length - 1) {
                    index = 0;
                }
            }
            i++;
        })
        let next;
        if (index || index === 0) {
            next = carousel.barn[index]
        }
        renderHorse(next, carouselRender);
    })
    container.appendChild(arrowRight);
}