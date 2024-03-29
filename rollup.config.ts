import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json' assert { type: 'json' };
import summary from 'rollup-plugin-summary';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default [
  {
    external: Object.keys(pkg.peerDependencies),
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        entryFileNames: '[name].mjs',
        exports: 'named',
        format: 'es',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
      },
      {
        dir: 'dist',
        entryFileNames: '[name].cjs',
        exports: 'named',
        format: 'cjs',
        sourcemap: true,
      },
      {
        exports: 'named',
        file: pkg.browser,
        format: 'umd',
        globals: {
          gsap: 'gsap',
        },
        name: 'ripple',
        plugins: [terser()],
      },
    ],
    plugins: [
      nodeResolve(),
      commonjs({
        include: /node_modules/,
      }),
      typescript({ sourceMap: true }),
      summary(),
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ dir: 'types', format: 'es' }],
    plugins: [dts()],
  },
];
