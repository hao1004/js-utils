import resolve from '@rollup/plugin-babel';
import babel from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
export default {
  input: './index.js',
  output: {
    file: 'index.min.js',
    format: 'iife'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    terser()
  ]
};
