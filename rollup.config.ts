import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json' assert { type: 'json' };
import renameNodeModules from 'rollup-plugin-rename-node-modules';
import summary from 'rollup-plugin-summary';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    external: Object.keys(pkg.peerDependencies),
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist/esm',
        // file: 'dist/esm/index.js',
        format: 'esm',
        preserveModules: true,
        preserveModulesRoot: 'src',
        // exports: 'named',
        sourcemap: true,
      },
      {
        // file: 'dist/index.js',
        dir: 'dist',
        format: 'cjs',
        // exports: 'named',
        sourcemap: true,
      },
    ],

    plugins: [
      nodeResolve(),
      commonjs({
        include: /node_modules/,
      }),
      typescript({ sourceMap: true }),
      // esbuild({
      //   minify: true,
      // }),
      summary(),
      renameNodeModules('external'),
    ],
  },
  {
    // path to your declaration files root
    input: 'src/index.ts',
    output: [{ dir: 'types', format: 'es' }],
    plugins: [dts()],
  },
];
