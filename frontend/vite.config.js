import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      // Auto-register icon components, e.g. <i-mdi-account />
      resolvers: [
        IconsResolver({
          prefix: 'i' // <i-{collection}-{icon}>, e.g. <i-mdi-home/>
        })
      ]
    }),
    Icons({
      autoInstall: true
    })
  ],

  server: {
    host: true,
    port: 5173,

    proxy: {
      '/api': {
        target: 'http://backend:3000',
        changeOrigin: true
      }
    }
  }
})