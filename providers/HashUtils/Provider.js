'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class HashUtilsProvider extends ServiceProvider {
  register () {
    this.app.singleton('HashUtils', () => {
      return new (require('./HashUtils'))()
    })
  }
}

module.exports = HashUtilsProvider
