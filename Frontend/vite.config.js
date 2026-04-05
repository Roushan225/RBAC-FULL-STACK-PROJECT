import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    historyApiFallback:true,
    proxy:{
      "/auth":"http://localhost:3001",
      "/admin":"http://localhost:3001",
      "/resetpassword":"http://localhost:3001",
      "/upload":"http://localhost:3001",
      "/professor":"http://localhost:3001",
      "/email":"http://localhost:3001",
      "/calendar":"http://localhost:3001",
      
      
    }
  },
  plugins: [react()],
})
