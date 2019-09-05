/* eslint-disable no-undef */
import Store from "../src/store.js";

describe("Store()", () => {
    it("should update states", () => {
        let store = new Store();
        expect(store.get()).toMatchObject({});
        store.set({ a: "b" });
        expect(store.get()).toMatchObject({ a: "b" });
        store.set({ c: "d" });
        expect(store.get()).toMatchObject({ a: "b", c: "d" });
        store.set({ a: "x" });
        expect(store.get()).toMatchObject({ a: "x", c: "d" });
        store.set({ c: null });
        expect(store.get()).toMatchObject({ a: "x", c: null });
        store.set({ c: undefined });
        expect(store.get()).toMatchObject({ a: "x", c: undefined });
    });

    it("should subscribe", () => {
        let store = new Store();

        let sub1 = jest.fn();
        let sub2 = jest.fn();
        let action;

        let rval = store.subscribe(sub1);
        expect(rval).toBeInstanceOf(Function);

        store.set({ a: "b" });
        expect(sub1).toBeCalledWith(store.get(), action);

        store.subscribe(sub2);
        store.set({ c: "d" });

        expect(sub1).toHaveBeenCalledTimes(2);
        expect(sub1).toHaveBeenLastCalledWith(store.get(), action);
        expect(sub2).toBeCalledWith(store.get(), action);
    });

    it("should unsubscribe", () => {
        let store = new Store();

        let sub1 = jest.fn();
        let sub2 = jest.fn();
        let sub3 = jest.fn();

        store.subscribe(sub1);
        store.subscribe(sub2);
        let unsub3 = store.subscribe(sub3);

        store.set({ a: "b" });
        expect(sub1).toBeCalled();
        expect(sub2).toBeCalled();
        expect(sub3).toBeCalled();

        sub1.mockClear();
        sub2.mockClear();
        sub3.mockClear();

        store.unsubscribe(sub2);

        store.set({ c: "d" });
        expect(sub1).toBeCalled();
        expect(sub2).not.toBeCalled();
        expect(sub3).toBeCalled();

        sub1.mockClear();
        sub2.mockClear();
        sub3.mockClear();

        store.unsubscribe(sub1);

        store.set({ e: "f" });
        expect(sub1).not.toBeCalled();
        expect(sub2).not.toBeCalled();
        expect(sub3).toBeCalled();

        sub3.mockClear();

        unsub3();

        store.set({ g: "h" });
        expect(sub1).not.toBeCalled();
        expect(sub2).not.toBeCalled();
        expect(sub3).not.toBeCalled();
    });
});
