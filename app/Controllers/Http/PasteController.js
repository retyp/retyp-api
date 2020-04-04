'use strict'

const Paste = use('App/Models/Paste')

class PasteController {
  /**
   * Retrieves EVERY pastes from the database
   * (might not be enabled for performance reasons)
   */
  async getAll () {
    const pastes = await Paste.all()
    return pastes
  }

  /**
   * Retrieves the paste matching the hash
   */
  async getByHash ({ params }) {
    const paste = await Paste.findByOrFail('hash', params.hash)
    return paste
  }

  /**
   * Store a new paste
   */
  async store ({ request }) {
    const pasteData = request.only(['hash', 'name', 'content', 'visibility'])
    const paste = await Paste.create(pasteData)
    await paste.reload()
    return paste
  }
}

module.exports = PasteController
