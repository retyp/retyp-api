'use strict'

const Redis = use('Redis')
const Paste = use('App/Models/Paste')

class HashUtils {
  async generateUniqueHash (length) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789-_'
    let exists; let result = ''

    do {
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }

      // check if hash is used in redis
      exists = await Redis.exists(result)
      if (!exists) {
        await Paste.findByOrFail('hash', result)
          .then(_ => { exists = true })
          .catch(_ => { exists = false })
      }
    } while (exists)

    return Promise.resolve(result)
  }
}

module.exports = HashUtils
