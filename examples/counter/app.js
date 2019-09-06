import { mount, el } from "redom";
import { store } from "./Store.js";

import Counter from "./Counter.js";
import Reset from "./Reset.js";
import Result from "./Result.js";

const App = el("div#app", new Counter(store), new Result(store), new Reset(store));

mount(document.body, App);
