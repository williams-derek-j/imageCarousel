import Horse from "./horse.js";

export default class Carousel {
    constructor(props) {
        this.render;
        this.barn = [];

        for (let key in props) {
            this[key] = props[key];
        }
    }

    setRender(render) {
        this.render = render;
    }

    imageAdd(src, alt, props) {
        const horse = new Horse(src, alt, this, props);

        horse.index = this.barn.length;

        this.barn.push(horse);

        return horse;
    }

    imageRemove(image) {
        this.barn = this.barn.filter((horse) => {
            return horse !== image;
        })

        this.barn.forEach((horse) => {
            if (horse.index > image.index) {
                horse.index--;
            }
        })
    }
}