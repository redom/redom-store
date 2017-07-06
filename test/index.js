const test = require('tape');
const Store = require('../');

test('set & get', (t) => {
  t.plan(1);

  const store = new Store();
  store.set('a.b.c', true);

  t.equal(store.get('a.b.c'), true);
});

test('immutability', (t) => {
  t.plan(2);

  const store = new Store();
  store.set('a.b.c', true);

  const data = store.get();
  const b = store.get('b');

  store.set('a.b.c', true);

  t.notEqual(store.get(), data);
  t.equals(store.get('b'), b);
});
