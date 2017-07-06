const cp = require('child_process');
const fs = require('fs');

const utf8 = { encoding: 'utf8' };

const buildES = () => run('build-es', true); // run forever
const buildJS = () => run('build-js', true); // run forever
const test = () => run('test');

buildES();
buildJS();

fs.watch('dist/redom-store.js', () => {
  fs.readFile('dist/redom-store.js', utf8, (err, src) => {
    if (err) {
      throw new Error(err);
    }
    fs.writeFile('dist/redom-store.min.js', src.split('\n')[0], utf8, (err) => {
      if (err) {
        throw new Error(err);
      }
      console.log('Written dist/redom-store.min.js');
    });
  });
  test();
});

function run (cmd, forever) {
  const child = cp.spawn('npm', ['run', cmd]);

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  if (forever) {
    child.on('exit', () => {
      setTimeout(run, 5000, cmd, true);
    });
  }

  return child;
}
