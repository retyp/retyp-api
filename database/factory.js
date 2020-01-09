'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

Factory.blueprint('App/Models/Paste', async (faker) => {
  return {
    name: faker.sentence({ words: 3 }),
    content: faker.paragraph({ sentences: 3 })
  }
})
