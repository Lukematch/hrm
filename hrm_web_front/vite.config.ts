import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    host: '127.0.0.1',
    port:6400,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',	// 实际请求地址
        changeOrigin: true, // 是否跨域
        rewrite: (path) => path.replace('/api', '') // 对什么类的服务器匹配
      },
    }
  },
  resolve:{
    // 配置引用路径"@"
    alias:{
        "@":resolve(__dirname,'src')
    },
    // 使用路径别名时可以省略后缀名
    extensions:['js','json','ts']
  }
})
