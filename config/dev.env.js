'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // LOCAL_HOST_PATH: '"http://localhost:8087/Backend/Backend-Side-Projects-0001-Kapitan"',
  REMOTE_HOST_PATH: '"http://localhost:8087/Backend/Backend-Side-Projects-0001-Kapitan"',
  // REMOTE_HOST_PATH: '"https://be-sp-0001-kapitan.herokuapp.com"'
  CLOUD_NAME: '"hugo-chiang"',
  CLOUD_GENERAL_FIELD_URL: '"v1615801181/Side-Projects/Frontend-Side-Projects-0001-Kapitan/"',
})
