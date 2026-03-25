module.exports = {
  apps: [
    {
      name: 'laki-ramen-demo',
      cwd: '/var/www/laki-rame',
      script: '.output/server/index.mjs',
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',
      env_production: {
        NODE_ENV: 'production',
        PORT: 5050,
        NITRO_PORT: 5050,
        HOST: '127.0.0.1',
        NITRO_HOST: '127.0.0.1'
      }
    }
  ]
}