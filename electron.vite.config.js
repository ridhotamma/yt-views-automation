import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import obfuscator from 'vite-plugin-javascript-obfuscator'

const obfuscatorPlugin = obfuscator({
  include: ['**/*.js', '**/*.ts'],
  exclude: [/node_modules/],
  apply: 'build',
  options: {
    compact: true,
    controlFlowFlattening: true,
    deadCodeInjection: false,
    debugProtection: false,
    disableConsoleOutput: false,
    stringArray: true,
    stringArrayEncoding: ['base64'],
  }
});

export default defineConfig({
  main: {
    plugins: [obfuscatorPlugin],
    build: {
      outDir: 'dist-electron',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'electron/main.js')
        },
        output: {
          format: 'cjs'
        },
        external: ["electron", "playwright", "playwright-core", "fsevents"]
      }
    }
  },
  preload: {
    plugins: [obfuscatorPlugin],
    build: {
      outDir: 'dist-electron',
      emptyOutDir: false,
      rollupOptions: {
        input: {
          preload: resolve(__dirname, 'electron/preload.js')
        },
        output: {
          format: 'cjs'
        }
      }
    }
  },
  renderer: {
    root: '.',
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html')
        }
      }
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag === "webview",
          },
        },
      })
    ]
  }
})
