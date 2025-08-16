export default class Horse {
    constructor(src, alt, parent, props) {
        this.src = src;
        this.alt = alt;
        this.parent = parent;

        this.render;

        for (let key in props) {
            if (!(key === 'user') && !(key === 'alt') && !(key === 'parent')) {
                this[key] = props[key];
            }
        }
    }

    setRender(render) {
        this.render = render;
    }
}