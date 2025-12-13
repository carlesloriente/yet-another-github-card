import copy from 'rollup-plugin-copy';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' with { type: 'json' };

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.module,
        name: 'yagc',
        format: 'es'
      },
      {
        file: 'dist/yagc.min.js',
        format: 'iife',
        name: 'version',
        plugins: [terser()]
      }
  	],
    plugins: [
      copy({
        targets: [
          { src: 'utils/index.html', dest: 'demo/' },
          { src: 'utils/js/**/*', dest: 'demo/js/' },
          { src: 'src/images/**/*', dest: 'demo/images/' },
          { src: 'src/css/**/*', dest: 'demo/css/' },
          { src: 'dist/yagc*', dest: 'demo/' }
        ],
        hook: 'writeBundle'
      })
    ]
  },
];
