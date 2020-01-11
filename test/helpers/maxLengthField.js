'use strict'

const faker = require('chance').Chance()

module.exports = async function testMaxLengthField (field, length, data, endpoint, client) {
  data[field] = faker.word({ length: length })

  const response = await client
    .post(endpoint)
    .send(data)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      source: { pointer: field },
      title: 'max'
    }]
  })
}
