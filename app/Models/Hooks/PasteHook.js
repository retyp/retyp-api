'use strict'

const PasteHook = exports = module.exports = {}
const Paste = use('App/Models/Paste')

const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789-_'

PasteHook.generateHash = async (paste) => {
  paste.hash = await generateUniqueHash(4)
}

async function generateUniqueHash (length) {
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
