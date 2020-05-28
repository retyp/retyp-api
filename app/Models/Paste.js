'use strict'

const Model = use('Model')

class Paste extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'PasteHook.calculateSize')
    this.addHook('beforeCreate', 'PasteHook.generateHash')
  }
}

module.exports = Paste
