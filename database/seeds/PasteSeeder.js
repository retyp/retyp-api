'use strict'

/*
|--------------------------------------------------------------------------
| PasteSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class PasteSeeder {
  async run () {
    await Factory
      .model('App/Models/Paste')
      .createMany(5)
  }
}

module.exports = PasteSeeder
