'use strict'

// const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Paste Store')
const { testRequireField, testMaxLengthField } = require('../helpers')

trait('Test/ApiClient')
trait('DatabaseTransactions')

const paste = {
  name: 'Test paste name',
  content: 'Test paste content'
}

// ===============================================================
// == POST /pastes ===============================================
// ===============================================================

test('should test that you can create a paste with a default name', async ({ client }) => {
  const response = await client
    .post('pastes')
    .send({
      content: 'some content'
    })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: 'Untitled',
    content: 'some content'
  })
})

test('should test that you can create a paste', async ({ client }) => {
  const response = await client
    .post('pastes')
    .send(paste)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset(paste)
})

test('should test that paste.name has max length', async ({ client }) => {
  await testMaxLengthField('name', 70, paste, 'pastes', client)
})

test('should test that paste.content is required', async ({ client }) => {
  await testRequireField('content', paste, 'pastes', client)
})

test('should test that paste.content has max length', async ({ client }) => {
  await testMaxLengthField('content', 10001, paste, 'pastes', client)
})
