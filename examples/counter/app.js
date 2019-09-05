import { mount } from "redom";
import Counter from "./Counter";
import store from "./store";

mount(document.body, new Counter(store));
