import { el } from "redom";

export default class Result {
    constructor(store) {
        this.store = store;

        const { count } = this.store.getState();

        this.el = el("div", el("p", "Number of clicks: ", (this.result = el("strong", count))));

        this.store.subscribe(state => {
            this.result.textContent = state.count;
        });
    }
}
