import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json' assert { type: 'json' };
import summary from 'rollup-plugin-summary';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    external: Object.keys(pkg.peerDependencies),
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist/esm',
        exports: 'named',
        format: 'esm',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
      },
      {
        dir: 'dist',
        exports: 'named',
        format: 'cjs',
        sourcemap: true,
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
