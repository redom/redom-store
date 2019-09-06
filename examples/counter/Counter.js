import { el } from "redom";

export default class Counter {
    constructor(store) {
        this.store = store;
        this.el = el(
            "div",
            {},
            el("button", { onclick: () => this.action("INCREMENT") }, "Increment"),
            el("button", { onclick: () => this.action("DECREMENT") }, "Decrement"),
            el("button", { onclick: () => this.action("INCREMENT_IF_ODD") }, "Increment if odd"),
            el("button", { onclick: () => this.action("INCREMENT_ASYNC") }, "Increment async")
        );
    }

    action(type) {
        let { count } = this.store.getState();
        switch (type) {
            case "INCREMENT":
                this.store.setState({ count: ++count });
                break;
            case "DECREMENT":
                this.store.setState({ count: --count });
                break;
            case "INCREMENT_IF_ODD":
                if ((count + 1) % 2 === 0) {
                    this.store.setState({ count: ++count });
                }
                break;
            case "INCREMENT_ASYNC":
                return new Promise(resolve => {
                    setTimeout(() => {
                        this.store.setState({ count: ++count });
                        resolve();
                    }, 1000);
                });
        }
    }
}
