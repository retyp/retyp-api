'use strict'

const util = require('util')
const HashUtils = use('HashUtils')

const PasteHook = exports = module.exports = {}

PasteHook.calculateSize = async (paste) => {
  paste.size = (new util.TextEncoder().encode(paste.content)).length
}

PasteHook.generateHash = async (paste) => {
  if (paste.hash) return
  paste.hash = await HashUtils.generateUniqueHash(4)
}
