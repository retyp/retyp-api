'use strict'

const { formatters } = use('Validator')

class StorePaste {
  get formatter () {
    return formatters.JsonApi
  }

  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'string|min:1|max:64',
      content: 'required|string|min:1|max:10000'
    }
  }
}

module.exports = StorePaste
