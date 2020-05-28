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
      content: 'required|string|min:1|max:10000',
      visibility: 'in:public,unlisted'
    }
  }

  get messages () {
    return {
      'name.min': 'Paste name must contain at least 1 character.',
      'name.max': 'Paste name cannot exceed 64 characters.',
      'content.required': 'You must provide a valid paste content.',
      'content.max': 'Paste content cannot exceed 10000 characters.',
      'content.min': 'Paste content must contain at least 1 character.',
      'visibility.in': 'Paste visibility can only be PUBLIC or UNLISTED.'
    }
  }
}

module.exports = StorePaste
