import { assign } from "./util";

export default class Store {
    constructor(data) {
        this.listeners = [];
        this.data = data || {};
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.unsubscribe(listener);
        };
    }

    unsubscribe(listener) {
        let out = [];
        for (let i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i] === listener) {
                listener = null;
            } else {
                out.push(this.listeners[i]);
            }
        }
        this.listeners = out;
    }

    set(update, overwrite, action) {
        this.data = overwrite ? update : assign(assign({}, this.data), update);
        let currentListeners = this.listeners;
        for (let i = 0; i < currentListeners.length; i++) {
            currentListeners[i](this.data, action);
        }
    }

    get() {
        return this.data;
    }

    action(action) {
        function apply(result) {
            this.set(result, false, action);
        }

        return function() {
            let args = [this.data];
            for (let i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            let ret = action.apply(this, args);
            if (ret !== null) {
                if (ret.then) return ret.then(apply);
                return apply(ret);
            }
        };
    }
}
