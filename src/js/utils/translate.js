class Translate {
    constructor(...args) {
        this.name = args.name;
    }
    say () {
        return this.name;
    }
}

export default Translate;