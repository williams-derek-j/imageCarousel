import "./style.css"
import Carousel from "./carousel.js";
import Horse from "./horse.js";
import cat1 from "./cat1.jpg";
import cat2 from "./cat2.jpg";
import cat3 from "./cat3.jpg";

const images = new Carousel()
const image1 = images.imageAdd(cat1, 'cat1')

console.log('test');