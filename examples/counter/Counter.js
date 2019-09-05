import { el } from "redom";

export default class Counter {
    constructor(store) {
        console.log(store);

        this.el = el(
            "div",
            {},
            el("button", {}, "increment"),
            el("button", {}, "Decrement"),
            el("button", {}, "Increment if odd"),
            el("button", {}, "Increment async")
        );
    }
}
