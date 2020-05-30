'use strict'

const Redis = use('Redis')
const Paste = use('App/Models/Paste')

class PasteController {
  /**
   * Retrieves the paste matching the hash
   */
  async getByHash ({ params }) {
    let paste = await Redis.get(params.hash)
    paste
      ? paste = JSON.parse(paste)
      : paste = await Paste.findByOrFail('hash', params.hash)
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
  async store ({ request }) {
    const pasteData = request.only(['name', 'language', 'content', 'visibility'])

    const paste = await Paste.create(pasteData)
    await paste.reload()

    return paste
  }

  /**
   * Store a new temporary paste
   */
  async storeTemp ({ request }) {
    const pasteData = request.only(['name', 'language', 'content', 'visibility'])

    // create and instant delete to set defaults
    const paste = await Paste.create(pasteData)
    await paste.reload()
    paste.delete()

    // save it
    await Redis.set(paste.hash, JSON.stringify(paste))
    await Redis.expire(paste.hash, 24 * 60 * 60)

    return paste
  }
}

module.exports = PasteController
