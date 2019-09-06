/* eslint-disable no-undef */
import Store from "../dist/redom-store.js";

describe("Store()", () => {
    it("should add on init", () => {
        let store = new Store({ a: "a", b: "a" });
        expect(store.getState()).toMatchObject({ a: "a", b: "a" });
    });

    it("should update states", () => {
        let store = new Store();
        expect(store.getState()).toMatchObject({});
        store.setState({ a: "a" });
        expect(store.getState()).toMatchObject({ a: "a" });
        store.setState({ c: "c" });
        expect(store.getState()).toMatchObject({ a: "a", c: "c" });
        store.setState({ a: "aa" });
        expect(store.getState()).toMatchObject({ a: "aa", c: "c" });
    });

    it("should subscribe", () => {
        let store = new Store();

        let fn1 = jest.fn();
        let fn2 = jest.fn();
        let action;

        let rval = store.subscribe(fn1);
        expect(rval).toBeInstanceOf(Function);

        store.setState({ a: "a" });
        expect(fn1).toBeCalledWith(store.getState(), action);

        store.subscribe(fn2);
        store.setState({ c: "c" });

        expect(fn1).toHaveBeenCalledTimes(2);
        expect(fn1).toHaveBeenLastCalledWith(store.getState(), action);
        expect(fn2).toBeCalledWith(store.getState(), action);
    });

    it("should unsubscribe", () => {
        let store = new Store();

        let fn1 = jest.fn();
        let fn2 = jest.fn();

        store.subscribe(fn1);
        store.subscribe(fn2);

        store.setState({ a: "a" });
        expect(fn1).toBeCalled();
        expect(fn2).toBeCalled();

        fn1.mockClear();
        fn2.mockClear();

        store.unsubscribe(fn2);

        store.setState({ c: "c" });
        expect(fn1).toBeCalled();
        expect(fn2).not.toBeCalled();

        fn1.mockClear();
        fn2.mockClear();

        store.unsubscribe(fn1);

        store.setState({ e: "f" });
        expect(fn1).not.toBeCalled();
        expect(fn2).not.toBeCalled();

        store.setState({ g: "h" });
        expect(fn1).not.toBeCalled();
        expect(fn2).not.toBeCalled();
    });
});
