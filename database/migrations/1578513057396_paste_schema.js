'use strict'

const Schema = use('Schema')

class PasteSchema extends Schema {
  up () {
    this.create('pastes', (table) => {
      table.increments()
      table.timestamps()

      table.string('hash', 4).notNullable().unique().index()
      table.string('name', 64).defaultTo('Untitled')
      table.string('language', 32).defaultTo(null)
      table.integer('size').defaultTo(null)
      table.text('content', 10000).notNullable()
      table.enu('visibility', ['public', 'unlisted']).defaultTo('unlisted')
    })
  }

  down () {
    this.drop('pastes')
  }
}

module.exports = PasteSchema
