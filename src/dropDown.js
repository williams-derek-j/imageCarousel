export class dropDown {
    constructor(parents, props) {
        this.parent = parent;

        for (let key in props) {
            this[key] = props[key];
        }
    }
}