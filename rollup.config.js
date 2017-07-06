import buble from 'rollup-plugin-buble';
import butternut from 'rollup-plugin-butternut';

export default {
  plugins: [
    buble({
      objectAssign: 'Object.assign'
    }),
    butternut()
  ]
};
