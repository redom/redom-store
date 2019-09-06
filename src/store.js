import { assign } from "./util";

export default class Store {
    constructor(state) {
        this.listeners = [];
        this.state = state || {};
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

    setState(state, action) {
        this.state = assign(assign({}, this.state), state);
        let currentListeners = this.listeners;
        for (let i = 0; i < currentListeners.length; i++) {
            currentListeners[i](this.state, action);
        }
    }

    getState() {
        return this.state;
    }

    dispatch(action) {
        function apply(result) {
            this.setState(result, false, action);
        }

        return function() {
            let args = [this.state];
            for (let i = 0; i < arguments.length; i++) args.push(arguments[i]);
            let ret = action.apply(this, args);
            if (ret !== null) {
                if (ret.then) {
                    return ret.then(apply);
                }
                return apply(ret);
            }
        };
    }
}
