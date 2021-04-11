'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  REMOTE_HOST_PATH: '"http://localhost:8087/Backend/Backend-Side-Projects-0001-Kapitan"',
})
