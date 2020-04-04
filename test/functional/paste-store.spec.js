'use strict'

// const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Paste Store')
const { testRequireField, testMaxLengthField } = require('../helpers')

trait('Test/ApiClient')
trait('DatabaseTransactions')

const paste = {
  name: 'Test paste name',
  content: 'Test paste content',
  visibility: 'public'
}

// ===============================================================
// == POST /pastes ===============================================
// ===============================================================

test('should test that you can create a paste with default values', async ({ client }) => {
  const response = await client
    .post('pastes')
    .send({
      content: 'some content'
    })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: 'Untitled',
    content: 'some content',
    visibility: 'unlisted'
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

test('should test that you can create a paste (with custom hash)', async ({ client }) => {
  const test = { ...paste, hash: 'aaaa' }

  const response = await client
    .post('pastes')
    .send(test)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset(test)
})

test('should test that visibility is not valid', async ({ client }) => {
  const clone = paste
  clone.visibility = 'notAValidVisibility'

  const response = await client
    .post('pastes')
    .send(clone)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      source: { pointer: 'visibility' },
      title: 'in'
    }]
  })
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
