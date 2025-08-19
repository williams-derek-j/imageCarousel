import clear from "./clear.js"
import { events } from "./events.js"

export function renderDropdown(objectsArray, container) {
    const dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add("dropdownContainer");
    dropdownContainer.innerHTML = document.createElement("span").textContent = "Images";

    const droppedContainer = document.createElement("div");
    droppedContainer.classList.add("droppedContainer");

    objectsArray.forEach((object) => {
        const listItemContainer = document.createElement('div');
        listItemContainer.classList.add("listItemContainer");

        listItemContainer.append(document.createElement("span").textContent = object.alt);

        listItemContainer.addEventListener("click", (event) => {
            events.emit('dropdownItemClicked', object);
        })

        droppedContainer.appendChild(listItemContainer);
    })
    dropdownContainer.append(droppedContainer);

    dropdownContainer.addEventListener("click", (event) => {
        droppedContainer.classList.toggle("selected");
    })

    container.appendChild(dropdownContainer);
}


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
    let horseActive;
    carousel.barn.forEach((horse) => {
        if (i < maxImages) {
            horseActive = horse;

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
                horse.dot.classList.remove('selected');
            }
            i++;
        })
        let prev;
        if (index || index === 0) {
            prev = carousel.barn[index]

            prev.dot.classList.add('selected');
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

            clear(carouselRender)
            renderHorse(horse, carouselRender);
        })
        horse.dot = dot;

        if (horse === horseActive) {
            horse.dot.classList.add('selected');
        }

        dots.push(dot);
        nav.appendChild(dot);
    })
    events.on('dropdownItemClicked', (horse) => {
        dots.forEach((dot) => {
            const name = dot.className;
            if (name.includes('selected')) {
                dot.classList.remove('selected');
            }
        })

        horse.dot.classList.add('selected');
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

                horse.dot.classList.remove('selected');
            }
            i++;
        })
        let next;
        if (index || index === 0) {
            next = carousel.barn[index]

            next.dot.classList.add('selected');
        }
        renderHorse(next, carouselRender);
    })
    container.appendChild(arrowRight);
}