import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    build: {
      bytecode: true,
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
    build: {
      bytecode: true,
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
