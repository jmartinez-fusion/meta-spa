import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsConfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react(), tsConfigPaths(), svgrPlugin()],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    exclude: ['jeep-sqlite/loader'],
  },
  preview: {
    port: 8080,
  },
  resolve: {
    alias: {
      public: '/public',
      src: '/src',
      components: '/src/components',
      features: '/src/features',
      layouts: '/src/layouts',
      types: '/src/types',
      routes: '/src/routes',
      hooks: '/src/hooks',
      config: 'src/config',
      utils: '/src/utils',
    },
  },
  define: {
    "process.env.IS_PREACT": JSON.stringify("true"),
  },
}))
