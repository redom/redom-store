# RE:DOM store

Immutable keypath store for RE:DOM.

## Installation

```bash
# Using npm
npm install redom

# Using Yarn
yarn add redom
```

## Usage

```js
import Store from "@redom/store";
new Store();
```

## API Reference

### Store

Creates a new store, which is a tiny evented state container.

| Argument | Type     | Description                                     |
| -------- | -------- | ----------------------------------------------- |
| state    | `Object` | Optional initial state (optional, default `{}`) |

#### Example

```javascript
let store = new Store();
store.subscribe(state => console.log(state));
store.setState({ a: "b" }); // logs { a: 'b' }
store.setState({ c: "d" }); // logs { a: 'b', c: 'd' }
```

### getState()

Retrieve the current state object.

### setState(state, ?action)

Apply a partial state object to the current state, invoking registered listeners.

| Argument | Type     | Description                                       |
| -------- | -------- | ------------------------------------------------- |
| state    | `Object` | An object with properties to be merged into state |

### subscribe(listener)

Register a listener function to be called whenever state is changed. Returns an `unsubscribe()` function.

| Argument | Type       | Description                                                       |
| -------- | ---------- | ----------------------------------------------------------------- |
| listener | `Function` | A function to call when state changes. Gets passed the new state. |

### unsubscribe(listener)

Remove a previously-registered listener function.

| Argument | Type       | Description                                                             |
| -------- | ---------- | ----------------------------------------------------------------------- |
| listener | `Function` | The callback previously passed to `subscribe()` that should be removed. |

### dispatch(action)

Create a bound copy of the given action function.
The bound returned function invokes dispatch() and persists the result back to the store.
If the return value of `dispatch` is a Promise, the resolved value will be used as state.

| Argument | Type       | Description                                                   |
| -------- | ---------- | ------------------------------------------------------------- |
| action   | `Function` | An action of the form `action(state, ...args) -> stateUpdate` |

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present, [Juha Lindstedt](https://github.com/pakastin) and contributors
