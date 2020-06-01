'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const packageJson = require('../package.json')

const Route = use('Route')

// Other routes
Route.get('/', () => ({ version: packageJson.version, uptime: process.uptime() }))

// Pastes
Route.get('/pastes/:hash', 'PasteController.getByHash')
Route.get('/pastes/:hash/raw', 'PasteController.getRawByHash')
Route.post('/pastes', 'PasteController.store').validator('StorePaste')
Route.post('/pastes/temp', 'PasteController.storeTemp').validator('StorePaste')
