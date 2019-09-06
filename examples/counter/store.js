import Store from "../../dist/redom-store.js";

const state = {
    count: 0,
    todos: [{ id: 1, text: "One", done: false }, { id: 2, text: "Two", done: false }],
    getTodoById: state => id => {
        return state.todos.find(todo => todo.id === id);
    },
};

export const store = new Store(state);
