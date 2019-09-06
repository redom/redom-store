import { el } from "redom";

export default class Result {
    constructor(store) {
        this.store = store;

        const { count } = this.store.getState();

        this.el = el(
            "div",
            el(
                "h2",
                { style: { color: "#d31b33" } },
                "Number of clicks: ",
                (this.result = el("span", { style: { color: "#000" } }, count))
            )
        );

        this.store.subscribe(state => {
            this.result.textContent = state.count;
        });
    }
}
