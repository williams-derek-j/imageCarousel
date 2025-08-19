import "./style.css"
import clear from "./clear.js";
import { events } from "./events.js";
import Carousel from "./carousel.js";
import Horse from "./horse.js";
import { renderHorse, renderCarousel, renderDropdown } from "./screen.js"
import cat1 from "./cat1.jpg";
import cat2 from "./cat2.jpg";
import cat3 from "./cat3.jpg";

const body = document.querySelector('body')
const content = document.querySelector('#content');

const images = new Carousel()
const image1 = images.imageAdd(cat1, 'cat1')
const image2 = images.imageAdd(cat2, 'cat2')
const image3 = images.imageAdd(cat3, 'cat3')

renderDropdown(images.barn, body);
renderCarousel(images, content);

events.on('dropdownItemClicked', function(object) {
    clear(images.render)
    renderHorse(object, images.render)
})
