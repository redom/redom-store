import { el } from "redom";

export default class Reset {
    constructor(store) {
        this.store = store;

        const { count } = this.store.getState();
        this.initCount = count;

        this.el = el("div", {}, el("button", { onclick: () => this.reset() }, "Reset"));
    }

    reset() {
        this.store.setState({ count: this.initCount });
    }
}
