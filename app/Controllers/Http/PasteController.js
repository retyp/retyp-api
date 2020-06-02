'use strict'

const Redis = use('Redis')
const Paste = use('App/Models/Paste')

class PasteController {
  /**
   * Retrieves the paste matching the hash
   */
  async getByHash ({ params }) {
    let paste = await Redis.get(params.hash)

    if (paste) {
      paste = JSON.parse(paste)
      paste.ttl = await Redis.ttl(params.hash)
    } else {
      paste = await Paste.findByOrFail('hash', params.hash)
    }

    return paste
  }

  /**
   * Only get paste content from its hash
   */
  async getRawByHash ({ params }) {
    let paste = await Redis.get(params.hash)
    paste
      ? paste = JSON.parse(paste)
      : paste = await Paste.findByOrFail('hash', params.hash)
    return paste.content
  }

  /**
   * Store a new permanent paste
   */
  async store ({ response, request }) {
    const pasteData = request.only(['name', 'language', 'content', 'visibility'])

    const paste = await Paste.create(pasteData)
    await paste.reload()

    response.status(201).send(paste)
  }

  /**
   * Store a new temporary paste
   */
  async storeTemp ({ response, request }) {
    const pasteData = request.only(['name', 'language', 'content', 'visibility'])
    const ttl = request.input('ttl', 24 * 3600)

    // create and instant delete to set defaults
    const paste = await Paste.create(pasteData)
    await paste.reload()
    paste.delete()

    await Redis.set(paste.hash, JSON.stringify(paste))
    await Redis.expire(paste.hash, ttl)
    paste.ttl = ttl

    response.status(201).send(paste)
  }
}

module.exports = PasteController
