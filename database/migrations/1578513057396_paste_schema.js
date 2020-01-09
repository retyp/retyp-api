'use strict'

const Schema = use('Schema')

class PasteSchema extends Schema {
  up () {
    this.create('pastes', (table) => {
      table.increments()
      table.timestamps()

      table.string('hash', 5).notNullable().unique().index()
      table.string('name', 64).defaultTo('Untitled')
      table.text('content').notNullable()
    })
  }

  down () {
    this.drop('pastes')
  }
}

module.exports = PasteSchema
