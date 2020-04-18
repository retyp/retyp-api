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
const languages = require('../utils/prism-languages.json')

Factory.blueprint('App/Models/Paste', async (faker) => {
  return {
    name: faker.sentence({ words: 3 }),
    language: faker.pickone(languages),
    content: faker.paragraph({ sentences: 1 }),
    visibility: faker.pickone(['public', 'unlisted'])
  }
})
