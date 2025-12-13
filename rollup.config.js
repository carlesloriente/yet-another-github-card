import pkg from './package.json' assert { type: 'json' };
import terser from '@rollup/plugin-terser';

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
          { src: 'src/images/**/*', dest: 'dist/images/' },
          { src: 'src/css/**/*', dest: 'demo/css/' }
        ]
      })
    ]
  },
];
