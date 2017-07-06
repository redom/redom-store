# RE:DOM store
Immutable keypath store for RE:DOM

## Installing
```
npm i @redom/store
```

## Usage

```js
import Store from '@redom/store';

const store = new Store();

store.set('a.b.c', 'Hello RE:DOM store!');

console.log(store.get('a.b.c'));
```
