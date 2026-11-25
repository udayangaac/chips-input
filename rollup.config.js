import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

const banner = "'use client';";

export default {
  input: './src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      banner,
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      exports: 'named',
      banner,
    },
  ],
  plugins: [
    postcss({ minimize: true }),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react'],
    }),
    external(),
    resolve(),
    terser({ numWorkers: 2, compress: { directives: false } }),
  ],
};
