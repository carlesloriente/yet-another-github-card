import pkg from './package.json' with { type: 'json' };
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy'; // This line is necessa

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
          { src: 'src/css/**/*', dest: 'dist/css/' },
          { src: 'src/themes/**/*', dest: 'dist/themes/' },
          { src: 'utils/**/*', dest: 'dist/utils/' },
          { src: 'package.json', dest: 'dist/' },
          { src: '*.md', dest: 'dist/' },
          { src: 'LICENSE', dest: 'dist/' }
        ]
      })
    ]
  },
];
