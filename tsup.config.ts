import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    client: 'src/client.ts',
    server: 'src/server.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom', 'next'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    }
  },
}) 