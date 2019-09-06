import { el } from "redom";

export default class Reset {
    constructor(store) {
        this.store = store;

        let { count } = this.store.getState();

        this.el = el(
            "div",
            {},
            el(
                "button",
                {
                    onclick: () =>
                        this.store.setState({
                            count: count,
                        }),
                },
                "Reset"
            )
        );
    }
}
