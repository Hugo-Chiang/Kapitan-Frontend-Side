'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // LOCAL_HOST_PATH: '"http://localhost:8087/Backend/Backend-Side-Projects-0001-Kapitan"',
  REMOTE_HOST_PATH: '"http://localhost:8087/Backend/Backend-Side-Projects-0001-Kapitan"',
  // REMOTE_HOST_PATH: '"https://be-sp-0001-kapitan.herokuapp.com"'
  CLOUD_NAME: '"hugo-chiang"',
  CLOUD_URL_PREFIX: '"https://res.cloudinary.com/hugo-chiang/image/upload/"',
  CLOUD_NO_IMG_URL: '"Side-Projects/Frontend-Side-Projects-0001-Kapitan/Mess-Upload/Projects-Avatar/x8lajfn9a6zcknrg51v6"',
  CLOUD_NO_AVATAR_URL: '"Side-Projects/Frontend-Side-Projects-0001-Kapitan/Mess-Upload/Members-Avatar/m0uyfclhnsaauzzmot5g"'
})
