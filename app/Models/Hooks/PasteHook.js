'use strict'

const util = require('util')

const PasteHook = exports = module.exports = {}
const Paste = use('App/Models/Paste')

PasteHook.calculateSize = async (paste) => {
  paste.size = (new util.TextEncoder().encode(paste.content)).length
}

PasteHook.generateHash = async (paste) => {
  if (paste.hash) return
  paste.hash = await generateUniqueHash(4)
}

async function generateUniqueHash (length) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789-_'
  let exists; let result = ''

  do {
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    await Paste.findByOrFail('hash', result)
      .then(_ => { exists = true })
      .catch(_ => { exists = false })
  } while (exists)

  return Promise.resolve(result)
}
