'use strict'

const Factory = use('Factory')
const { validateAll } = use('indicative')
const { test, trait } = use('Test/Suite')('Paste Get')

trait('Test/ApiClient')
trait('DatabaseTransactions')

const pasteSchema = {
  id: 'number',
  hash: 'string',
  name: 'string',
  language: 'string',
  size: 'number',
  content: 'string'
}

// ===============================================================
// == GET /pastes/:hash ==========================================
// ===============================================================

test('should be able to get a paste (from pg)', async ({ client }) => {
  const paste = await Factory.model('App/Models/Paste').create()

  const response = await client
    .get(`pastes/${paste.hash}`)
    .end()

  response.assertStatus(200)
  await validateAll(response.body, pasteSchema)
})

test('should be able to get a paste (from redis)', async ({ client }) => {
  const res = await client
    .post('pastes/temp')
    .send({ content: 'some content' })
    .end()

  const response = await client
    .get(`pastes/${res.body.hash}`)
    .end()

  response.assertStatus(200)
  await validateAll(response.body, { ...pasteSchema, ttl: 'number' })
})

test('should throw error "paste not found"', async ({ client }) => {
  const response = await client
    .get('pastes/0000')
    .end()

  response.assertStatus(404)
})

// ===============================================================
// == GET /pastes/:hash/raw ======================================
// ===============================================================

test('should be able to get a raw paste', async ({ client }) => {
  const paste = await Factory.model('App/Models/Paste').create()

  const response = await client
    .get(`pastes/${paste.hash}/raw`)
    .end()

  response.assertStatus(200)
  await validateAll(response.body, { content: 'string' })
})

test('should throw error "paste not found"', async ({ client }) => {
  const response = await client
    .get('pastes/0000/raw')
    .end()

  response.assertStatus(404)
})
