// vitest.config.unit.ts

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: [
      'src/**/**/*.test.ts', // src/controllers/**/*.test.ts
      'src/**/*.test.ts'
    ]
  },
  resolve: {
    alias: {
      auth: '/src/controllers/auth',
      utils: '/src/utils'
    }
  }
})
